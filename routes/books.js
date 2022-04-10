const express = require('express')
const Book = require('../models/book')
const router = express.Router()

/**
*   All Books Route
*   @param      {req}  
*   @returns    {res}       
*/
router.get('/', async (req, res) => {
    res.send('All books')
})

//New Books Route
router.get('/new', (req, res) => {
    res.send('New Book')
})

// Create Author Route
router.post('/', async (req, res) => {
   res.send('Create Book')
})

module.exports = router