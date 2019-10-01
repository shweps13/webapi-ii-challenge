const express = require('express');

const router = express.Router();

const dataBase = require('../data/db.js');


// POST post to database
router.post('/', (req, res) => {
    const dbData = req.body;
    console.log('dataBase', dbData)

    dataBase.insert(dbData)
    .then(user => {
        res.status(201).json(user); 
    })
    .catch(error => {
        res.status(500).json({ error: "There was an error while saving the post to the database" })
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

// export
module.exports = router;