const express = require('express');

const router = express.Router();

const dataBase = require('../data/db.js');

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