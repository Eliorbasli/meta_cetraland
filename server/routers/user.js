const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//GETTING ALL USERS
router.get("/", async (req, res) => {
  // res.json(await User.find());
  try {
    res.json(await User.find());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//GETTING ONE USER - get ID_USER return user
router.post("/getUser", async (req, res) => {
  const { _id } = req.body;
  if (_id === "0") {
    return res.json("SYSTEM");
  }
  const loggedUser = await User.findOne({
    $and: [{ _id }],
  });
  if (loggedUser) {
    return res.json(loggedUser.userName);
  } else {
    return res.json({ status: "error", user: false });
  }
});

router.post("/login", async (req, res) => {
  console.log("logguser");
  const newPassword = await bcrypt.hash(req.body.password, 10);
  const { userName, password } = req.body;

  const loggedUser = await User.findOne({
    $and: [{ userName }, { newPassword }],
  });
  console.log(req.body.userName);
  console.log(req.body.password);
  if (loggedUser) {
    console.log(loggedUser);
    return res.json(loggedUser);
  } else {
    return res.json({ status: "error", user: false });
  }
});

/*
//login user USER
router.post("/login", async (req, res) => {
  const { userName, password } = req.body;

  const loggedUser = await User.findOne({
    $and: [{ userName }, { password }],
  });

  res.json(loggedUser);
});
*/

//create user
router.post("/signup", async (req, res) => {
  const newUser = new User(req.body);

  try {
    await newUser.save();
    res.status(201).json("User was created!");
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

//UPDATE USER - increase mony
router.patch("/user:id", (req, res) => {
  console.log(req.url);
});

//DELETE ONE USER - maybe not!!!
router.delete("/:id", (req, res) => {});

async function getUsrer(req, res, next) {
  let user;
  try {
    user = User.findById(req.params.u);
    if (user == null) {
      return res.status(404).json({ message: "Cannot find requested user" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
}

module.exports = router;