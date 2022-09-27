const express = require("express");
const router = express.Router();
const Post = require("../models/Post");


//Gets all the posts
router.route('/add').get(async (req, res) => {
  try{
    const posts = await Post.find();
    res.status(200).json(posts);
  }catch(err){
    res.status(400).json({message: err});
  }
});

//Get Specific post
router.route('/:postId').get(async (req, res) => {
  try{
    const post = await Post.findById(req.params.postId);
    res.status(200).json(post);
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
    const post = new Post({
        title,
        description 
    });

    try{
        const savedPost = await post.save();
        res.status(200).json(savedPost);
    } catch(err){
        res.status(400).json({message: err});
    }

    /*post.save()
        .then(data => res.json(data))
        .catch((err) => res.status(404).json("error =>" + err))*/

});

//Delete a post
router.route('/:postId').delete(async (req, res) => {
  try{
    const removedPost = await Post.remove({_id: req.params.postId});
    res.status(200).json({"message": "Post Deleted Successfully"});
  }catch(err){
    res.status(400).json({message: err});
  }
});

//Update a post
router.route('/:postId').patch(async (req, res) => {
  try{
    const updatedPost = await Post.updateOne(
      {_id: req.params.postId},
      {$set: {title: req.body.title}}
    );
    res.status(200).json(updatedPost);
  }catch(err){
    res.status(400).json({message: err});
  }
});

module.exports = router;