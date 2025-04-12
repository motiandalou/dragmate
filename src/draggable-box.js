import { initDraggable } from "./core.js";

export function defineDraggableBox(tagNameOrOptions, maybeOptions) {
  let tagName = "drag-mate";
  let options = {};

  if (typeof tagNameOrOptions === "string") {
    tagName = tagNameOrOptions;
    options = maybeOptions || {};
  } else if (typeof tagNameOrOptions === "object") {
    options = tagNameOrOptions;
  }

  if (!customElements.get(tagName)) {
    class DraggableBox extends HTMLElement {
      constructor() {
        super();
        this.root = this.attachShadow({ mode: "open" });
        this._cleanup = null;
        this._updateOptions = null;
      }

      connectedCallback() {
        const box = document.createElement("div");
        box.innerHTML = `<slot></slot>`;
        this.root.appendChild(box);

        // 保存返回的函数
        const { cleanup, updateOptions } = initDraggable(box, options);
        this._cleanup = cleanup;
        this._updateOptions = updateOptions;
      }

      disconnectedCallback() {
        if (typeof this._cleanup === "function") {
          this._cleanup();
        }
      }

      // 提供更新方法
      updateDragOptions(newOptions) {
        if (typeof this._updateOptions === "function") {
          this._updateOptions(newOptions);
        }
      }
    }

    customElements.define(tagName, DraggableBox);
  }
}
