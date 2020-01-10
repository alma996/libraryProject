const express = require('express')
const member = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')

const Member = require('../models/Member')
member.use(cors())

process.env.SECRET_KEY = 'secret'


member.get('/member', (req, res) => {

  Member.findAll({
    attributes: ['member_id', 'first_name', 'last_name', 'birth_date', 'address', 'email', 'phone_number']
  })
    .then(member => {
      if (member) {
        res.json(member)
      } else {
        res.send('Member dos not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

member.get('/:member_id', (req, res) => {
  const memberID = req.params.member_id
    Member.findOne({
      attributes: ['member_id', 'first_name', 'last_name', 'birth_date', 'address', 'email', 'phone_number'],
      where: {
        member_id:memberID 
      }
    })
      .then(member => {
        if (member) {
          res.json(member)
        } else {
          res.send('Member dos not exist')
        }
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  })

member.post('/member', (req, res) => {
    const memberData = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      birth_date: req.body.birth_date,
      address: req.body.address,
      email: req.body.email,
      phone_number: req.body.phone_number
    }
  
    Member.findOne({
      where: {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        birth_date: req.body.birth_date,
        address: req.body.address,
        email: req.body.email,
        phone_number: req.body.phone_number
      }
    })
      //TODO bcrypt
      .then(member => {
        if (!member) {
          Member.create(memberData)
            .then(member => {
              let token = jwt.sign(member.dataValues, process.env.SECRET_KEY, {
                expiresIn: 1440
              })
              res.json({ token: token })
            })
            .catch(err => {
              res.send('error: ' + err)
            })
        } else {
          res.json({ error: 'Member already exists' })
        }
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  })

  member.delete('/:id', (req, res)=>{
    const memberID = req.params.id
Member.destroy({
      where: {
        member_id:memberID
        
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

  member.put('/:id', (req, res, next) => {
    Member.update(
      {first_name: req.body.first_name,
      last_name: req.body.last_name,
      birth_date: req.body.birth_date,
      address: req.body.address,
      email: req.body.email,
      phone_number: req.body.phone_number},
      {returning: true, where: {member_id: req.params.id} }
    )
    .then(Member.findByPk(req.params.id))
    .then(function(updatedMember) {
    res.json(updatedMember)
    })
    .catch(next)
   })



module.exports = member