
const express = require('express');
const router = express.Router();
const Post = require('../model/post');


router.get('/', async function(req,res){
  let posts=await Post.find()
  res.render('index',{posts:posts});
});


router.get('/newPost', async (req,res) =>{
  res.render('newPost');
});
router.post('/newPost', async (req,res) =>{
  let post = new Post(req.body)
  await post.save()
  res.redirect("/");
});
router.post('/edit/:id', async (req,res) =>{
  await Post.updateOne({_id:req.params.id},req.body)
  res.redirect("/");
});
router.get('/edit/:id',   async(req,res) =>{

  let id = req.params.id
  let task  = await Post.findById(id)
  res.render('edit',{task})

})
router.get('/delete/:id',  async (req,res) =>{
  let id = req.params.id
  await Post.remove({_id:id})
  res.redirect('/')
})


module.exports = router;