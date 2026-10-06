import React, { useLayoutEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const CELL_COUNT = 300;

function Cell({ index, value, renderStats }) {
  renderStats.current += 1;
  return (
    <div className="cell">
      <span>Cell {String(index + 1).padStart(3, '0')}</span>
      <strong>{value}</strong>
    </div>
  );
}

function App() {
  const [value, setValue] = useState(0);
  const renderStats = useRef(0);
  const updateStartedAt = useRef(null);
  const metrics = useRef({ renders: null, duration: null });
  renderStats.current += 1;

  useLayoutEffect(() => {
    if (metrics.current.renders) {
      metrics.current.renders.textContent = renderStats.current.toLocaleString();
      if (updateStartedAt.current !== null) {
        const elapsed = performance.now() - updateStartedAt.current;
        metrics.current.duration.textContent = `${elapsed.toFixed(2)} ms (React commit)`;
      }
    }
  });

  function increment() {
    updateStartedAt.current = performance.now();
    setValue((current) => current + 1);
  }

  return (
    <main className="page">
      <a className="back" href="../">← Demo overview</a>
      <header className="hero">
        <p className="eyebrow">DEMO 01 · REACT STATE</p>
        <h1>One update.<br />A full render.</h1>
        <p className="intro">The parent owns the value and passes it to every cell. Each click renders the parent and all 300 cells again.</p>
      </header>

      <section className="controls" aria-label="Demo controls">
        <div className="counter"><span>Shared value</span><strong>{value}</strong></div>
        <button onClick={increment}>Update value <span aria-hidden="true">↗</span></button>
      </section>

      <section className="metrics" aria-label="Performance metrics">
        <div><span>React renders since load</span><strong ref={(node) => { metrics.current.renders = node; }}>0</strong></div>
        <div><span>Last update to commit</span><strong ref={(node) => { metrics.current.duration = node; }}>—</strong></div>
      </section>

      <div className="section-heading"><h2>Subscribers</h2><span>{CELL_COUNT} cells</span></div>
      <section className="grid" aria-label="Cells that display the shared value">
        {Array.from({ length: CELL_COUNT }, (_, index) => (
          <Cell key={index} index={index} value={value} renderStats={renderStats} />
        ))}
      </section>
      <footer>React state makes the owner render again. Its children render again when their props change.</footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
