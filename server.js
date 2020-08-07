const express = require('express');
const userRouter = require('./users/userRouter')

const server = express();

server.use(express.json())
server.use(logger)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use('/api/users', userRouter)


//custom middleware

function logger(req, res, next) {
  console.log(`Request type: ${req.method} from ${req.originalUrl} recieved at ${new Date().toISOString()}`)

  next()
}

module.exports = server;
