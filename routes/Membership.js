const express = require('express')
const membership = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')

const Membership = require('../models/Membership')
const Member = require('../models/Member')

membership.use(cors())

process.env.SECRET_KEY = 'secret'


membership.get('/membership', (req, res) => {
    Member.hasMany(Membership, {foreignKey: 'member_id'})
    Membership.belongsTo(Member, {foreignKey: 'member_id'})

 Membership.findAll({
    attributes: ['membership_id', 'member_id', 'date_of_payment', 'year', 'amount'],
     include: [{
         model: Member,
         attributes: ['member_id', 'first_name', 'last_name']
         
     }]
    })
    .then(membership => {
      if (membership) {
        res.json(membership)
      } else {
        res.send('Membership dos not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

membership.post('/:id', (req, res) => {
    const memberID = req.params.id
    Member.hasMany(Membership, {foreignKey: 'member_id'})
    Membership.belongsTo(Member, {foreignKey: 'member_id'})
    const membershipData = {
        member_id: memberID,
      date_of_payment: req.body.date_of_payment,
      year: req.body.year,
      amount: req.body.amount,
    }
  
    Membership.findOne({
      where: {
        member_id:memberID,
        date_of_payment: req.body.date_of_payment,
        year: req.body.year,
        amount: req.body.amount,
      },
      include: [{
        model: Member     
    }]
    })
      //TODO bcrypt
      .then(membership => {
        if (!membership) {
          Membership.create(membershipData)
            .then(membership => {
              let token = jwt.sign(membership.dataValues, process.env.SECRET_KEY, {
                expiresIn: 1440
              })
              res.json({ token: token })
            })
            .catch(err => {
              res.send('error: ' + err)
            })
        } else {
          res.json({ error: 'Membership already exists' })
        }
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  })
/*
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

*/

module.exports = membership