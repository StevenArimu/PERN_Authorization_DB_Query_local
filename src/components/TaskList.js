import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Button } from "@mui/material";

const TaskList = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState(null);
  const loadTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const list = await res.json();
    setTasks(list.data);
    console.log("task", tasks);
  };
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "DELETE",
      });
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = (id) => {
    navigate(`/task/${id}/edit`);
    console.log(id);
  };
  useEffect(() => {
    loadTasks();
  }, []);
  return (
    <div>
      <h1>TaskList</h1>
      {tasks?.map((task, index) => (
        <Card
          key={task.id}
          style={{
            marginBottom: ".7rem",
            backgroundColor: "#1e272e",
          }}
        >
          <CardContent
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ color: "white" }}>
              <Typography>{task.title}</Typography>
              <Typography>{task.description}</Typography>
            </div>
            <div>
              <Button
                variant="contained"
                color="inherit"
                onClick={() => handleEdit(task.id)}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="warning"
                style={{ marginLeft: ".7rem" }}
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TaskList;
