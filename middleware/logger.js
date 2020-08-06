//custom middleware
const express = require('express')


function logger(req, res, next) {
    console.log(`Request type: ${req.method} from ${req.originalUrl} recieved at ${date.toISOString}`)

    next()
}

module.exports = logger
