import log from "loglevel";

// for chrome 63
if (!window.ResizeObserver) {
  window.ResizeObserver = ResizeObserver;
}

function hideLoading() {
  // hide loading
  const node = document.getElementById("loading");
  if (node) {
    // @ts-ignore
    node.style.opacity = 1;
  }
}

try {
  // bootstrap();
  hideLoading();
} catch (e) {
  log.error(e);
}
