export interface CollapseOptions {
  /**
   * Whether the sidebar is enabled (default: false)
   */
  enable?: boolean;
  /**
   * Disabled area width on the left
   */
  disabledLeft?: number;
}

export interface HeaderOptions {
  /**
   * Whether the header is enabled
   */
  enable?: boolean;

  /**
   * Disabled area height on the top
   */
  disabledTop?: number;
}

export interface InitDraggableOptions {
  COLLAPSE?: CollapseOptions;
  HEADER?: HeaderOptions;
}

export interface InitDraggableResult {
  /**
   * Update configuration dynamically
   */
  updateOptions: (newOptions: InitDraggableOptions) => void;

  /**
   * Cleanup event listeners and internal state
   */
  cleanup: () => void;
}

/**
 * Make an element draggable within the viewport,
 * respecting sidebar and header constraints.
 *
 * @param el - The HTMLElement to be made draggable
 * @param options - Configuration for sidebar and header constraints
 * @returns An object with update and cleanup methods
 */
export function initDraggable(
  el: HTMLElement,
  options?: InitDraggableOptions
): InitDraggableResult;
