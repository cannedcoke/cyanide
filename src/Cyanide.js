/** @jsx cyanide */

export function cyanide(type, props, ...args) {
  const children = [].concat(...args);
  return {
    type,
    props,
    children,
  };
}

// ======================= state control =======================

let state = {};
let rootComponent = null;
let rootSelector = null;

export function setState(newState) {
  state = { ...state, ...newState };
  rerender();
}

export function getState() {
  return state;
}

export function rerender() {
  const container = document.querySelector(rootSelector);
  container.innerHTML = "";
  container.appendChild(render(rootComponent()));
}

// ======== where the components will be inyected =========
export function mount(component, selector) {
  rootComponent = component;
  rootSelector = selector;
  const container = document.querySelector(selector);
  container.appendChild(render(component()));
}

// =========== this is for flux ==================//
export function createStore(initialState, reducer) {
  let state = initialState;

  return {
    getState: () => state,
    dispatch: (action) => {
      state = reducer(state, action);
      rerender();
    }
  };
}

// ========== rendering ==============//
export function render(node) {
  if (typeof node.type === "function") {
    const result = node.type(node.props);
    return render(result);
  }

  const element = document.createElement(node.type);

  if (node.props) {
    Object.keys(node.props).map((key) => {
      if (key.startsWith("on")) {
        const event = key.slice(2).toLowerCase();
        element.addEventListener(event, node.props[key]);
      } else {
        element.setAttribute(key, node.props[key]);
      }
    });
  }

  (node.children || []).forEach((child) => {
    if (typeof child === "string" || typeof child === "number") {
      return element.appendChild(document.createTextNode(child));
    } else {
      return element.appendChild(render(child));
    }
  });

  return element;
}
