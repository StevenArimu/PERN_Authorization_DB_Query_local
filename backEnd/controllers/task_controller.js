const pool = require("../config/db");
const { all } = require("../routes/tasks.routes");

// const tasksList = async (req, res) => {
//   const result = await pool.query("SELECT NOW()");
//   res.json(result.rows[0].now);
// };
const getAllTasks = async (req, res, next) => {
  try {
    // throw new Error("Algo fue mal");
    const allTasks = await pool.query("SELECT * FROM task");
    res.json({ msg: "retrieving a list of tasks", data: allTasks.rows });
  } catch (error) {
    next(error);
    // console.log(error.message);
    // res.json({ msg: error.message });
  }
};
const getTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM tasK WHERE id = $1", [id]);
    if (result.rows.length === 0)
      return res.status(404).json({ msg: "Task not found" });
    console.log(result.rows);
    res.json({ msg: "retrieving a single Task", data: result.rows[0] });
  } catch (error) {
    next(error);
    // console.log(error.message);
    // res.json({ msg: error.message });
  }
};
const createTask = async (req, res, next) => {
  const { title, description } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO task (title, description) VALUES ($1,$2) RETURNING *",
      [title, description]
    );
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
    // console.log(error.message);
    // res.json({ msg: error.message });
  }
};
const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM task WHERE id=$1 RETURNING *",
      [id]
    );
    if (result.rowCount === 0)
      return res.status(404).json({ msg: "task not found" });
    res.json({ msg: "deleting a task", data: result.rows });
  } catch (error) {
    next(error);
    // console.log(error);
    // res.json({ msg: error.message });
  }
};
const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const result = await pool.query(
      "UPDATE task SET title=$1, description=$2 WHERE id=$3 RETURNING *",
      [title, description, id]
    );
    if (result.rows.lengtho === 0) {
      return res.status(404).json({ msg: "Id not found" });
    }
    res.json({ data: result.rows, msg: "updated successfully" });
  } catch (error) {
    next(error);
    // console.log(error);
    // res.json({ msg: error.message });
  }
};

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
};
