import React, { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import './App.css';

const App = () => {
  const [value, setValue] = useState('');
  const [toDos, setToDos] = useState([]);

  const ENTER_KEY = 13;
  const ERASE_KEY = 27;

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const eraseValue = () => {
    setValue('');
  };

  const submit = () => {
    setToDos([
      ...toDos,
      { id: new Date().getTime(), title: value, checked: false },
    ]);
    eraseValue();
  };

  const onKeyDown = (event) => {
    if (event.which === ENTER_KEY) {
      submit();
    } else if (event.which === ERASE_KEY) {
      eraseValue();
    }
  };

  const onToggleChecked = (todo) => {
    setToDos(
      toDos.map((obj) =>
        obj.id === todo.id ? { ...obj, checked: !todo.checked } : obj
      )
    );

    console.log('toggle', todo);
  };

  const onRemove = (todo) => {
    setToDos(toDos.filter((obj) => obj.id !== todo.id));
  };

  return (
    <section id="app" className="container">
      <header>
        <h1 className="title">Lista de Tarefas</h1>
      </header>
      <section className="main">
        <input
          className="new-todo"
          placeholder="Digite sua tarefa aqui"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
        <ul className="todo-list">
          {toDos.map((todo) => (
            <li key={todo.id}>
              <span
                className={['todo', todo.checked ? 'checked' : ''].join(' ')}
                onClick={() => onToggleChecked(todo)}
                onKeyPress={() => onToggleChecked(todo)}
                role="button"
                tabIndex={0}
              >
                {todo.title}
              </span>
              <button
                className="remove"
                type="button"
                onClick={() => onRemove(todo)}
              >
                <MdDelete size={28} />
              </button>
              <hr />
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
};
export default App;
