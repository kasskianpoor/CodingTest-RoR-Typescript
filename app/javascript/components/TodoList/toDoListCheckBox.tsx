import { TodoItem } from ".";
import { useState } from "react";
import { Container, ListGroup, Form } from "react-bootstrap";
import axios from "axios";
import React from "react";

const ToDoListCheckBox: React.FC<{ todoItem: TodoItem }> = ({ todoItem }) => {
  const checkBoxOnCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoItemId: number
  ): void => {
    axios.post("/todo", {
      id: todoItemId,
      checked: e.target.checked,
    });
  };

  const [checkboxItems, setCheckBoxItems] = useState<TodoItem>({ ...todoItem });

  return (
    <ListGroup.Item key={checkboxItems.id}>
      <Form.Check
        type="checkbox"
        label={checkboxItems.title}
        checked={checkboxItems.checked}
        onChange={(e) => {
          checkBoxOnCheck(e, checkboxItems.id);
          setCheckBoxItems({
            ...checkboxItems,
            checked: !checkboxItems.checked,
          });
        }}
      />
    </ListGroup.Item>
  );
};

export default ToDoListCheckBox;
