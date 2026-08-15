const auditUrl = "http://127.0.0.1:3000/cxsmo/products/gravity-01";

const target = await fetch(`http://127.0.0.1:9222/json/new?${encodeURIComponent(auditUrl)}`, { method: "PUT" }).then((response) => response.json());
const socket = new WebSocket(target.webSocketDebuggerUrl);
let sequence = 0;
const pending = new Map();
const events = [];

const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});

socket.addEventListener("message", ({ data }) => {
  const message = JSON.parse(data);
  if (message.id && pending.has(message.id)) {
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) reject(new Error(message.error.message));
    else resolve(message.result);
  }
});

function command(method, params = {}) {
  const id = ++sequence;
  socket.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
}

async function evaluate(expression) {
  const result = await command("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
  return result.result.value;
}

async function press(key, code, windowsVirtualKeyCode, modifiers = 0) {
  const isEnter = key === "Enter";
  const detail = { key, code, windowsVirtualKeyCode, nativeVirtualKeyCode: windowsVirtualKeyCode, modifiers, ...(isEnter ? { text: "\r", unmodifiedText: "\r" } : {}) };
  await command("Input.dispatchKeyEvent", { type: "keyDown", ...detail });
  await command("Input.dispatchKeyEvent", { type: "keyUp", ...detail });
  await sleep(70);
}

async function focusSnapshot() {
  return evaluate(`(() => {
    const node = document.activeElement;
    if (!node) return null;
    return {
      tag: node.tagName,
      text: (node.innerText || node.value || "").trim().replace(/\\s+/g, " ").slice(0, 90),
      label: node.getAttribute("aria-label") || "",
      expanded: node.getAttribute("aria-expanded") || "",
    };
  })()`);
}

try {
  await command("Page.enable");
  await command("Runtime.enable");
  await sleep(1000);
  await evaluate("window.localStorage.removeItem('cxsmo-demo-state')");
  await command("Page.reload", { ignoreCache: true });
  await sleep(1000);
  await command("Runtime.evaluate", { expression: "document.body.focus()" });

  let sizeSelected = false;
  let bagAdded = false;
  for (let index = 1; index <= 42; index += 1) {
    await press("Tab", "Tab", 9);
    const focused = await focusSnapshot();
    events.push({ index, focused });

    if (!sizeSelected && focused?.tag === "BUTTON" && focused.text === "L") {
      await press("Enter", "Enter", 13);
      sizeSelected = true;
      events.push({ action: "Select L", active: await focusSnapshot() });
    }

    if (sizeSelected && !bagAdded && focused?.tag === "BUTTON" && focused.text.toLowerCase().includes("add to bag")) {
      await press("Enter", "Enter", 13);
      await sleep(180);
      bagAdded = true;
      events.push({ action: "Add selected L to bag", active: await focusSnapshot() });
      break;
    }
  }

  const state = await evaluate(`(() => ({
    selectedSize: document.querySelector('.cxsmo-size-picker .is-active')?.textContent?.trim() || null,
    addLabel: [...document.querySelectorAll('button')].find((node) => node.textContent?.toLowerCase().includes('added to bag'))?.textContent?.trim() || null,
    bagLabel: [...document.querySelectorAll('a, button')].find((node) => node.textContent?.trim().toLowerCase() === 'bag 1')?.textContent?.trim() || null,
  }))()`);

  const passed = sizeSelected && bagAdded && state.selectedSize === "L" && state.addLabel?.toLowerCase().includes("added to bag") && state.bagLabel?.toLowerCase() === "bag 1";
  console.log(JSON.stringify({ passed, auditUrl, steps: events, state }, null, 2));
  if (!passed) process.exitCode = 1;
} finally {
  await evaluate("window.localStorage.removeItem('cxsmo-demo-state')").catch(() => undefined);
  socket.close();
}
