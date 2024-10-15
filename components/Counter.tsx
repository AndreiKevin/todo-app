import type React from "react";
import { useState } from "react";

const Counter: React.FC = () => {
	const [count, setCount] = useState<number>(1);

	const increment = () => {
		setCount((prevCount) => prevCount * 2);
	};

	const decrement = () => {
		setCount((prevCount) => prevCount / 2);
	};

	const reset = () => {
		setCount(1);
	};

	const isEven = (num: number) => num % 2 === 0;

	return (
		<div className="flex flex-col items-center p-6 bg-gray-100 rounded-md shadow-md">
			<h1 className="text-3xl font-bold mb-4">Counter: {count}</h1>
			<p className="text-xl mb-4">
				The number is <strong>{isEven(count) ? "Even" : "Odd"}</strong>
			</p>

			<div className="flex space-x-4 mb-4">
				{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
<button
					onClick={decrement}
					className="px-4 py-2 bg-red-500 text-white rounded-md"
				>
					Decrement
				</button>
				{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
<button
					onClick={increment}
					className="px-4 py-2 bg-blue-500 text-white rounded-md"
				>
					Increment
				</button>
				{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
<button
					onClick={reset}
					className="px-4 py-2 bg-gray-500 text-white rounded-md"
				>
					Reset
				</button>
			</div>
		</div>
	);
};

export default Counter;
