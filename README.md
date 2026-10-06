# Signals vs React state demo

Two small React + Vite apps demonstrate the same shared value rendered in 300 cells.

- `hooks-demo` uses React state passed to every cell. Updating the value rerenders the parent and all 300 cells.
- `signals-demo` uses `@preact/signals-react`. Each cell binds its text to a signal, so the text updates without rerendering the React components.

## Run the demos

In separate terminals:

```sh
cd hooks-demo
npm install
npm run dev
```

```sh
cd signals-demo
npm install
npm run dev
```

Open the two local URLs side by side and click **Update value** a few times. Compare **React renders since load** and the last update timing. The render counts show the update path directly; timing depends on the browser and machine. The React app measures through its commit, while the signal app measures the synchronous signal update, so treat the timings as a rough live illustration rather than a formal benchmark.

Both apps use the same cell count and nearly identical UI. The signals app uses the official `useSignals`-free text binding optimization: passing the signal itself as a JSX child binds its text node directly. See the [Signals for React documentation](https://github.com/preactjs/signals/blob/main/packages/react/README.md#rendering-optimizations).
