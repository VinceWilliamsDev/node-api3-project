// code away!
const express = require('express')
const server = require('./server')

const port = 7000

server.listen(port, () => {
    console.log(`server listening on port ${port}`)
})