const express = require('express')
const path = require('path')
const app = express()

app.set('port', process.env.PORT || 3001)

app.use(express.static(path.join(__dirname + '/public')))

app.get('/', (req, res) => {
  res.send('hola como estas?')
})

const server = app.listen(app.get('port'), () => {
  console.log('server on port', app.get('port'))
})

const socketIO = require("socket.io");
const io = socketIO(server);

io.on('connection', socket => {

  socket.on('message', info => {
    io.sockets.emit('chat', info)
  })
})
