const express = require("express");
const router = new express.Router();
const Task = require("../models/task");
const auth = require("../middleware/auth");

//create new task
router.post("/createTask", auth, async (req, res) => {
  // const task = new Task(req.body);
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

//fetch all tasks for logged in user
//GET/getAllTasks?completed=true or completed=false
//limit skip = GET/getAllTasks?limit=10&skip=0
//GET/getAllTasks?sortBy=
router.get("/getAllTasks", auth, async (req, res) => {
  const match = {};
  const sort = {};

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }

  try {
    // const tasks = await Task.find({ owner: req.user.id });
    await req.user.populate({
      path: "tasks",
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort,
      },
    });
    res.status(200).send(req.user.tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

//fetch single task by i'd for logged in user
router.get("/getTaskById/:id", auth, async (req, res) => {
  console.log(req.params.id);
  _id = req.params.id;

  try {
    const task = await Task.findOne({
      _id,
      owner: req.user._id,
    });
    if (!task) return res.status(404).send();
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

//update single task by i'd
router.post("/updateTask/:id", auth, async (req, res) => {
  const allowedUpdates = ["description", "completed"];
  const updates = Object.keys(req.body);
  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidUpdate)
    return res.status(400).send({ error: "Invalid update !" });

  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) return res.status(404).send();
    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    res.status(200).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

//delete single task by i'd
router.delete("/deleteTask/:id", auth, async (req, res) => {
  try {
    const deletedTask = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id,
    });
    if (!deletedTask) return res.status(404).send();
    res.status(200).send(deletedTask);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
