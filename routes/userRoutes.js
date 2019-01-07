const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/userModal");

router.post("/", (req, res,next) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    gender: req.body.gender
  });
  user
    .save()
    .then(result => {
      res.status(200).json({
        message: "User Added sucessfully"
      });
    })
    .catch(err => res.status(500).json({ error: err }));
});


router.get("/", (req,res,next) => {
  User.find({})
    .exec()
    .then(doc => {
      const response = {
        user: doc
      };
      if (doc) res.status(200).json(response);
      else res.status(404).json({ message: "No data found" });
    })
    .catch(err => res.status(500).json(err));
});


router.put("/:userId", (req, res,next) => {
  const id = req.params.userId;
  const updateOps = {
      name:req.body.name,
      email:req.body.email,
      age:req.body.age,
      gender:req.body.gender
  }; 
  User.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User Updted sucessfully"
      });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

router.delete("/:userId", (req, res,next) => {
  const id = req.params.userId;
  User.deleteOne({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User Deleted sucessfully"
      });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});
module.exports = router;
