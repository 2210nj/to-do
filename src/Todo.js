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
  // const completeTodo = (event) => {
  //   //add item in completedTodos
  //   addTaskToCompletedList(db.collection("todos").doc('props.taskValue'));
  //   //delete item from todos
  //   db.collection('todos')
  //     .doc('props.todo.taskValue')
  //     .delete()
  //     .then(() => {
  //       console.log("Document successfully deleted!");
  //     })
  //     .catch((error) => {
  //       console.error("Error removing document: ", error);
  //     });
  // };

  // const addTaskToCompletedList = (todo) => {
  //   console.log("Hello There", props);
  //   const date = new Date();
  //   db.collection("completedTodos").add({
  //     taskValue: props.taskValue,
  //     taskId: date.getTime(),
  //     timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
  //   });
  //   setCompletedTodos([...completedTodos, props.taskValue]);
  // };


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
          <ListItemText primary={props.todo.todo}></ListItemText>
          <Button color="secondary" onClick={addToCompletedTasks}>
            Delete
          </Button>
        </ListItem>
      </List>
    </div>
  );
}

export default Todo;
