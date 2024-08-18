const express = require("express");
const router = express.Router();

const Person = require("./../models/person");

// POST route to add a person
router.post("/", async (req, res) => {
  try {
    const data = req.body; // Assuming the request body contains the person data

    // Create a new person document using the Mongoose model
    const newPerson = new Person(data);

    // Save the new person to the database
    const response = await newPerson.save();
    console.log("Data saved:", response);
    res.status(200).json(response);
  } catch (err) {
    console.error("Error saving data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get method to get the perosn
router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.error("Error saving data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType; // Extract the work type from the URL parameter
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid work type" });
    }
  } catch (err) {
    console.error("Error fetching data:", err.message);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
});

router.put('/:id',async (req,res)=>{
    try{
        const personId = req.params.id; // Extract the id from the URL prameter
        const updatedPersonData = req.body; // Updated data for the person

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, // return the updated document
            runValidators: true,
        });

        if(!response){
            res.status(404).json({error: "Person not found"});
        }
        console.log("Data updated");
        res.status(200).json(response);
    }
    catch (err) {
        console.error("Error fetching data:", err.message);
        res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
})

router.delete('/:id', async(req,res)=>{
    try{
        const personId = req.params.id; // Extract the id from the URL parameter

        // Assuming you have a person model
        const response = await Person.findByIdAndDelete(personId);
        if(!response){
            res.status(404).json({error: "Person not found"});
        }
        console.log("Person deleted");
        res.status(200).json({message: 'person Deleted Successfully'});
    }
    catch (err) {
        console.error("Error fetching data:", err.message);
        res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
})

module.exports = router;