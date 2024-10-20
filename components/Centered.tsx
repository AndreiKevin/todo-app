import type React from "react";

const CenteredHelloWorld: React.FC = () => {
	return (
		<div className="flex justify-center items-center h-screen">
			<h1 className="text-4xl font-bold">Hello World</h1>
		</div>
	);
};

export default CenteredHelloWorld;
