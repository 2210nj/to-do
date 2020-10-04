import {
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import db from "./firebase";

import { IconButton } from "@material-ui/core";
import "./Todo.css";
import React, { useState } from "react";
import firebase from "firebase";
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

function Todo(props) {
 const [completedTodos, setCompletedTodos] = useState([]);
  const addToCompletedTasks = (event) => {
    //add to completed todo list
    db.collection("completedTodos").add({
      todo: props.todo.todo,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setCompletedTodos([...completedTodos, props.todo.todo]);

    //delete from todo list
    db.collection("todos").doc(props.todo.id).delete()
  }

  return (
    <div>
      <List className="todo__list">
        <ListItem>
        <IconButton  onClick={addToCompletedTasks}>
            <RadioButtonUncheckedIcon/>
          </IconButton>
          <ListItemText primary={props.todo.todo}></ListItemText>
        </ListItem>
      </List>
    </div>
  );
}

export default Todo;
