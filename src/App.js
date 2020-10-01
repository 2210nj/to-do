import React, { useState, useEffect } from "react";
import "./App.css";
import Button from "@material-ui/core/Button";
import { FormControl, InputLabel, Input } from "@material-ui/core";
import Todo from "./Todo";
import db from "./firebase";
import firebase from "firebase";
import CompletedTodo from "./CompletedTodo";

function App() {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setcompletedTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    db.collection("todos")
      .orderBy("timeStamp", "desc")
      .onSnapshot((snapshot) => {
        console.log(snapshot.docs.map((doc) => doc.data()));
        setTodos(snapshot.docs.map((doc) => ({id: doc.id ,todo: doc.data().todo})));
      });


      db.collection("completedTodos")
      .orderBy("timeStamp", "desc")
      .onSnapshot((snapshot) => {
        console.log(snapshot);
        setcompletedTodos(snapshot.docs.map((doc) => doc.data().todo));
      });
  }, []);

  const addToDo = (event) => {
    event.preventDefault();
    const date = new Date();
    db.collection("todos").add({
      todo: input,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setTodos([...todos, input]);
    setInput("");
  };
  return (
    <div className="App">
      <h1>My Tasks</h1>
      <form>
        <FormControl>
          <InputLabel>✅ Write a to-do</InputLabel>
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <Button
            type="submit"
            disabled={!input}
            onClick={addToDo}
            variant="contained"
            color="primary"
          >
            Add
          </Button>
        </FormControl>
      </form>
      <ul>
        {todos.map((todo) => (
          <div>
            <Todo todo={todo}></Todo>
          </div>
        ))}
      </ul>
      <p>My completed todos</p>
      <ul>
        {completedTodos.map((completedTodo) => (
          <CompletedTodo todo={completedTodo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
