export function initDraggable(
  el,
  {
    COLLAPSE = {
      enable: false,
      disabledLeft: 0,
    },
    HEADER = {
      enable: false,
      disabledTop: 0,
    },
  } = {}
) {
  el.style.position = "fixed";
  el.style.pointerEvents = null;

  let offsetX = 0,
    offsetY = 0,
    box1W = 0,
    box1H = 0,
    x = 0,
    y = 0;

  let clientW = 0;
  let clientH = 0;

  // 用一个变量保存当前的配置，便于动态更新
  let options = {
    COLLAPSE: { ...COLLAPSE },
    HEADER: { ...HEADER },
  };

  function updateClientWH() {
    clientW = document.body.clientWidth || 0;
    clientH = document.body.clientHeight || window.innerHeight || 0;
  }

  updateClientWH();
  window.addEventListener("resize", updateClientWH);

  function handleMousedown(e) {
    if (e.button !== 0) return;

    box1W = el.clientWidth;
    box1H = el.clientHeight;

    e.preventDefault();
    offsetX = e.clientX - el.getBoundingClientRect().left;
    offsetY = e.clientY - el.getBoundingClientRect().top;

    document.addEventListener("mousemove", handleMousemove);
    document.addEventListener("mouseup", handleStopDrag);
  }

  function handleMousemove(e) {
    el.style.pointerEvents = "none";
    e.preventDefault();

    x = e.clientX - offsetX;
    y = e.clientY - offsetY;

    // 限制左边
    if (options.COLLAPSE.enable) {
      x = Math.max(x, options.COLLAPSE.disabledLeft);
    } else {
      x = Math.max(x, 0);
    }

    // 限制顶部
    if (options.HEADER.enable) {
      y = Math.max(y, options.HEADER.disabledTop);
    } else {
      y = Math.max(y, 0);
    }

    // 限制右边 & 底部
    x = Math.min(x, clientW - box1W);
    y = Math.min(y, clientH - box1H);

    el.style.left = x + "px";
    el.style.top = y + "px";
    el.style.cursor = "grabbing";
  }

  function handleStopDrag() {
    el.style.pointerEvents = null;
    document.removeEventListener("mousemove", handleMousemove);
    document.removeEventListener("mouseup", handleStopDrag);
  }

  el.addEventListener("mousedown", handleMousedown);
  el.addEventListener("mouseenter", () => (el.style.cursor = "pointer"));
  el.addEventListener("mouseleave", () => (el.style.cursor = ""));

  function cleanup() {
    window.removeEventListener("resize", updateClientWH);
    el.removeEventListener("mousedown", handleMousedown);
  }

  function enforcePositionLimit() {
    const rect = el.getBoundingClientRect();
    let left = rect.left;
    let top = rect.top;

    // Left boundary
    if (options.COLLAPSE.enable && left < options.COLLAPSE.disabledLeft) {
      left = options.COLLAPSE.disabledLeft;
    }

    // Upper boundary
    if (options.HEADER.enable && top < options.HEADER.disabledTop) {
      top = options.HEADER.disabledTop;
    }

    // Right/Bottom Boundary
    left = Math.min(left, clientW - el.clientWidth);
    top = Math.min(top, clientH - el.clientHeight);

    el.style.left = `${left}px`;
    el.style.top = `${top}px`;
  }

  function updateOptions(newOptions = {}) {
    if (newOptions.COLLAPSE) {
      options.COLLAPSE = { ...options.COLLAPSE, ...newOptions.COLLAPSE };
    }
    if (newOptions.HEADER) {
      options.HEADER = { ...options.HEADER, ...newOptions.HEADER };
    }
    // Force check if the drag position is out of bounds
    enforcePositionLimit();
  }

  return { updateOptions, cleanup };
}
