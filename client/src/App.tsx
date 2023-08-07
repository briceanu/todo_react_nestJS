import { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import style from './style/styles.module.scss';

export interface Todo {
  id: string;
  todo: string;
  status: boolean;
}
function App() {
  const API = 'http://localhost:3001';

  const [todos, setTodos] = useState<Todo[]>([]);

  const getAllTodos = async (): Promise<void> => {
    await fetch(`${API}/todos`, {
      method: 'GET',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('data not fetch');
        }
        return res.json();
      })
      .then((data) => setTodos(data))
      .catch((error) => console.log('Error:', error));
  };
  useEffect(() => {
    getAllTodos();
  }, []);
  //

  const deleteTodo = async (id: string): Promise<void> => {
    try {
      const response = await fetch(`${API}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Assuming the API returns an empty response after successful deletion
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const updateTodo = async (id: string): Promise<void> => {
    try {
      // Send PUT request to update the status on the server
      await fetch(`${API}/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          //the question mark is the optional chaning operator
          status: !todos.find((todo) => todo.id === id)?.status,
        }),
      });

      // Create a new array with updated status and set it as the new state
      setTodos((prevTodos): Todo[] =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, status: !todo.status } : todo
        )
      );
    } catch (error) {
      console.log('Error updating todo:', error);
    }
  };
  return (
    <>
      <main>
        <div className={style.contianer}>
          <h1 className={style.h1}>What's the plan for today?</h1>
          <TodoForm setTodos={setTodos} todos={todos} />

          {todos.map((item) => (
            <TodoItem
              key={item.id}
              item={item}
              deleteTodo={deleteTodo}
              updateTodo={updateTodo}
            />
          ))}
        </div>
      </main>
    </>
  );
}

export default App;
