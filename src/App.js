import React, { useState, useEffect } from "react";
import "./App.css";
import Button from "@material-ui/core/Button";
import { FormControl, InputLabel, Input } from "@material-ui/core";
import Todo from "./Todo";
import db from "./firebase";
import firebase from "firebase";
import CompletedTodo from "./CompletedTodo";
import { Image } from "@material-ui/icons";
import image from "./images/desk.png";
import MenuIcon from "@material-ui/icons/Menu";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { IconButton } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AddTodo from "./AddTodo";
import FullScreenDialog from "./FullScreenDialog";
import FormDialog from "./FormDialog";

function App() {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setcompletedTodos] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    db.collection("todos")
      .orderBy("timeStamp", "desc")
      .onSnapshot((snapshot) => {
        console.log(snapshot.docs.map((doc) => doc.data()));
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        );
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

  const onMenuClick = () => {
    console.log("You just clicked on Menu icon");
  };

  const onAddClick = () => {
    setOpen(true);
    console.log("You just clicked on Add icon");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onMoreOptionsClick = () => {
    console.log("You just clicked on More Options icon");
  };

  return (
    <div className="app">
      <div className="app__container">
        <div className="app__header">
          <h2>My Tasks</h2>
        </div>
        {todos.length ? (
          <div className="app__body">
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
        ) : (
          <div className="app__body">
            <img className="app__image" src={image} alt="https://favpng.com/" />
            <div class="app__motivationText">
              <p>Let's get some work done..</p>
              <p>Anything to add?</p>
            </div>
          </div>
        )}

        <div className="app__footer">
          <IconButton onClick={onMenuClick} className="icons">
            <MenuIcon />
          </IconButton>
          <IconButton>
            <AddCircleIcon onClick={onAddClick} />
          </IconButton>
          <IconButton onClick={onMoreOptionsClick}>
            <MoreVertIcon />
          </IconButton>
          {open ? <FormDialog open={open} /> : null}
        </div>
      </div>

      {/* <form>
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
      </ul>*/}
    </div>
  );
}

export default App;
