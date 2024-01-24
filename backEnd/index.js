const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const app = express();

const taksRoutes = require("./routes/tasks.routes");
const port = 5000;

//middleware
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use(taksRoutes);
app.use((err, req, res, next) => {
  return res.json({
    msg: err.message,
  });
});
app.listen(port, () => {
  console.log(`Server has started ${port}`);
});
