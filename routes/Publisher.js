const express = require('express')
const publisher = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')

const Publisher = require('../models/Publisher')
publisher.use(cors())

process.env.SECRET_KEY = 'secret'


publisher.get('/publisher', (req, res) => {

  Publisher.findAll({
    attributes: ['publisher_id', 'publisher_name']
  })
    .then(publisher => {
      if (publisher) {
        res.json(publisher)
      } else {
        res.send('Publisher dos not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

publisher.post('/publisher', (req, res) => {
    const publisherData = {
      publisher_name: req.body.publisher_name,
    }
  
    Publisher.findOne({
      where: {
        publisher_name: req.body.publisher_name,
      }
    })
      //TODO bcrypt
      .then(publisher => {
        if (!publisher) {
          Publisher.create(publisherData)
            .then(publisher => {
              let token = jwt.sign(publisher.dataValues, process.env.SECRET_KEY, {
                expiresIn: 1440
              })
              res.json({ token: token })
            })
            .catch(err => {
              res.send('error: ' + err)
            })
        } else {
          res.json({ error: 'Publisher already exists' })
        }
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  })

  publisher.delete('/:id', (req, res)=>{
    const publisherID = req.params.id
Publisher.destroy({
      where: {
        publisher_id: publisherID
        
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

  publisher.put('/:id', (req, res, next) => {
    Publisher.update(
      {publisher_name: req.body.publisher_name},
      {returning: true, where: {publisher_id: req.params.id} }
    )
    .then(Publisher.findByPk(req.params.id))
    .then(function(updatedPublisher) {
    res.json(updatedPublisher)
    })
    .catch(next)
   })



module.exports = publisher