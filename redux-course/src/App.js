import React from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

const App = props => {
  const { todos } = props;

  return (
    <div className="App">
      <header className="App-header">TODO</header>
      <div className="Todo-App">
        <TodoForm />
        <TodoList todos={todos} />
      </div>
    </div>
  );
};

export default App;
