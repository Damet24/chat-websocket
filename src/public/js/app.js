socket = io()
const messages = document.getElementById('messages')
const text = document.getElementById('itext')
const button = document.querySelector('button')
const nickname = document.getElementById('nickname')

text.addEventListener('keypress', event => {
  if(event.key == "Enter") {
    let info = {
      user: nickname.value,
      message: text.value
    }
    socket.emit('message', info)
  }
})
button.addEventListener('click', event => {
  let info = {
    user: nickname.value,
    message: text.value
  }
  socket.emit('message', info)
})

socket.on('chat', info => {
  let user = `<div class="u">${info.user ? info.user : 'Anonymous'}</div>`
  let mss = `<div class="m">${info.message}</div>`
  messages.innerHTML += `<div class="message">${user} ${mss}</div>`
  messages.scroll(0, messages.scrollHeight)
})
