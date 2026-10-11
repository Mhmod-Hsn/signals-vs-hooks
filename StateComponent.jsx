import { useState } from "react";

function CounterApp() {
	const [count, setCount] = useState(0);
	const doubleCount = useMemo(() => count * 2, [count]);

	const increment = () => {
		setCount((currentCount) => currentCount + 1);
	};

	const decrement = () => {
		setCount((currentCount) => currentCount - 1);
	};

	return (
		<div style={{ padding: "20px", fontFamily: "sans-serif" }}>
			<h1>React State</h1>

			<p>
				Current Count: <strong>{count}</strong>
			</p>
			<p>
				Double Count: <strong>{doubleCount}</strong>
			</p>

			<div style={{ display: "flex", gap: "10px" }}>
				<button onClick={decrement}>Decrement</button>
				<button onClick={increment}>Increment</button>
			</div>
		</div>
	);
}

export default CounterApp;
