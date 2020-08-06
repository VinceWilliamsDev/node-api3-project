// code away!
const server = require('./server')

const port = 7000

server.listen(port, () => {
    console.log(`server listening on port ${port}`)
})