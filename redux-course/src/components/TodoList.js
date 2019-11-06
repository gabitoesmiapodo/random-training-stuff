import React from 'react';

const TodoItem = ({ isComplete, name }) => (
  <li>
    <input type="checkbox" defaultChecked={isComplete} /> {name}
  </li>
);

export default ({ todos }) => (
  <div className="Todo-List">
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </ul>
  </div>
);
