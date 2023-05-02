const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");
const router = new express.Router();

//create new user
router.post("/createUsers", async (req, res) => {
  const user = new User(req.body);

  try {
    const token = await user.generateAuthToken();
    // await user.save();
    res.status(201).send({ user, token });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

//login user
router.post("/user/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

//logout user
router.post("/user/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((tokenObject) => {
      return tokenObject.token !== req.token;
    });

    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

//logout from all sessions
router.post("/user/logoutAllSessions", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

//fetch logged in user's profile
router.get("/user/me", auth, async (req, res) => {
  res.send(req.user);
});

// //fetch single user by i'd
// router.get("/getUserById/:id", async (req, res) => {
//   console.log(req.params.id);
//   const _id = req.params.id;
//   try {
//     const user = await User.findById(_id);
//     if (!user) return res.status(400).send();
//     res.status(200).send(user);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

//update single user by i'd
router.post("/updateUser/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates !" });
  }
  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.status(200).send(req.user);
  } catch (error) {
    res.status(400).send(error);
  }
});

//delete single user by i'd
router.delete("/deleteUser/me", auth, async (req, res) => {
  try {
    _id = req.user._id;
    await User.findByIdAndRemove({ _id });
    res.send(req.user);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
