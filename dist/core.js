function g(e, {
  COLLAPSE: v = {
    enable: !1,
    disabledLeft: 0
  },
  HEADER: b = {
    enable: !1,
    disabledTop: 0
  }
} = {}) {
  e.style.position = "fixed", e.style.pointerEvents = null;
  let u = 0, r = 0, c = 0, L = 0, i = 0, o = 0, a = 0, l = 0, n = {
    COLLAPSE: { ...v },
    HEADER: { ...b }
  };
  function E() {
    a = document.body.clientWidth || 0, l = document.body.clientHeight || window.innerHeight || 0;
  }
  E(), window.addEventListener("resize", E);
  function f(t) {
    t.button === 0 && (c = e.clientWidth, L = e.clientHeight, t.preventDefault(), u = t.clientX - e.getBoundingClientRect().left, r = t.clientY - e.getBoundingClientRect().top, document.addEventListener("mousemove", m), document.addEventListener("mouseup", p));
  }
  function m(t) {
    e.style.pointerEvents = "none", t.preventDefault(), i = t.clientX - u, o = t.clientY - r, n.COLLAPSE.enable ? i = Math.max(i, n.COLLAPSE.disabledLeft) : i = Math.max(i, 0), n.HEADER.enable ? o = Math.max(o, n.HEADER.disabledTop) : o = Math.max(o, 0), i = Math.min(i, a - c), o = Math.min(o, l - L), e.style.left = i + "px", e.style.top = o + "px", e.style.cursor = "grabbing";
  }
  function p() {
    e.style.pointerEvents = null, document.removeEventListener("mousemove", m), document.removeEventListener("mouseup", p);
  }
  e.addEventListener("mousedown", f), e.addEventListener("mouseenter", () => e.style.cursor = "pointer"), e.addEventListener("mouseleave", () => e.style.cursor = "");
  function A() {
    window.removeEventListener("resize", E), e.removeEventListener("mousedown", f);
  }
  function h() {
    const t = e.getBoundingClientRect();
    let s = t.left, d = t.top;
    n.COLLAPSE.enable && s < n.COLLAPSE.disabledLeft && (s = n.COLLAPSE.disabledLeft), n.HEADER.enable && d < n.HEADER.disabledTop && (d = n.HEADER.disabledTop), s = Math.min(s, a - e.clientWidth), d = Math.min(d, l - e.clientHeight), e.style.left = `${s}px`, e.style.top = `${d}px`;
  }
  function H(t = {}) {
    t.COLLAPSE && (n.COLLAPSE = { ...n.COLLAPSE, ...t.COLLAPSE }), t.HEADER && (n.HEADER = { ...n.HEADER, ...t.HEADER }), h();
  }
  return { updateOptions: H, cleanup: A };
}
export {
  g as initDraggable
};
