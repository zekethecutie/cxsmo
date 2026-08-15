const auditUrl = "http://127.0.0.1:3000/cxsmo/admin";

const target = await fetch(`http://127.0.0.1:9222/json/new?${encodeURIComponent(auditUrl)}`, { method: "PUT" }).then((response) => response.json());
const socket = new WebSocket(target.webSocketDebuggerUrl);
let sequence = 0;
const pending = new Map();
const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});

socket.addEventListener("message", ({ data }) => {
  const message = JSON.parse(data);
  if (!message.id || !pending.has(message.id)) return;
  const { resolve, reject } = pending.get(message.id);
  pending.delete(message.id);
  if (message.error) reject(new Error(message.error.message));
  else resolve(message.result);
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

async function press(key, code, windowsVirtualKeyCode) {
  const detail = { key, code, windowsVirtualKeyCode, nativeVirtualKeyCode: windowsVirtualKeyCode, ...(key === "Enter" ? { text: "\r", unmodifiedText: "\r" } : {}) };
  await command("Input.dispatchKeyEvent", { type: "keyDown", ...detail });
  await command("Input.dispatchKeyEvent", { type: "keyUp", ...detail });
  await sleep(70);
}

async function focused() {
  return evaluate(`(() => ({
    tag: document.activeElement?.tagName || null,
    text: (document.activeElement?.innerText || document.activeElement?.value || '').trim().replace(/\\s+/g, ' '),
    label: document.activeElement?.getAttribute('aria-label') || '',
    placeholder: document.activeElement?.getAttribute('placeholder') || '',
  }))()`);
}

try {
  await command("Page.enable");
  await command("Runtime.enable");
  await sleep(800);
  await evaluate("window.sessionStorage.removeItem('cxsmo-studio-unlocked')");
  await command("Page.reload", { ignoreCache: true });
  await sleep(850);
  await command("Input.insertText", { text: "cxsmo" });
  await press("Enter", "Enter", 13);
  await sleep(450);

  let categoriesOpened = false;
  for (let index = 1; index <= 80; index += 1) {
    await press("Tab", "Tab", 9);
    const node = await focused();
    if (node.tag === "BUTTON" && node.text === "CATEGORIES") {
      await press("Enter", "Enter", 13);
      categoriesOpened = true;
      break;
    }
  }
  await sleep(300);

  let categoryInputFocused = false;
  for (let index = 1; index <= 100; index += 1) {
    await press("Tab", "Tab", 9);
    const node = await focused();
    if (node.tag === "INPUT" && node.placeholder === "e.g. Jersey") {
      categoryInputFocused = true;
      await command("Input.insertText", { text: "Orbit Lane" });
      await press("Enter", "Enter", 13);
      break;
    }
  }
  await sleep(260);
  const state = await evaluate(`(() => ({
    heading: document.querySelector('.cx-admin__section-head h2')?.textContent?.trim() || null,
    addedLane: [...document.querySelectorAll('.cx-admin__category-grid b')].some((node) => node.textContent?.trim() === 'Orbit Lane'),
  }))()`);
  const passed = categoriesOpened && categoryInputFocused && state.heading === "Category studio" && state.addedLane;
  console.log(JSON.stringify({ passed, state }, null, 2));
  if (!passed) process.exitCode = 1;
} finally {
  await evaluate("window.sessionStorage.removeItem('cxsmo-studio-unlocked')").catch(() => undefined);
  socket.close();
}
