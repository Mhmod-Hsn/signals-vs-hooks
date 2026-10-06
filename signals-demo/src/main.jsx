import React, { useLayoutEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { signal } from '@preact/signals-react';
import './style.css';

const CELL_COUNT = 300;
const sharedValue = signal(0);

function Cell({ index, renderStats }) {
  renderStats.current += 1;
  return (
    <div className="cell">
      <span>Cell {String(index + 1).padStart(3, '0')}</span>
      <strong><>{sharedValue}</></strong>
    </div>
  );
}

function App() {
  const renderStats = useRef(0);
  const metrics = useRef({ renders: null, duration: null });
  renderStats.current += 1;

  useLayoutEffect(() => {
    if (metrics.current.renders) {
      metrics.current.renders.textContent = renderStats.current.toLocaleString();
    }
  }, []);

  function increment() {
    const startedAt = performance.now();
    sharedValue.value += 1;
    const elapsed = performance.now() - startedAt;
    metrics.current.duration.textContent = `${elapsed.toFixed(2)} ms (signal update)`;
  }

  return (
    <main className="page">
      <a className="back" href="../">← Demo overview</a>
      <header className="hero">
        <p className="eyebrow">DEMO 02 · SIGNALS</p>
        <h1>One update.<br />Only listeners.</h1>
        <p className="intro">Each cell binds directly to the shared signal. Click to update all 300 values while React components stay where they are.</p>
      </header>

      <section className="controls" aria-label="Demo controls">
        <div className="counter"><span>Shared value</span><strong><>{sharedValue}</></strong></div>
        <button onClick={increment}>Update value <span aria-hidden="true">↗</span></button>
      </section>

      <section className="metrics" aria-label="Performance metrics">
        <div><span>React renders since load</span><strong ref={(node) => { metrics.current.renders = node; }}>0</strong></div>
        <div><span>Last signal update</span><strong ref={(node) => { metrics.current.duration = node; }}>—</strong></div>
      </section>

      <div className="section-heading"><h2>Subscribers</h2><span>{CELL_COUNT} cells</span></div>
      <section className="grid" aria-label="Cells subscribed to the shared signal">
        {Array.from({ length: CELL_COUNT }, (_, index) => (
          <Cell key={index} index={index} renderStats={renderStats} />
        ))}
      </section>
      <footer>Signals notify the values that read them. These text nodes update directly, without rerendering the React component tree.</footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
