const express = require('express');

const router = express.Router();

const dataBase = require('../data/db.js');


// === POST REQUESTS ===

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

// POST comment with ID to database <== still need work
router.post('/:id/comments', (req, res) => {
    
    const id = req.params.id;

    const comment = req.body;
    console.log('Added comment is: ', comment)

    dataBase.insertComment(comment)
    .then((idObj) => {
        dataBase.findCommentById(idObj.id)
        .then(response => {
            res.status(201).json(response)
        })
        .catch((error) => {
            res.status(500).json({message: "Error getting new comment"})
        })
    })
    .catch(error => {
        res.status(500).json({ error: "There was an error while saving the comment to the database", error })
    }); 

})
// === END OF POST REQUESTS ===



// === GET REQUESTS ===

// GET all posts
router.get('/', (req, res) => {

    dataBase.find()
    .then(posts => {
        res.json(posts);
    })
    .catch(error => {
        res.status(500).json({ error: "The posts information could not be retrieved." })
    });

});

// GET post by ID
router.get('/:id', (req, res) => {
    const id = req.params.id;

    dataBase.findById(id)
    .then((response) => {
        if (response.length >0){
            res.status(200).json(response)
        }
        else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch((error) => {
        res.status(500).json({ error: "The posts information could not be retrieved." })
    })
})

// GET comment by ID
router.get('/:id/comments', (req, res) => {
    const id = req.params.id;

    dataBase.findById(id)
    .then((response) => {
        if (response.length === 0) {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
        return response
    })
    .then(
        dataBase.findPostComments(id)
        .then((response) => {
            if (response.length > 0) {
                res.status(200).json(response);
            }
            else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch((error) => {
            res.status(500).json({ error: "The posts information could not be retrieved." })
        })
    )
})

// === END OF GET REQUESTS ===


// === PUT and DELETE ===

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const updatedPost = req.body;

    console.log("id is: ", id, "post is: ", updatedPost)

    if(updatedPost.title && updatedPost.contents) {
        dataBase.update(id, updatedPost)
        .then((response) => {
            res.status(200).json(response)
        })
        .catch((error) => {
            res.status(500).json({error: "The post could not be modified"})
        })
    }
    else {
        res.status(400).json({errorMessage: "Please provide a title and contents for the post"})
    }
})


router.delete('/:id', (req, res) => {
    const id = req.params.id;

    console.log("id is: ", id)

    dataBase.findById(id)
    .then((response) => {
        dataBase.remove(id)
        .then(()=> {
            res.status(200).json(response)
        })
        .catch((error) => {
            res.status(500).json({error: "The post could not be removed"})
        })
    })
    .catch((error) => {
        res.status(500).json({message: "There was an error finding that post"})
    })
})


// export
module.exports = router;