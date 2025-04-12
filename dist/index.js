import { initDraggable as c } from "./core.js";
function d(e, i) {
  let n = "drag-mate", o = {};
  if (typeof e == "string" ? (n = e, o = i || {}) : typeof e == "object" && (o = e), !customElements.get(n)) {
    class s extends HTMLElement {
      constructor() {
        super(), this.root = this.attachShadow({ mode: "open" }), this._cleanup = null, this._updateOptions = null;
      }
      connectedCallback() {
        const t = document.createElement("div");
        t.innerHTML = "<slot></slot>", this.root.appendChild(t);
        const { cleanup: l, updateOptions: a } = c(t, o);
        this._cleanup = l, this._updateOptions = a;
      }
      disconnectedCallback() {
        typeof this._cleanup == "function" && this._cleanup();
      }
      // 提供更新方法
      updateDragOptions(t) {
        typeof this._updateOptions == "function" && this._updateOptions(t);
      }
    }
    customElements.define(n, s);
  }
}
export {
  d as defineDraggableBox
};
