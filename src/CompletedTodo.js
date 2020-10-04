import React from "react";
import "./CompletedTodo.css";
import { List, ListItem, ListItemText } from "@material-ui/core";

function CompletedTodo(props) {
  return (
    <div>
      <List className="todo__list completed__list">
        <ListItem>
          <ListItemText
            className="completed__listitem"
            primary={props.todo}
          ></ListItemText>
        </ListItem>
      </List>
    </div>
  );
}

export default CompletedTodo;
