import React, { useState } from "react";
import "./CompletedTodo.css";
import {
  Button,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import db from "./firebase";
import firebase from "firebase";

function CompletedTodo(props) {

  return (
    <div>
      <List className="todo__list completed__list">
        <ListItem>
          <ListItemText
            className="completed__listitem"
            primary={props.text}
          ></ListItemText>
        </ListItem>
      </List>
    </div>
  );
}

export default CompletedTodo;
