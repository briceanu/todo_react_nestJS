import React from 'react';
import { TiDelete } from 'react-icons/ti';
import { AiOutlineCheck } from 'react-icons/ai';
import { BsPencilSquare } from 'react-icons/bs';
import style from '../style/styles.module.scss';
import { Todo } from '../App';

interface TodoItemProps {
  item: Todo;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  item,
  deleteTodo,
  updateTodo,
}) => {
  return (
    <div className={style.todo__container} key={item.id}>
      <h1 className={`${item.status ? style.completed : style.unfinished}`}>
        {item.todo}
      </h1>
      <div>
        <TiDelete onClick={() => deleteTodo(item.id)} className={style.favi} />

        {item.status === true ? (
          <AiOutlineCheck
            onClick={() => updateTodo(item.id)}
            className={style.finish__favi}
          />
        ) : (
          <BsPencilSquare
            onClick={() => updateTodo(item.id)}
            className={style.unfinish_favi}
          />
        )}
      </div>
    </div>
  );
};

export default TodoItem;
