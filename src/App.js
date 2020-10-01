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
        console.log(snapshot);
        setTodos(snapshot.docs.map((doc) => doc.data().taskValue));
      });

    db.collection("completedTodos")
      .orderBy("timeStamp", "desc")
      .onSnapshot((snapshot) => {
        console.log(snapshot);
        setcompletedTodos(snapshot.docs.map((doc) => doc.data().taskValue));
      });
  }, []);

  const addToDo = (event) => {
    event.preventDefault();
    const date = new Date();
    db.collection("todos").add({
      taskValue: input,
      taskId: date.getTime(),
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setTodos([...todos, input]);
    setInput("");
  };
  return (
    <div className="App">
      <h1>Hello World </h1>
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
          <Todo taskValue={todo} />

        ))}
      </ul>
      <p>My completed todos</p>
      <ul>
        {completedTodos.map((taskValue) => (
          <CompletedTodo taskValue={taskValue} />
        ))}
      </ul>
    </div>
  );
}

export default App;
