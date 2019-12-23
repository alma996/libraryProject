const express = require('express')
const book = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')

const Book = require('../models/Book')
const Author = require('../models/Author')
const Genre = require('../models/Genre')
const Publisher = require('../models/Publisher')

book.use(cors())

process.env.SECRET_KEY = 'secret'


book.get('/book', (req, res) => {
    Author.hasMany(Book, {foreignKey: 'author_id'})
    Book.belongsTo(Author, {foreignKey: 'author_id'})

    Genre.hasMany(Book, {foreignKey: 'genre_id'})
    Book.belongsTo(Genre, {foreignKey: 'genre_id'})

    Publisher.hasMany(Book, {foreignKey: 'publisher_id'})
    Book.belongsTo(Publisher, {foreignKey: 'publisher_id'})

 Book.findAll({
     include: [{
         model: Author
     },
     {
    model: Genre
     },
    {
        model: Publisher
    }]
    })
    .then(book => {
      if (book) {
        res.json(book)
      } else {
        res.send('Book dos not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})
/*
Book.post('/:id', (req, res) => {
    const bookID = req.params.id
    Author.hasMany(Book, {foreignKey: 'author_id'})
    Book.belongsTo(Author, {foreignKey: 'author_id'})

    Genre.hasMany(Book, {foreignKey: 'genre_id'})
    Book.belongsTo(Genre, {foreignKey: 'genre_id'})

    Publisher.hasMany(Book, {foreignKey: 'publisher_id'})
    Book.belongsTo(Publisher, {foreignKey: 'publisher_id'})

    const BookData = {
        book_id: bookID,
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
   */


module.exports =  book
