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
    label: document.activeElement?.getAttribute('aria-label') || '',
  }))()`);
}

async function prepareBag() {
  await evaluate(`window.localStorage.setItem('cxsmo-demo-state', JSON.stringify({ bag: [{ productId: 'gravity-01', size: 'L' }] }))`);
  await command("Page.reload", { ignoreCache: true });
  await sleep(850);
  await command("Runtime.evaluate", { expression: "document.body.focus()" });
}

try {
  await command("Page.enable");
  await command("Runtime.enable");
  await sleep(850);
  await evaluate("window.localStorage.removeItem('cxsmo-demo-state')");
  await prepareBag();

  const focusTrace = [];
  let checkoutActivated = false;
  for (let index = 1; index <= 80; index += 1) {
    await press("Tab", "Tab", 9);
    const node = await focused();
    focusTrace.push(node);
    if (node.tag === "A" && node.text.toLowerCase().includes("preview checkout")) {
      await press("Enter", "Enter", 13);
      checkoutActivated = true;
      break;
    }
  }
  await sleep(450);
  const checkoutState = await evaluate(`(() => ({
    path: window.location.pathname,
    heading: document.querySelector('.cxsmo-checkout h1')?.textContent?.replace(/\\s+/g, ' ').trim() || null,
  }))()`);

  await command("Page.navigate", { url: bagUrl });
  await sleep(700);
  await command("Runtime.evaluate", { expression: "document.body.focus()" });
  let removeActivated = false;
  for (let index = 1; index <= 40; index += 1) {
    await press("Tab", "Tab", 9);
    const node = await focused();
    if (node.tag === "BUTTON" && node.label === "Remove Gravity Puddle Jean") {
      await press("Enter", "Enter", 13);
      removeActivated = true;
      break;
    }
  }
  await sleep(260);
  const bagState = await evaluate(`(() => ({
    empty: document.querySelector('.cxsmo-empty-state--bag h2')?.textContent?.trim() || null,
    bagCount: JSON.parse(window.localStorage.getItem('cxsmo-demo-state') || '{}').bag?.length ?? null,
  }))()`);

  const passed = checkoutActivated && checkoutState.path === "/cxsmo/checkout" && checkoutState.heading?.includes("One last") && removeActivated && bagState.empty === "The bag is waiting." && bagState.bagCount === 0;
  console.log(JSON.stringify({ passed, checkoutState, bagState, focusTrace }, null, 2));
  if (!passed) process.exitCode = 1;
} finally {
  await evaluate("window.localStorage.removeItem('cxsmo-demo-state')").catch(() => undefined);
  socket.close();
}
