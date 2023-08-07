import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import style from '../style/styles.module.scss';
import { Todo } from '../App';

interface TodoFormProps {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  todos: Todo[];
}

const API = 'http://localhost:3001';

const TodoForm: React.FC<TodoFormProps> = ({ setTodos, todos }) => {
  const [todo, setTodo] = useState('');
  const [status] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const saveTodo = async (): Promise<void> => {
    try {
      const response = await axios.post(`${API}/create`, {
        todo,
        status,
      });

      const data = response.data;
      setTodos([...todos, data]);
      setTodo('');
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div className={style.input_container}>
      <input
        type='text'
        value={todo}
        placeholder='add a todo'
        onChange={(e) => setTodo(e.target.value)}
        ref={inputRef}
      />
      <button className={style.saveTodoBtn} onClick={saveTodo}>
        save todo
      </button>
    </div>
  );
};

export default TodoForm;
