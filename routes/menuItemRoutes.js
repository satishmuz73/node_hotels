const express = require("express");
const router = express.Router();

const MenuItem = require("../models/MenuItem");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenu = new MenuItem(data);

    const response = await newMenu.save();
    console.log("Data saved:", response);
    res.status(200).json(response);
  } catch (err) {
    console.error("Error saving data:", err.message);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("Data fetched:", data);
    res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching data:", err.message);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

router.get("/:tastering", async (req, res) => {
  try {
    const tastering = req.params.tastering; // Extract the work type from the URL parameter
    if (tastering == "sweet" || tastering == "spicy" || tastering == "sour") {
      const response = await MenuItem.find({ taster: tastering });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid tastering " });
    }
  } catch (err) {
    console.error("Error fetching data:", err.message);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
});

router.put('/:id' ,async(req, res)=>{
  try{
    const menuId = req.params.id;
    const updatedPersonData = req.body;

    const response = await MenuItem.findByIdAndUpdate(menuId, updatedPersonData, {
      new: true,
      runValidators: true,
    });
    if(!response){
      return res.status(404).json({error: "Menu item not found"})
    }
    console.log("Data updated");
    res.status(200).json(response);
  }
  catch (err) {
    console.error("Error fetching data:", err.message);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
});

router.delete('/:id', async (req,res)=>{
  try{
    const menuId = req.params.id;
    const response = await MenuItem.findByIdAndDelete(menuId);
    if(!response){
      res.status(404).json({error: "MenuItem not found"});
    }
    console.log("MenuItem deleted");
    res.status(200).json({message: 'MenuItem Delted Successfully'});
  }
  catch (err) {
    console.error("Error fetching data:", err.message);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
})

// comment added for testing purposes
module.exports = router;
