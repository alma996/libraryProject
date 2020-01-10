const express = require('express')
const membership = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')

const Membership = require('../models/Membership')
const Member = require('../models/Member')

membership.use(cors())

process.env.SECRET_KEY = 'secret'


membership.get('/:id', (req, res) => {
    Member.hasMany(Membership, {foreignKey: 'member_id'})
    Membership.belongsTo(Member, {foreignKey: 'member_id'})

 Membership.findAll({
   where: {member_id: req.params.id},
     include: [{
         model: Member,
         attributes: ['first_name', 'last_name']
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

membership.get('', (req, res) => {
  Member.hasMany(Membership, {foreignKey: 'member_id'})
  Membership.belongsTo(Member, {foreignKey: 'member_id'})

Membership.findAll({
  attributes: ['membership_id', 'member_id', 'date_of_payment', 'year', 'amount'],
   include: [{
       model: Member,
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

membership.get('/:membership_id/:member_id', (req, res) => {
  const membershipID = req.params.membership_id;
  const memberID = req.params.member_id;
  Member.hasMany(Membership, {foreignKey: 'member_id'})
  Membership.belongsTo(Member, {foreignKey: 'member_id'})

Membership.findOne({
  attributes: ['membership_id', 'member_id', 'date_of_payment', 'year', 'amount'],
  where: [{
    membership_id: membershipID
  }],
   include: [{
       model: Member,
       where: [{
        member_id: memberID
      }]
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

  membership.delete('/:id', (req, res)=>{
    const membershipID = req.params.id
    Member.hasMany(Membership, {foreignKey: 'member_id'})
    Membership.belongsTo(Member, {foreignKey: 'member_id'})
Membership.destroy({
      where: {
        membership_id:membershipID
        
      },
      include: [{
        model: Member     
    }]
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

  membership.put('/:id', (req, res, next) => {
    Membership.update(
      {date_of_payment: req.body.date_of_payment,
      year: req.body.year,
      amount: req.body.amount},
      {returning: true, where: {membership_id: req.params.id} }
    )
    .then(Membership.findByPk(req.params.id))
    .then(function(updatedMembership) {
    res.json(updatedMembership)
    })
    .catch(next)
   })


module.exports =  membership
