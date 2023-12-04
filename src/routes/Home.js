import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { useState, useEffect } from "react";
import RadioButton from "../components/RadioButton/RadioButton";
import TodoList from "../components/TodoList/todolist";
import TextInput from "../components/TextInput/TextInput";
import GridColumn from "../components/Grid/Grid";
import Modal from "../components/Modal/Modal";

import {
  Button,
  Box,
  Grid,
  Container,
  RadioGroup,
  Divider,
  Typography,
} from "@mui/material";

const Home = () => {
  const [task, setTask] = useState("");
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Low");
  const [todoList, setTodoList] = useState(
    JSON.parse(localStorage.getItem("Tasks")) || []
  );
  const [inProgressList, setInProgessList] = useState(
    JSON.parse(localStorage.getItem("inProgressTasks")) || []
  );
  const [completedList, setCompletedList] = useState(
    JSON.parse(localStorage.getItem("completedTasks")) || []
  );
  const [isOpen, setIsOpen] = useState(false);
  const [updateTask, setUpdateTask] = useState(false);
  const [updateTaskObject, setUpdateTaskObject] = useState({});

  const resetTask = () => {
    setTitle((prevTitle) => "");
    setTask((prevTask) => "");
    setPriority((prevPriority) => "Low");
  };

  const modalHandler = () => {
    setIsOpen(!isOpen);
    resetTask();

    if (isOpen) {
      setUpdateTask(false);
    }
  };

  useEffect(() => {
    console.log(updateTaskObject, "use effect");
  }, [updateTaskObject]);

  const setPriorityHandler = (e) => {
    setPriority(e.target.value);
  };

  const titleInput = (e) => {
    setTitle(e.target.value);
  };

  const taskInput = (e) => {
    setTask(e.target.value);
  };

  const addTask = () => {
    const id = todoList.length + 1;
    setTodoList((prev) => [
      ...prev,
      {
        id: id,
        title: title,
        task: task,
        inProgress: false,
        completed: false,
        priority: priority,
      },
    ]);
    setTitle("");
    setTask("");
  };

  useEffect(() => {
    localStorage.setItem("Tasks", JSON.stringify([...todoList]));
  }, [todoList]);

  useEffect(() => {
    localStorage.setItem(
      "inProgressTasks",
      JSON.stringify([...inProgressList])
    );
  }, [inProgressList]);

  useEffect(() => {
    localStorage.setItem("completedTasks", JSON.stringify([...completedList]));
  }, [completedList]);

  // fix the logic here tomorrow
  const updateTaskHandler = () => {
    if (todoList.length) {
      const index = todoList.findIndex(
        (task) => task.id === updateTaskObject.id
      );

      setTodoList((prev) => [
        ...prev.slice(0, index),
        { ...todoList[index], task: task, title: title, priority: priority },
        ...prev.slice(index + 1),
      ]);
    }

    setTitle("");
    setTask("");
    setIsOpen(false);
    setUpdateTask(false);
  };

  const editTaskHandler = (todo) => {
    setUpdateTask(true);
    setIsOpen(!isOpen);
    setTitle(todo.title);
    setTask(todo.task);
    setPriority(todo.priority);
    setUpdateTaskObject({ ...todo });
  };

  const deleteTaskHandler = (todo) => {
    if (todo.inProgress === false) {
      setTodoList((prev) => prev.filter((t) => t.id !== todo.id));
    } else if (todo.completed === false) {
      setInProgessList((prev) => prev.filter((t) => t.id !== todo.id));
    } else {
      setCompletedList((prev) => prev.filter((t) => t.id !== todo.id));
    }
  };

  const inProgressTaskHandler = (todo) => {
    // const id = inProgressList.length + 1;
    todo.inProgress = true;
    setTodoList((prev) => prev.filter((t) => t.id !== todo.id));
    setInProgessList((prev) => [...prev, todo]);
    localStorage.setItem(
      "inProgressTasks",
      JSON.stringify([...inProgressList])
    );
  };

  const completeTaskHandler = (todo) => {
    // const id = completedList.length + 1;
    todo.completed = true;
    setInProgessList((prev) => prev.filter((t) => t.id !== todo.id));
    setCompletedList((prev) => [...prev, todo]);
    localStorage.setItem("completedTasks", JSON.stringify([...completedList]));
  };

  return (
    <Box>
      <Modal isOpen={isOpen} modalHandler={modalHandler}>
        <TextInput label="Title" inputHandler={titleInput} valueName={title} />
        <TextInput
          label="*Write task..."
          inputHandler={taskInput}
          valueName={task}
        />
        <RadioGroup
          row
          aria-labelledby="priority-buttons-group-label"
          defaultValue="Low"
          name="priority-buttons-group"
          sx={{ marginBottom: "1rem" }}
        >
          <RadioButton
            value="Low"
            label="Low"
            priority={priority === "Low"}
            onChangeHandler={setPriorityHandler}
          />
          <RadioButton
            value="Medium"
            label="Medium"
            priority={priority === "Medium"}
            onChangeHandler={setPriorityHandler}
          />
          <RadioButton
            value="High"
            label="High"
            priority={priority === "High"}
            onChangeHandler={setPriorityHandler}
          />
        </RadioGroup>
        <Box>
          <Button
            variant="outlined"
            disabled={task.length < 1 ? true : false}
            onClick={updateTask ? updateTaskHandler : addTask}
          >
            {updateTask ? "Update Task" : "Add Task"}
          </Button>
        </Box>
      </Modal>

      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <Button
            size="large"
            onClick={modalHandler}
            style={{ fontSize: "1.5rem" }}
          >
            Add Task
            <AddIcon color="primary" sx={{ marginLeft: "0.5rem" }} />
          </Button>
        </Box>
        <Grid container spacing={4}>
          <GridColumn>
            <Box
              sx={{ borderBottom: "2px solid red", paddingBottom: "0.8rem" }}
            >
              <Typography variant="h6">To do ({todoList.length})</Typography>
            </Box>
            <TodoList
              priorityType="High"
              todoList={todoList}
              deleteHandler={deleteTaskHandler}
              taskHandler={inProgressTaskHandler}
              editHandler={editTaskHandler}
            />
            <Divider light />
            <TodoList
              priorityType="Medium"
              todoList={todoList}
              deleteHandler={deleteTaskHandler}
              taskHandler={inProgressTaskHandler}
              editHandler={editTaskHandler}
            />
            <Divider light />
            <TodoList
              priorityType="Low"
              todoList={todoList}
              deleteHandler={deleteTaskHandler}
              taskHandler={inProgressTaskHandler}
              editHandler={editTaskHandler}
            />
          </GridColumn>

          <GridColumn>
            <Box
              sx={{
                borderBottom: "2px solid yellow",
                paddingBottom: "0.8rem",
              }}
            >
              <Typography variant="h6">
                In Progress ({inProgressList.length})
              </Typography>
            </Box>
            <TodoList
              priorityType="High"
              todoList={inProgressList}
              deleteHandler={deleteTaskHandler}
              taskHandler={completeTaskHandler}
              editHandler={editTaskHandler}
            />
            <Divider light />
            <TodoList
              priorityType="Medium"
              todoList={inProgressList}
              deleteHandler={deleteTaskHandler}
              taskHandler={completeTaskHandler}
              editHandler={editTaskHandler}
            />
            <Divider light />
            <TodoList
              priorityType="Low"
              todoList={inProgressList}
              deleteHandler={deleteTaskHandler}
              taskHandler={completeTaskHandler}
              editHandler={editTaskHandler}
            />
          </GridColumn>

          <GridColumn>
            <Box
              sx={{
                borderBottom: "2px solid green",
                paddingBottom: "0.8rem",
              }}
            >
              <Typography variant="h6">
                Done ({completedList.length})
              </Typography>
            </Box>
            <TodoList
              priorityType="High"
              todoList={completedList}
              deleteHandler={deleteTaskHandler}
            />
            <Divider light />
            <TodoList
              priorityType="Medium"
              todoList={completedList}
              deleteHandler={deleteTaskHandler}
            />
            <Divider light />
            <TodoList
              priorityType="Low"
              todoList={completedList}
              deleteHandler={deleteTaskHandler}
            />
          </GridColumn>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
