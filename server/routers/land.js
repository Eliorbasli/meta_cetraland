const express = require("express");
const router = express.Router();
const ObjectID = require("mongodb").ObjectID;

const Land = require("../models/Land");
const User = require("../models/User");

//GETTING ALL lands
router.get("/map", async (req, res) => {
  try {
    const lands = await Land.find();
    const map = [];
    const size = Math.sqrt(lands.length);
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        row.push(lands[i * size + j]);
      }
      map.push(row);
    }

    res.json(map);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/buy", async (req, res) => {
  
  const { buyerId, landId } = req.body;
  
  console.log("check")
  console.log(buyerId, landId);
  const buyer = await User.findById(ObjectID(buyerId));
  console.log(buyer);
  const land = await Land.findById(ObjectID(landId));
  console.log(land);
  if (buyer.money >= land.cost && land.isForSale) {
    buyer.money -= land.cost;
    await User.updateOne({ _id: ObjectID(buyerId) }, buyer, null);
    if (land.ownerId !== "0") {
      const seller = await User.findById(ObjectID(land.ownerId));
      seller.money += land.cost;
      await User.updateOne({ _id: ObjectID(land.ownerId) }, seller, null);
    }
    land.ownerId = buyerId;
    await Land.updateOne({ _id: ObjectID(landId) }, land, null);
  }

  res.json("success");
});

router.post("/setLand", async (req, res) => {
  const { updateLand } = req.body;
  console.log(updateLand._id);
  const land = await Land.findById(ObjectID(updateLand._id));

  if (land.ownerId !== updateLand.ownerId) {
    res.json("You are not the owner of this property!");
  } else if (updateLand.cost < 1) {
    res.json("You cannot set price to be lower than 1");
  } else if (land.type !== updateLand.type) {
    res.json("Type cannot be changed");
  } else if (land.type === "land") {
    await Land.updateOne({ _id: ObjectID(land._id) }, updateLand, null);

    res.json("success");
  } else res.json("This type of property cannot be changed!");
});

module.exports = router;
