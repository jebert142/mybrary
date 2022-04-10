const express = require('express')
const router = express.Router()
const Author = require('../models/author')


/**
*   All Authors Route
*   @param      {req} query // used to pass in the query from the form
*   @returns    {res}       // responds by rendering updated search options
*
*   This ansyncronous GET function allows for a query string to be passed in
*   and will continue on if there's no query. After that, the function will 
*   return all authors that 
*/
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const authors = await Author.find(searchOptions)
        res.render('authors/index', {
            authors: authors, 
            searchOptions: req.query
        })
    } catch {
        res.redirect('/')
    }
})

//New Authors Route
router.get('/new', (req, res) => {
    res.render('authors/new', {author: new Author() })
})

// Create Author Route
router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name
    })

    try {
        const newAuthor = await author.save()
        // res.redirect(`authors/${newAuthor.id}`)
        res.redirect(`authors`)
    } catch {
        res.render('authors/new', {
                author: author,
                errorMessage: 'Error creating author'
            })
    }
})

module.exports = router