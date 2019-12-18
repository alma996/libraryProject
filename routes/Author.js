const express = require('express')
const author = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')

const Author = require('../models/Author')
author.use(cors())

process.env.SECRET_KEY = 'secret'


author.get('/author', (req, res) => {

  Author.findAll({
    attributes: ['author_id', 'first_name', 'last_name']
  })
    .then(author => {
      if (author) {
        res.json(author)
      } else {
        res.send('Author dos not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

author.post('/author', (req, res) => {
    const authorData = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
    }
  
    Author.findOne({
      where: {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
      }
    })
      //TODO bcrypt
      .then(author => {
        if (!author) {
          Author.create(authorData)
            .then(author => {
              let token = jwt.sign(author.dataValues, process.env.SECRET_KEY, {
                expiresIn: 1440
              })
              res.json({ token: token })
            })
            .catch(err => {
              res.send('error: ' + err)
            })
        } else {
          res.json({ error: 'Author already exists' })
        }
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  })

  author.delete('/:id', (req, res)=>{
    const authorID = req.params.id
Author.destroy({
      where: {
        author_id:authorID
        
      }
    })
    .then(function (deletedRecord) {
      if(deletedRecord === 1){
          res.status(200).json({message:"Deleted successfully"});          
      }
      else
      {
          res.status(404).json({message:"record not found"})
      }
  })
  .catch(function (error){
      res.status(500).json(error);
  })
  })

  author.put('/:id', (req, res, next) => {
    Author.update(
      {first_name: req.body.first_name,
      last_name: req.body.last_name},
      {returning: true, where: {author_id: req.params.id} }
    )
    .then(Author.findByPk(req.params.id))
    .then(function(updatedBook) {
    res.json(updatedBook)
    })
    .catch(next)
   })



module.exports = author