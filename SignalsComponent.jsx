import {count, doubleCount} from "./SharedState.js";


function CounterApp() {
	const increment = () => {
		// 3. Update the state by directly assigning to the .value property
		count.value += 1;
	};

	const decrement = () => {
		count.value -= 1;
	};

	return (
		<div style={{ padding: "20px", fontFamily: "sans-serif" }}>
			<h1>Preact Signals + React</h1>

			{/* Accessing .value registers this exact JSX text node as a subscriber */}
			<p>
				Current Count: <strong>{count.value}</strong>
			</p>
			<p>
				Double Count: <strong>{doubleCount.value}</strong>
			</p>

			<div style={{ display: "flex", gap: "10px" }}>
				<button onClick={decrement}>Decrement</button>
				<button onClick={increment}>Increment</button>
			</div>
		</div>
	);
}

export default CounterApp;
