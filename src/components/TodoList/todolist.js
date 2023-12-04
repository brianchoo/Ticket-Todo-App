import React from "react";
import Todo from "./Todo";
import { Box } from "@mui/material";

const TodoList = ({
  todoList,
  priorityType,
  taskHandler,
  editHandler,
  deleteHandler,
}) => {
  return (
    <Box sx={{ marginTop: 3, marginBottom: 3 }}>
      <Box sx={{ marginBottom: 2 }}>{priorityType} Priority</Box>
      {todoList
        .filter((todo) => todo.priority === priorityType)
        .map((todo) => (
          <Todo
            priority={todo.priority}
            key={todo.id}
            todo={todo}
            completeTask={taskHandler}
            editTask={editHandler}
            deleteTask={deleteHandler}
          />
        ))}
    </Box>
  );
};

export default TodoList;
