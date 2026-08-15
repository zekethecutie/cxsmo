const target = await fetch(`http://127.0.0.1:9222/json/new?${encodeURIComponent("http://127.0.0.1:3000/")}`, { method: "PUT" }).then((response) => response.json());
const socket = new WebSocket(target.webSocketDebuggerUrl);
let sequence = 0;
const pending = new Map();
const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
await new Promise((resolve, reject) => { socket.addEventListener("open", resolve, { once:true }); socket.addEventListener("error", reject, { once:true }); });
socket.addEventListener("message", ({ data }) => { const message = JSON.parse(data); if (!message.id || !pending.has(message.id)) return; const { resolve, reject } = pending.get(message.id); pending.delete(message.id); message.error ? reject(new Error(message.error.message)) : resolve(message.result); });
function command(method, params = {}) { const id = ++sequence; socket.send(JSON.stringify({ id, method, params })); return new Promise((resolve, reject) => pending.set(id, { resolve, reject })); }
async function inspect(expression) { const result = await command("Runtime.evaluate", { expression, awaitPromise:true, returnByValue:true }); return result.result.value; }
try {
  await command("Runtime.enable");
  await sleep(700);
  const initial = await inspect(`(() => ({ trigger:Boolean(document.querySelector('.cxsmo-promo-popup__trigger')), dialog:Boolean(document.querySelector('.cxsmo-promo-popup')) }))()`);
  await inspect("document.querySelector('.cxsmo-promo-popup__trigger')?.click()");
  await sleep(220);
  const opened = await inspect(`(() => ({ dialog:Boolean(document.querySelector('.cxsmo-promo-popup[role="dialog"]')), focused:document.activeElement?.getAttribute('aria-label') || null, text:document.querySelector('.cxsmo-promo-popup__card h2')?.textContent?.trim() || null }))()`);
  await inspect("window.dispatchEvent(new KeyboardEvent('keydown', { key:'Escape', bubbles:true, cancelable:true }))");
  await sleep(520);
  const closed = await inspect(`(() => ({ dialog:Boolean(document.querySelector('.cxsmo-promo-popup')), bodyLocked:document.body.style.overflow === 'hidden' }))()`);
  const passed = initial.trigger && !initial.dialog && opened.dialog && opened.focused === "Dismiss campaign announcement" && opened.text?.includes("SIGNAL EVENT") && !closed.dialog && !closed.bodyLocked;
  console.log(JSON.stringify({ passed, initial, opened, closed }, null, 2));
  if (!passed) process.exitCode = 1;
} finally { socket.close(); }
