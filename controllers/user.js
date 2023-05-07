const router = require('express').Router()
const User = require('../models/user')

//Get retreive all user 
router.get('/', async (req,res) =>{
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    console.log(error)
    res.json({'message': 'error retrieving users'})
  }
})

//Get retreive user by username 
router.get('/username/:username', async (req,res) =>{
    const { username } = req.params
    try {
      const users = await User.find({ username })
      res.json(users)
    } catch (error) {
      console.log(error)
      res.json({'message': 'error retrieving users'})
    }
  })

  //Get retreive user by username 
router.get('/email/:email', async (req,res) =>{
    const { email } = req.params
    try {
      const user = await User.find({ email })
      res.json(user)
    } catch (error) {
      console.log(error)
      res.json({'message': 'error retrieving user'})
    }
  })

  //Get retreive user byid
router.get('/id/:id', async (req,res) =>{
    const { id } = req.params
    try {
      const user = await User.findById(id)
      res.json(user)
    } catch (error) {
      console.log(error)
      res.json({'message': 'error retrieving users'})
    }
  })



  //Get delet  user byid
router.delete('/id/:id', async (req,res) =>{
    const { id } = req.params
    try {
      const user = await User.findByIdAndDelete(id)
      if(!user){
        res.status(404).json({'message': 'user  doesn\'t exist'})
      }else{
        res.json({'message': 'error deleting user'})
      }
    } catch (error) {
      console.log(error)
      res.json({'message': 'error deleting user'})
    }
  })

//post creat user
router.post('/', async (req, res) =>{
   try {
    // const{username, email, location, age} = req.body
    const createdUser = await new User(req.body).save()
    res.json(createdUser)
   } catch (error) {
    console.log(error)
    res.json({'message': 'error creating user'})
   }
})


module.exports = router