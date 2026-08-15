const target = await fetch(`http://127.0.0.1:9222/json/new?${encodeURIComponent("http://127.0.0.1:3000/cxsmo")}`, { method: "PUT" }).then((response) => response.json());
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

async function inspect(expression) {
  const result = await command("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
  return result.result.value;
}

try {
  await command("Page.enable");
  await command("Runtime.enable");
  await sleep(1000);
  await inspect("document.querySelector('.cxsmo-showcase-launch')?.click()");
  await sleep(7600);
  const firstScene = await inspect(`(() => ({
    active: document.documentElement.dataset.cxsmoTour === 'active',
    scene: document.documentElement.dataset.cxsmoTourScene || null,
    route: location.pathname,
    hasSpotlight: Boolean(document.querySelector('.cxsmo-route-tour__spotlight')),
    hasTooltip: Boolean(document.querySelector('.cxsmo-route-tour__tooltip')),
    hasAttachedTarget: Boolean(document.querySelector('[data-cxsmo-tour-target="true"]')),
    hasFakeCursor: Boolean(document.querySelector('.cxsmo-route-tour__cursor')),
    calloutSide: Array.from(document.querySelector('.cxsmo-route-tour__tooltip')?.classList ?? []).find((name) => name.startsWith('is-')) || null,
    tooltip: document.querySelector('.cxsmo-route-tour__tooltip article')?.textContent?.trim() || null,
    scrollLocked: document.body.style.overflow === 'hidden' && document.documentElement.style.overflow === 'hidden',
  }))()`);
  await sleep(7900);
  const nextScene = await inspect(`(() => ({ scene: document.documentElement.dataset.cxsmoTourScene || null, route: location.pathname }))()`);
  await inspect("document.querySelector('.cxsmo-route-tour header button')?.click()");
  await sleep(520);
  const exited = await inspect(`(() => ({ active: Boolean(document.querySelector('.cxsmo-route-tour')), route: location.pathname, scrollRestored: document.body.style.overflow !== 'hidden' }))()`);
  const passed = firstScene.active && firstScene.scene === "00" && firstScene.route === "/cxsmo" && firstScene.hasSpotlight && firstScene.hasTooltip && firstScene.hasAttachedTarget && !firstScene.hasFakeCursor && Boolean(firstScene.calloutSide) && firstScene.scrollLocked && nextScene.scene === "01" && nextScene.route === "/cxsmo/shop" && !exited.active && exited.route === "/cxsmo" && exited.scrollRestored;
  console.log(JSON.stringify({ passed, firstScene, nextScene, exited }, null, 2));
  if (!passed) process.exitCode = 1;
} finally {
  socket.close();
}
