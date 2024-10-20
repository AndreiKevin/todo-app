"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../contexts/AuthContext";
import Counter from "../../../components/Counter";
import SimpleCalculator from "../../../components/Calculator";
import GrowButton from "../../../components/GrowingButton";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const { signIn } = useAuth();
	const router = useRouter();

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		try {
			await signIn(email, password);
			router.push("/");
		} catch (error) {
			setError(error.message);
			console.error("Error signing in:", error);
		}
	}

	return (
		<div className="max-w-md mx-auto mt-10">
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label htmlFor="email" className="block">
						Email
					</label>
					<input
						type="email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="w-full p-2 border rounded"
					/>
				</div>
				<div>
					<label htmlFor="password" className="block">
						Password
					</label>
					<input
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="w-full p-2 border rounded"
					/>
				</div>
				<button
					type="submit"
					className="w-full px-4 py-2 bg-blue-500 text-white rounded"
				>
					Sign In
				</button>
				{error && <div className="text-red-500">{error}</div>}
				<div>
					No account? <a href="/signup">Sign up</a>
				</div>
			</form>

			<div className="mt-4">
				<Counter />
				<SimpleCalculator />
				<GrowButton />
			</div>
		</div>
	);
}
