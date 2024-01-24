const {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/task_controller");

const { Router } = require("express");
const router = Router();

router.get("/tasks", getAllTasks);
router.get("/tasks/:id", getTask);
router.post("/tasks", createTask);
router.deleteTask("/tasks/:id", deleteTask);
router.put("/tasks/:id", updateTask);

module.exports = router;
