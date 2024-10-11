'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../contexts/AuthContext";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { signUp } = useAuth();
	const router = useRouter();

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		try {
			await signUp(email, password);
			router.push("/login");
		} catch (error) {
			console.error("Error signing up:", error);
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
					Sign Up
				</button>
				<div>
                    Have an account? <a href="/login">Log in</a>
				</div>
			</form>
		</div>
	);
}
