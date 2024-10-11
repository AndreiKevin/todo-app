import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

export default function TodoApp() {
	const router = useRouter();
	useEffect(() => {
		if (!session) router.push("/auth");
	}, [session]);

	const [todos, setTodos] = useState([]);
	const [newTask, setNewTask] = useState("");
	const supabase = useSupabaseClient();
	const session = useSession();

	useEffect(() => {
		if (session) fetchTodos();
	}, [session]);

	const fetchTodos = async () => {
		const { data } = await supabase
			.from("todos")
			.select("*")
			.eq("user_id", session.user.id);
		setTodos(data);
	};

	const addTodo = async () => {
		if (newTask.trim() === "") return;
		const { data, error } = await supabase
			.from("todos")
			.insert([{ task: newTask, user_id: session.user.id }]);
		if (!error) setTodos([...todos, data[0]]);
		setNewTask("");
	};

	const toggleComplete = async (id, isComplete) => {
		await supabase
			.from("todos")
			.update({ is_complete: !isComplete })
			.eq("id", id);
		fetchTodos();
	};

	const deleteTodo = async (id) => {
		await supabase.from("todos").delete().eq("id", id);
		fetchTodos();
	};

	if (!session) return <p>Please log in to see your to-do list.</p>;

	return (
		<div>
			<h1>To-do List</h1>
			<input
				type="text"
				placeholder="Enter new task"
				value={newTask}
				onChange={(e) => setNewTask(e.target.value)}
			/>
			<button onClick={addTodo}>Add Task</button>
			<ul>
				{todos.map((todo) => (
					<li key={todo.id}>
						<span
							style={{
								textDecoration: todo.is_complete ? "line-through" : "none",
							}}
						>
							{todo.task}
						</span>
						<button onClick={() => toggleComplete(todo.id, todo.is_complete)}>
							{todo.is_complete ? "Undo" : "Complete"}
						</button>
						<button onClick={() => deleteTodo(todo.id)}>Delete</button>
					</li>
				))}
			</ul>
		</div>
	);
}
