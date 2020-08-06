const express = require('express');
const db = require('./userDb')

const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
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
  res.json('is it working?')
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
});

//custom middleware
function validateUserId(req, res, next){
  const userId = req.params.id
  db.getById(userId)
    .then(validUser => {
      console.log('validating', validUser)
      req.user = validUser
      next()
    })
    .catch(err = res.status(500).json({error: 'Invalid user ID'}))
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
