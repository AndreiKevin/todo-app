import type React from "react";
import { useState } from "react";

const GrowButton: React.FC = () => {
	const [size, setSize] = useState<number>(100);
	const [bgColor, setBgColor] = useState<string>("bg-blue-500");

	const getRandomColor = () => {
		const colors = [
			"bg-red-500",
			"bg-green-500",
			"bg-blue-500",
			"bg-yellow-500",
			"bg-purple-500",
			"bg-pink-500",
			"bg-orange-500",
		];
		const randomIndex = Math.floor(Math.random() * colors.length);
		return colors[randomIndex];
	};

	const handleClick = () => {
		setSize((prevSize) => prevSize * 2);
		setBgColor(getRandomColor());
	};

	return (
		<div className="flex justify-center items-center w-fit mt-4 mb-20 p-5 bg-gray-100 rounded-md shadow-md">
			{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
<button
				onClick={handleClick}
				style={{ width: `${size}px`, height: `${size}px` }}
				className={`${bgColor} text-white font-bold rounded-full self-center justify-self-center`}
			>
				GROW
			</button>
		</div>
	);
};

export default GrowButton;
