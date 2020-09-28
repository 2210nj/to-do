import React, { useState } from 'react';
import './App.css';
// import Button from '@material-ui/core/Button';
import { FormControl, Button, InputLabel, Input } from '@material-ui/core';

function App() {
  const [todos, setTodos] = useState(['Study', 'Work']);
  const [input, setInput] = useState('')

  const addToDo = (event) => {
    event.preventDefault();
    setTodos([...todos, input]);
    setInput('');
  }
  return (
    <div className="App">
      <h1>Hello World  </h1>
      <FormControl>
        <InputLabel>✅ Write a to-do</InputLabel>
        <Input value={input} onChange={event => (setInput(event.target.value))} />
        <Button type="submit" disabled={!input}  onClick={addToDo} variant="contained" color="primary">
          Add
        </Button>
      </FormControl>
      <ul>
        {todos.map(todo => (
          <li>{todo}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
