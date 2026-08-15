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

async function pressEnter() {
  const detail = { key: "Enter", code: "Enter", windowsVirtualKeyCode: 13, nativeVirtualKeyCode: 13, text: "\r", unmodifiedText: "\r" };
  await command("Input.dispatchKeyEvent", { type: "keyDown", ...detail });
  await command("Input.dispatchKeyEvent", { type: "keyUp", ...detail });
}

try {
  await command("Page.enable");
  await command("Runtime.enable");
  await sleep(900);
  await evaluate("window.sessionStorage.removeItem('cxsmo-studio-unlocked')");
  await command("Page.reload", { ignoreCache: true });
  await sleep(900);

  const initial = await evaluate(`(() => ({
    activeTag: document.activeElement?.tagName || null,
    activeType: document.activeElement?.getAttribute('type') || null,
    placeholder: document.activeElement?.getAttribute('placeholder') || null,
  }))()`);

  await command("Input.insertText", { text: "cxsmo" });
  await pressEnter();
  await sleep(520);

  const state = await evaluate(`(() => ({
    returnControl: [...document.querySelectorAll('a')].some((node) => node.textContent?.includes('Return to storefront')),
    overview: document.querySelector('.cx-admin__header h1')?.textContent?.trim() || null,
    unlocked: window.sessionStorage.getItem('cxsmo-studio-unlocked'),
  }))()`);
  const passed = initial.activeTag === "INPUT" && initial.activeType === "password" && initial.placeholder === "Enter access code" && state.returnControl && state.overview === "Overview" && state.unlocked === "true";
  console.log(JSON.stringify({ passed, auditUrl, initial, state }, null, 2));
  if (!passed) process.exitCode = 1;
} finally {
  await evaluate("window.sessionStorage.removeItem('cxsmo-studio-unlocked')").catch(() => undefined);
  socket.close();
}
