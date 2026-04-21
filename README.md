# @miqueaszarate/cyanide

A lightweight JSX framework built from scratch. Cyanide lets you write JSX without React, using your own virtual DOM and state management.

---

## Installation

```bash
npm install @miqueaszarate/cyanide
```

---

## Setup

Since cyanide uses JSX, you need Babel to compile it. Install the JSX transform plugin:

```bash
npm install --save-dev @babel/plugin-transform-react-jsx
```

Add a `babel.config.json` to your project:

```json
{
  "plugins": [
    ["@babel/plugin-transform-react-jsx", { "pragma": "cyanide" }]
  ]
}
```

Add `/** @jsx cyanide */` at the top of every `.jsx` file.

---

## Usage

### Basic rendering

```jsx
/** @jsx cyanide */
import { cyanide, mount } from '@miqueaszarate/cyanide';

const App = () => (
  <div>
    <h1>hello world</h1>
  </div>
);

mount(App, '#app');
```

### Components and props

```jsx
/** @jsx cyanide */
import { cyanide } from '@miqueaszarate/cyanide';

const Greeting = ({ name }) => (
  <h2>{name}</h2>
);

export { Greeting };
```

### State management with createStore

Cyanide includes a Flux-inspired state management system.

```jsx
/** @jsx cyanide */
import { cyanide, mount, createStore } from '@miqueaszarate/cyanide';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
}

const store = createStore(initialState, reducer);

const App = () => {
  const { count } = store.getState();
  return (
    <div>
      <h1>{count}</h1>
      <button onclick={() => store.dispatch({ type: 'INCREMENT' })}>+</button>
      <button onclick={() => store.dispatch({ type: 'DECREMENT' })}>-</button>
    </div>
  );
};

mount(App, '#app');
```

---

## API

### cyanide(type, props, ...children)

The JSX factory function. Babel calls this automatically when it compiles JSX. Returns a virtual DOM node.

### mount(component, selector)

Renders a component into a DOM element. Takes the component function and a CSS selector string.

```js
mount(App, '#app');
```

### render(node)

Converts a virtual DOM node into a real DOM element. Used internally by mount.

### createStore(initialState, reducer)

Creates a state store. Returns an object with two methods:

- `getState()` — returns the current state
- `dispatch(action)` — sends an action to the reducer and triggers a re-render

---

## How it works

JSX is compiled by Babel into calls to `cyanide()`, which builds a tree of plain JS objects describing your UI. This is the virtual DOM. When you call `mount()`, `render()` walks that tree and creates real DOM elements. When state changes via `dispatch()`, the component re-renders.

---

## License

MIT