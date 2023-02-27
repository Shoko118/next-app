import { useTodoStore } from "@/stores/useTodoStore";

export default function ZTodos() {
  // states
  const { description, todos } = useTodoStore();

  // functionality
  const { addTodo, handleDescription, removeTodo } = useTodoStore();

  return (
    <>
      <h1>React Zustand</h1>

      <input type="text" value={description} onChange={(e) => handleDescription(e)} />
      <button onClick={addTodo}>Add</button>

      <div>
        {todos.map((item) => (
          <div key={item.id}>
            <li>{item.description}</li>
            <button onClick={() => removeTodo(item.id)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
}
