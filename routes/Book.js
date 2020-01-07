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

book.delete('/:id', (req, res)=>{
  const bookID = req.params.id
  Author.hasMany(Book, {foreignKey: 'author_id'})
    Book.belongsTo(Author, {foreignKey: 'author_id'})

    Genre.hasMany(Book, {foreignKey: 'genre_id'})
    Book.belongsTo(Genre, {foreignKey: 'genre_id'})

    Publisher.hasMany(Book, {foreignKey: 'publisher_id'})
    Book.belongsTo(Publisher, {foreignKey: 'publisher_id'})

Book.destroy({
    where: {
      book_id: bookID
      
    },
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

book.post('/:author_id/:genre_id/:publisher_id', (req, res) => {
  const authorID = req.params.author_id
  const genreID = req.params.genre_id
  const publisherID = req.params.publisher_id
    Author.hasMany(Book, {foreignKey: 'author_id'})
    Book.belongsTo(Author, {foreignKey: 'author_id'})

    Genre.hasMany(Book, {foreignKey: 'genre_id'})
    Book.belongsTo(Genre, {foreignKey: 'genre_id'})

    Publisher.hasMany(Book, {foreignKey: 'publisher_id'})
    Book.belongsTo(Publisher, {foreignKey: 'publisher_id'})

    const BookData = {
      author_id: authorID,
      genre_id: genreID,
      publisher_id: publisherID,
      book_name: req.body.book_name
    }
  
    Book.findOne({
      where: {
        author_id: authorID,
        genre_id: genreID,
        publisher_id: publisherID,
        book_name: req.body.book_name
      },
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
      //TODO bcrypt
      .then(book => {
        if (!book) {
          Book.create(BookData)
            .then(book => {
              let token = jwt.sign(book.dataValues, process.env.SECRET_KEY, {
                expiresIn: 1440
              })
              res.json({ token: token })
            })
            .catch(err => {
              res.send('error: ' + err)
            })
        } else {
          res.json({ error: 'Book already exists' })
        }
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  })

  

  book.put('/:id', (req, res, next) => {
    Author.hasMany(Book, {foreignKey: 'author_id'})
    Book.belongsTo(Author, {foreignKey: 'author_id'})

    Genre.hasMany(Book, {foreignKey: 'genre_id'})
    Book.belongsTo(Genre, {foreignKey: 'genre_id'})

    Publisher.hasMany(Book, {foreignKey: 'publisher_id'})
    Book.belongsTo(Publisher, {foreignKey: 'publisher_id'})

    Book.update(
      {author_id: req.body.author_name,
      genre_id: req.body.genre_name,
      publisher_id: req.body.publisher_name,
      book_name: req.body.book_name},
      {returning: true, where: {book_id: req.params.id},
    
      include: [{
        model: Author
    },
    {
   model: Genre
    },
   {
       model: Publisher
   }]

    }
    )
    .then(Book.findByPk(req.params.id))
    .then(function(updatedBook) {
    res.json(updatedBook)
    })
    .catch(next)
   })
  


module.exports =  book
