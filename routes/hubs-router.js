const express = require('express');

const router = express.Router();

const dataBase = require('../data/db.js');


// POST post to database
router.post('/', (req, res) => {
    const dbData = req.body;
    console.log('dataBase', dbData)

    dataBase.insert(dbData)
    .then(response => {
        res.status(201).json(response); 
    })
    .catch(error => {
        res.status(500).json({ error: "There was an error while saving the post to the database" })
    }); 

})

// POST with ID post to database <== still need work
router.post('/:id/comments', (req, res) => {
    const dbData = req.body;
    console.log('dataBase', dbData)

    dataBase.insertComment(dbData)
    .then(response => {
        res.status(201).json(response); 
    })
    .catch(error => {
        res.status(500).json({ error: "There was an error while saving the comment to the database" })
    }); 

})

// GET all posts
router.get('/', (req, res) => {

    dataBase.find()
    .then(posts => {
        res.send(posts);
    })
    .catch(error => {
        res.status(500).send({ error: "The users information could not be retrieved." })
    });

});

// GET post by ID
router.get('/:id', (req, res) => {

    const id = req.params.id;

    dataBase.findById(id)
    .then(response => {
        res.status(200).json(response)
    })
    .catch(error => {
        res.status(500).send({ error: "The users information could not be retrieved." })
    });

});

// export
module.exports = router;