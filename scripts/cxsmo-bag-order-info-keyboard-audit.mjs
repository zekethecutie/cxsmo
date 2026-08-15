const bagUrl = "http://127.0.0.1:3000/cxsmo/bag";

const target = await fetch(`http://127.0.0.1:9222/json/new?${encodeURIComponent(bagUrl)}`, { method: "PUT" }).then((response) => response.json());
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
    placeholder: document.activeElement?.getAttribute('placeholder') || '',
  }))()`);
}

try {
  await command("Page.enable");
  await command("Runtime.enable");
  await sleep(800);
  await evaluate("window.localStorage.removeItem('cxsmo-demo-state')");
  await evaluate(`window.localStorage.setItem('cxsmo-demo-state', JSON.stringify({ bag: [{ productId: 'gravity-01', size: 'L' }] }))`);
  await command("Page.reload", { ignoreCache: true });
  await sleep(850);
  await command("Runtime.evaluate", { expression: "document.body.focus()" });

  let formOpened = false;
  for (let index = 1; index <= 80; index += 1) {
    await press("Tab", "Tab", 9);
    const node = await focused();
    if (node.tag === "BUTTON" && node.text.toLowerCase().includes("add order info")) {
      await press("Enter", "Enter", 13);
      formOpened = true;
      break;
    }
  }
  await sleep(180);

  const fields = [
    ["Your name", "Demo"],
    ["you@example.com", "demo@example.test"],
    ["City and country", "Test City"],
    ["Any sizing or delivery note", "No note"],
  ];
  const visited = [];
  for (const [placeholder, value] of fields) {
    let found = false;
    for (let index = 1; index <= 24; index += 1) {
      await press("Tab", "Tab", 9);
      const node = await focused();
      if (node.tag === "INPUT" && node.placeholder === placeholder) {
        await command("Input.insertText", { text: value });
        visited.push(placeholder);
        found = true;
        break;
      }
    }
    if (!found) break;
  }

  let submitted = false;
  for (let index = 1; index <= 24; index += 1) {
    await press("Tab", "Tab", 9);
    const node = await focused();
    if (node.tag === "BUTTON" && node.text.toLowerCase().includes("stage request preview")) {
      await press("Enter", "Enter", 13);
      submitted = true;
      break;
    }
  }
  await sleep(220);
  const state = await evaluate(`(() => ({
    stagedLabel: [...document.querySelectorAll('.cxsmo-request-form button')].find((node) => node.textContent?.toLowerCase().includes('request preview staged'))?.textContent?.replace(/\\s+/g, ' ').trim() || null,
    fields: [...document.querySelectorAll('.cxsmo-request-form input')].map((node) => node.value),
  }))()`);
  const passed = formOpened && visited.length === fields.length && submitted && state.stagedLabel?.toLowerCase().includes("request preview staged") && state.fields.every(Boolean);
  console.log(JSON.stringify({ passed, formOpened, visited, submitted, state }, null, 2));
  if (!passed) process.exitCode = 1;
} finally {
  await evaluate("window.localStorage.removeItem('cxsmo-demo-state')").catch(() => undefined);
  socket.close();
}
