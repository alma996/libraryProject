const express = require('express')
const damage = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')

const Loans = require('../models/Loans')
const Damage = require('../models/Damage')
const Member = require('../models/Member')
const Book = require('../models/Book')


damage.use(cors())

process.env.SECRET_KEY = 'secret'


damage.get('/:id', (req, res) => {
    Loans.hasMany(Damage, {foreignKey: 'loans_id'})
    Damage.belongsTo(Loans, {foreignKey: 'loans_id'})

    Member.hasMany(Loans, {foreignKey: 'member_id'})
    Loans.belongsTo(Member, {foreignKey: 'member_id'})

    Book.hasMany(Loans, {foreignKey: 'book_id'})
    Loans.belongsTo(Book, {foreignKey: 'book_id'})

 Damage.findAll({
  where: {loans_id: req.params.id},
     include: [{
         model: Loans,
         required: true,
         include: [{model: Member, required: true}, {model: Book, required: true}],

     }   
     ]
    })
    .then(damage => {
      if (damage) {
        res.json(damage)
      } else {
        res.send('Damage does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})


damage.delete('/:id', (req, res)=>{
  const damageID = req.params.id
  Loans.hasMany(Damage, {foreignKey: 'loans_id'})
  Damage.belongsTo(Loans, {foreignKey: 'loans_id'})

Damage.destroy({
    where: {
      damage_id: damageID
      
    },
    include: [{
      model: Loans
  },
 ]
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
 
  damage.post('/:id', (req, res) => {
    const loansID = req.params.id
    Loans.hasMany(Damage, {foreignKey: 'loans_id'})
    Damage.belongsTo(Loans, {foreignKey: 'loans_id'})
    const damageData = {
        loans_id: loansID,
      damage_description: req.body.damage_description,
    }
  
    Damage.findOne({
      where: {
        loans_id:loansID,
        damage_description: req.body.damage_description,
      },
      include: [{
        model: Loans   
    }]
    })
      //TODO bcrypt
      .then(damage => {
        if (!damage) {
          Damage.create(damageData)
            .then(damage => {
              let token = jwt.sign(damage.dataValues, process.env.SECRET_KEY, {
                expiresIn: 1440
              })
              res.json({ token: token })
            })
            .catch(err => {
              res.send('error: ' + err)
            })
        } else {
          res.json({ error: 'Damage already exists' })
        }
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  })

  

  damage.put('/:id', (req, res, next) => {
    Loans.hasMany(Damage, {foreignKey: 'loans_id'})
    Damage.belongsTo(Loans, {foreignKey: 'loans_id'})


    Damage.update(
      {loans_id: req.body.loans_id,
      damage_description: req.body.damage_description},
      {returning: true, where: {damage_id: req.params.id},
    
      include: [{
        model: Loans
    },]

    }
    )
    .then(Damage.findByPk(req.params.id))
    .then(function(updatedDamage) {
    res.json(updatedDamage)
    })
    .catch(next)
   })
  


module.exports =  damage
