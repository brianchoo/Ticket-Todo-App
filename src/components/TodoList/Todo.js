import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Tooltip } from "@mui/material";

const Todo = ({ todo, completeTask, priority, editTask, deleteTask }) => {
  const borderColor = {
    Low: "border-blue",
    Medium: "border-yellow",
    High: "border-red",
  };

  return (
    <Box
      className={`${borderColor[priority]}`}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        padding: "0.5rem",
        borderRadius: "5px",
        margin: "0.5rem",
      }}
    >
      <Box>
        {todo.title ? (
          <Box
            sx={{
              marginRight: "1.5rem",
              marginBottom: "0.5rem",
              fontWeight: "bold",
            }}
          >
            {todo.title}
          </Box>
        ) : (
          ""
        )}

        <Box sx={{ marginRight: "2rem" }}>{todo.task}</Box>
      </Box>

      <Box sx={{ flexShrink: 0 }}>
        <Tooltip title="Delete">
          <DeleteIcon
            fontSize="medium"
            onClick={() => deleteTask(todo)}
            style={{ cursor: "pointer", margin: "0 0.3rem" }}
            className="icon-danger"
          />
        </Tooltip>

        {!todo.inProgress && (
          <>
            <Tooltip title="Edit">
              <EditIcon
                fontSize="medium"
                onClick={() => editTask(todo)}
                style={{ cursor: "pointer", margin: "0 0.3rem" }}
                className="icon-primary"
              />
            </Tooltip>
          </>
        )}

        {!todo.completed && (
          <Tooltip title="Next">
            <ArrowForwardIosIcon
              fontSize="medium"
              onClick={() => completeTask(todo)}
              style={{ cursor: "pointer", margin: "0 0.3rem" }}
              className="icon-primary"
            />
          </Tooltip>
        )}
      </Box>
    </Box>
  );
};

export default Todo;
