import React, { useState, useEffect } from "react";
import "./App.css";
import Button from "@material-ui/core/Button";
import { FormControl, InputLabel, Input } from "@material-ui/core";
import Todo from "./Todo";
import db from "./firebase";
import firebase from "firebase";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        console.log(snapshot);
        setTodos(snapshot.docs.map((doc) => doc.data().todo));
      });
  }, []);

  const addToDo = (event) => {
    event.preventDefault();
    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
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
          <Todo text={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
