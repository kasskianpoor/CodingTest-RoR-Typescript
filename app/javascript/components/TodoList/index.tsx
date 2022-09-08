import React, { useEffect, useState } from "react";
import { Container, ListGroup, Form } from "react-bootstrap";
import { ResetButton } from "./uiComponent";
import axios from "axios";

type TodoItem = {
  id: number;
  title: string;
  checked: boolean;
};

type Props = {
  todoItems: TodoItem[];
};

const TodoList: React.FC<Props> = ({ todoItems }) => {
  useEffect(() => {
    const token = document.querySelector(
      "[name=csrf-token]"
    ) as HTMLMetaElement;
    axios.defaults.headers.common["X-CSRF-TOKEN"] = token.content;
  }, []);

  const checkBoxOnCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoItemId: number
  ): void => {
    axios.post("/todo", {
      id: todoItemId,
      checked: e.target.checked,
    });
  };

  const resetButtonOnClick = (): void => {
    axios.post("/reset").then(() => location.reload());
  };

  return (
    <Container>
      <h3>2022 Wish List</h3>
      <ListGroup>
        {todoItems.map((todo) => {
          const [checkboxItems, setCheckBoxItems] = useState<TodoItem>({...todo});

          return (
            <ListGroup.Item key={checkboxItems.id}>
              <Form.Check
                type="checkbox"
                label={checkboxItems.title}
                checked={checkboxItems.checked}
                onChange={(e) => {
                  checkBoxOnCheck(e, checkboxItems.id);
                  setCheckBoxItems({...checkboxItems, checked: !checkboxItems.checked});
                }}
              />
            </ListGroup.Item>
          );
        })
      }
        <ResetButton onClick={resetButtonOnClick}>Reset</ResetButton>
      </ListGroup>
    </Container>
  );
};

export default TodoList;
