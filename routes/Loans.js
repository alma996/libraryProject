const express = require('express')
const loans = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')

const Loans = require('../models/Loans')
const Member = require('../models/Member')
const Book = require('../models/Book')


loans.use(cors())

process.env.SECRET_KEY = 'secret'


loans.get('/loans', (req, res) => {
    Member.hasMany(Loans, {foreignKey: 'member_id'})
    Loans.belongsTo(Member, {foreignKey: 'member_id'})

    Book.hasMany(Loans, {foreignKey: 'book_id'})
    Loans.belongsTo(Book, {foreignKey: 'book_id'})


 Loans.findAll({
     include: [{
         model: Member
     },
     {
    model: Book
     },]
    })
    .then(loans => {
      if (loans) {
        res.json(loans)
      } else {
        res.send('Loans dos not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

loans.get('/:loans_id/:member_id/:book_id', (req, res) => {
  const loansID = req.params.loans_id;
  const memberID = req.params.member_id;
  const bookID = req.params.book_id;
  
  Member.hasMany(Loans, {foreignKey: 'member_id'})
  Loans.belongsTo(Member, {foreignKey: 'member_id'})

  Book.hasMany(Loans, {foreignKey: 'book_id'})
  Loans.belongsTo(Book, {foreignKey: 'book_id'})

Loans.findOne({
  attributes: ['loans_id', 'member_id', 'book_id', 'loans_date', 'return_status'],
  where: [{
    loans_id: loansID
  }],
   include: [{
       model: Member,
       where: [{
        member_id: memberID
      }]
   },
   {
    model: Book,
    where: [{
      book_id: bookID
    }]
     }]
  })
  .then(loans => {
    if (loans) {
      res.json(loans)
    } else {
      res.send('Loans dos not exist')
    }
  })
  .catch(err => {
    res.send('error: ' + err)
  })
})

loans.delete('/:id', (req, res)=>{
  const loansID = req.params.id
  Member.hasMany(Loans, {foreignKey: 'member_id'})
  Loans.belongsTo(Member, {foreignKey: 'member_id'})

  Book.hasMany(Loans, {foreignKey: 'book_id'})
  Loans.belongsTo(Book, {foreignKey: 'book_id'})

Loans.destroy({
    where: {
      loans_id: loansID
      
    },
    include: [{
      model: Member
  },
  {
 model: Book
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

loans.post('/:member_id/:book_id', (req, res) => {
  const memberID = req.params.member_id
  const bookID = req.params.book_id

  Member.hasMany(Loans, {foreignKey: 'member_id'})
  Loans.belongsTo(Member, {foreignKey: 'member_id'})

  Book.hasMany(Loans, {foreignKey: 'book_id'})
  Loans.belongsTo(Book, {foreignKey: 'book_id'})


    const LoansData = {
      member_id: memberID,
      book_id: bookID,
      loans_date: req.body.loans_date,
      return_status: req.body.return_status
    }
  
    Loans.findOne({
      where: {
        member_id: memberID,
        book_id: bookID,
        loans_date: req.body.loans_date,
        return_status: req.body.return_status
      },
      include: [{
        model: Member
    },
    {
   model: Book
    },]
    })
      //TODO bcrypt
      .then(loans => {
        if (!loans) {
          Loans.create(LoansData)
            .then(loans => {
              let token = jwt.sign(loans.dataValues, process.env.SECRET_KEY, {
                expiresIn: 1440
              })
              res.json({ token: token })
            })
            .catch(err => {
              res.send('error: ' + err)
            })
        } else {
          res.json({ error: 'Loans already exists' })
        }
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  })

  

  loans.put('/:id', (req, res, next) => {
    Member.hasMany(Loans, {foreignKey: 'member_id'})
    Loans.belongsTo(Member, {foreignKey: 'member_id'})
  
    Book.hasMany(Loans, {foreignKey: 'book_id'})
    Loans.belongsTo(Book, {foreignKey: 'book_id'})

    Loans.update(
      {member_id: req.body.member_name,
      book_id: req.body.book_name,
      loans_date: req.body.loans_date,
    return_status: req.body.return_status},
      {returning: true, where: {loans_id: req.params.id},
    
      include: [{
        model: Member
    },
    {
   model: Book
    },]

    }
    )
    .then(Loans.findByPk(req.params.id))
    .then(function(updatedLoans) {
    res.json(updatedLoans)
    })
    .catch(next)
   })
  


module.exports =  loans
