const express = require("express");
const router = express.Router();
const Demo = require("../models/Demo");


//Gets all the posts
router.route('/').get(async (req, res) => {
  try{
    const demos = await Demo.find();
    res.status(200).json(demos);
  }catch(err){
    res.status(400).json({message: err});
  }
});

//Get Specific post
router.route('/:demoId').get(async (req, res) => {
  try{
    const demo = await Demo.findById(req.params.demoId);
    res.status(200).json(demo);
  }catch(err){
    res.status(400).json({message: err});
  }
});

//Submits a post
router.route('/add').post(async (req, res) => {
    const {
        title,
        description 
    } = req.body;
    const demo = new Demo({
        title,
        description 
    });

    try{
        const savedDemo = await demo.save();
        res.status(200).json(savedDemo);
    } catch(err){
        res.status(400).json({message: err});
    }

    /*post.save()
        .then(data => res.json(data))
        .catch((err) => res.status(404).json("error =>" + err))*/

});

//Delete a post
router.route('/:demoId').delete(async (req, res) => {
  try{
    const removedDemo = await Demo.remove({_id: req.params.demoId});
    res.status(200).json({"message": "Post Deleted Successfully"});
  }catch(err){
    res.status(400).json({message: err});
  }
});

//Update a post
router.route('/:demoId').patch(async (req, res) => {
  try{
    const updatedDemo = await Demo.updateOne(
      {_id: req.params.demoId},
      {$set: {title: req.body.title}}
    );
    res.status(200).json(updatedDemo);
  }catch(err){
    res.status(400).json({message: err});
  }
});

module.exports = router;