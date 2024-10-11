import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import type { Todo } from "../types/todo";
import { useAuth } from "../contexts/AuthContext";

export default function TodoList() {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [newTask, setNewTask] = useState("");
    const [error, setError] = useState<string | null>(null);
	const { user } = useAuth();

	useEffect(() => {
		if (user) {
			fetchTodos();
		}
	}, [user]);

	async function fetchTodos() {
		const { data, error } = await supabase
			.from("todos")
			.select("*")
			.eq("user_id", user?.id)
			.order("created_at", { ascending: true });

		if (error) {
            setError(error.message);
			console.error("Error fetching todos:", error);
		} else {
			setTodos(data || []);
		}
	}

	async function addTodo(e: React.FormEvent) {
		e.preventDefault();
		if (!newTask.trim()) return;

		const { data, error } = await supabase
			.from("todos")
			.insert([{ task: newTask, user_id: user?.id }])
			.select();

		if (error) {
			console.error("Error adding todo:", error);
		} else {
			setTodos([...todos, data[0]]);
			setNewTask("");
		}
	}

	async function toggleTodo(id: number, isCompleted: boolean) {
		const { error } = await supabase
			.from("todos")
			.update({ is_completed: !isCompleted })
			.eq("id", id);

		if (error) {
			console.error("Error updating todo:", error);
		} else {
			setTodos(
				todos.map((todo) =>
					todo.id === id ? { ...todo, is_completed: !isCompleted } : todo,
				),
			);
		}
	}

	async function deleteTodo(id: number) {
		const { error } = await supabase.from("todos").delete().eq("id", id);

		if (error) {
			console.error("Error deleting todo:", error);
		} else {
			setTodos(todos.filter((todo) => todo.id !== id));
		}
	}

	return (
		<div className="max-w-md mx-auto mt-10 gap-2">
			<form onSubmit={addTodo} className="flex flex-row space-x-2 mb-4 gap-2">
				<input
					type="text"
					value={newTask}
					onChange={(e) => setNewTask(e.target.value)}
					placeholder="Add a new task"
					className="w-full p-2 border rounded"
				/>
				<button
					type="submit"
					className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
				>
					Add Todo
				</button>
			</form>
			<ul>
                {error && <div className="text-red-500">{error}</div>}
				{todos.map((todo) => (
					<li
						key={todo.id}
						className="flex items-center justify-between pt-1 border-b"
					>
						<div className="flex items-center">
							<input
								type="checkbox"
								checked={todo.is_completed}
								onChange={() => toggleTodo(todo.id, todo.is_completed)}
								className="pr-4"
							/>
							<div className={todo.is_completed ? "line-through" : ""}>
								{todo.task}
							</div>
						</div>
						{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
						<button
                        className="px-4 py-2 bg-red-500 text-white rounded"
							onClick={() => deleteTodo(todo.id)}
						>
							Delete
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
