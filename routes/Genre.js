const express = require('express')
const genre = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')

const Genre = require('../models/Genre')
genre.use(cors())

process.env.SECRET_KEY = 'secret'


genre.get('/genre', (req, res) => {

  Genre.findAll({
    attributes: ['genre_id', 'genre_name']
  })
    .then(genre => {
      if (genre) {
        res.json(genre)
      } else {
        res.send('Genre dos not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})


genre.get('/:genre_id', (req, res) => {
  const genreID = req.params.genre_id
    Genre.findOne({
      attributes: ['genre_id', 'genre_name'],
      where: {
        genre_id:genreID 
      }
    })
      .then(genre => {
        if (genre) {
          res.json(genre)
        } else {
          res.send('Genre dos not exist')
        }
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  })

genre.post('/genre', (req, res) => {
    const genreData = {
      genre_name: req.body.genre_name,
    }
  
    Genre.findOne({
      where: {
        genre_name: req.body.genre_name,
      }
    })
      //TODO bcrypt
      .then(genre => {
        if (!genre) {
          Genre.create(genreData)
            .then(genre => {
              let token = jwt.sign(genre.dataValues, process.env.SECRET_KEY, {
                expiresIn: 1440
              })
              res.json({ token: token })
            })
            .catch(err => {
              res.send('error: ' + err)
            })
        } else {
          res.json({ error: 'Genre already exists' })
        }
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  })

  genre.delete('/:id', (req, res)=>{
    const genreID = req.params.id
Genre.destroy({
      where: {
        genre_id: genreID
        
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

  genre.put('/:id', (req, res, next) => {
    Genre.update(
      {genre_name: req.body.genre_name},
      {returning: true, where: {genre_id: req.params.id} }
    )
    .then(Genre.findByPk(req.params.id))
    .then(function(updatedGenre) {
    res.json(updatedGenre)
    })
    .catch(next)
   })



module.exports = genre