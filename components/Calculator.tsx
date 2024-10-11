import type React from "react";
import { useState } from "react";

const SimpleCalculator: React.FC = () => {
	const [num1, setNum1] = useState<number>(0);
	const [num2, setNum2] = useState<number>(0);

	const reset = () => {
		setNum1(0);
		setNum2(0);
	};

	return (
		<div className="flex flex-col items-center space-y-4 bg-gray-100 mt-4 p-10 rounded-md shadow-md">
			<div className="flex space-x-2">
				<input
					type="number"
					value={num1}
					onChange={(e) => setNum1(Number(e.target.value))}
					className="border p-2"
					placeholder="Enter first number"
				/>
				<input
					type="number"
					value={num2}
					onChange={(e) => setNum2(Number(e.target.value))}
					className="border p-2"
					placeholder="Enter second number"
				/>
			</div>

			<h2 className="text-2xl">Sum: {num1 + num2}</h2>

			{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
<button
				onClick={reset}
				className="px-4 py-2 bg-gray-500 text-white rounded-md"
			>
				Reset
			</button>
		</div>
	);
};

export default SimpleCalculator;
