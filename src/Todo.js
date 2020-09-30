import {
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import db from "./firebase";

import './Todo.css'
import React from "react";

function Todo(props) {
  const deleteToDo = (event) => {
    console.log('you clicked delete');
    db.collection('todos').doc(props.todo.id).delete()
  };

  return (
    // <div>
    //   <li>{props.text}</li>
    // </div>
    <List className="todo__list">
      <ListItem>
        <ListItemAvatar></ListItemAvatar>
        <ListItemText   primary={props.text} secondary="dummy deadline ⏰ "></ListItemText>
        <Button color="secondary" onClick={deleteToDo}>Delete</Button>
      </ListItem>
    </List>
  );
}

export default Todo;
