import {
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import db from "./firebase";

import "./Todo.css";
import React, { useState } from "react";
import firebase from "firebase";


function Todo(props) {
  const [completedTodos, setCompletedTodos] = useState([]);
  const completeTodo = (event) => {
    //add item in completedTodos
    addTaskToCompletedList(db.collection('todos').doc(props.text))
    //delete item from todos
    db.collection("todos").doc(props.text).delete(); //currently not working
  };

  const addTaskToCompletedList = (todo) => {
    console.log('Hello There', props.text);
    db.collection("completedTodos").add({
      todo: props.text,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setCompletedTodos([...completedTodos, props.text]);
  };

  return (
    <div>
      <List className="todo__list">
        <ListItem>
          <ListItemText
            primary={props.text}
          ></ListItemText>
          <Button color="secondary" onClick={completeTodo}>
            Delete
          </Button>
        </ListItem>
      </List>
      
    </div>
  );
}

export default Todo;
