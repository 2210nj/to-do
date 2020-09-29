import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";

import './Todo.css'
import React from "react";

function Todo(props) {
  return (
    // <div>
    //   <li>{props.text}</li>
    // </div>
    <List className="todo__list">
      <ListItem>
        <ListItemAvatar></ListItemAvatar>
        <ListItemText   primary={props.text} secondary="dummy deadline ⏰ "></ListItemText>
      </ListItem>
    </List>
  );
}

export default Todo;
