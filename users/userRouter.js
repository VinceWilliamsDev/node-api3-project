const express = require('express');
const db = require('./userDb');
const postsDb = require('../posts/postDb')

const router = express.Router();

router.post('/', validateUser, (req, res) => {
 db.insert({name: req.body.name})
  .then(newUser => {
    res.json(newUser)
  })
  .catch(err => res.status(500).json({error: 'Unable to add new user to database'}))
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  const newPost = {
    text: req.body.text,
    user_id: req.params.id
  }
  postsDb.insert(newPost)
    .then(post => {
      console.log(post)
      res.json(post)
    })
    .catch(err => {
      res.status(500).json({error: 'Error occured while adding post to the database.'})
    })
});

router.get('/', (req, res) => {
  db.get()
    .then(users => {
      if(users.length > 0) {
        return (res.json(users))
      } else {
        return(res.status(404).json({error: 'users not found'}))
      }
    })
    .catch(err => res.status(500).json(err))
});

router.get('/:id', validateUserId, (req, res) => {
  res.json(req.user)
});

router.get('/:id/posts', validateUserId, (req, res) => {
  db.getUserPosts(req.params.id)
    .then(posts => {
      res.json(posts)
    })
    .catch(err => {
      res.status(500).json({error: 'unable to retrieve the users posts at this time'})
    })
});

router.delete('/:id', validateUserId, (req, res) => {
 db.remove(req.params.id)
  .then(records => {
    console.log(records)
    res.json({recordsDeleted: records})
  })
  .catch(err => {
    res.status(500).json({error: 'unable to remove user'})
  })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  const updatedUser = {
    id: req.params.id,
    name: req.body.name
  }
  db.update(req.params.id, updatedUser)
    .then(count => {
      console.log(count)
      if (count === 1) {
        res.json({message: 'The user was successfully updated.'})
      } else {
        res.status(500).json({error: 'Error while updating the user.'})
      }
    })
    .catch(err => {
      res.status(500).json({error: 'Unable to update specified user'})
    })
});

//custom middleware
function validateUserId(req, res, next){
  db.getById(req.params.id)
    .then(validUser => {
      console.log('validating', validUser)
      if (validUser) {
        req.user = validUser
        next()
      } else {
        res.status(404).json({error: 'user not found'})
      }
    })
    .catch(err => res.status(500).json({error: 'Invalid user ID'}))
}

function validateUser(req, res, next) {
  if (req.body) {
    if (req.body.name) {
      next()
    } else {
      res.status(400).json({error: 'missing required name field'})
    }
  } else {
    res.status(400).json({error: 'missing user data'})
  }
}

function validatePost(req, res, next) {
  if (req.body) {
    if (req.body.text) {
      next()
    } else {
      res.status(400).json({error: 'missing required text field'})
    }
  } else {
    res.status(400).json({error: 'missing post data'})
  }
  
} 
module.exports = router;
