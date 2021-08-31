socket = io()
const messages = document.getElementById('messages')
const text = document.getElementById('itext')
const button = document.querySelector('#send')
const bdown = document.querySelector('#buttom-down')
const nickname = document.getElementById('nickname')

const audio = new Audio('sounds/iphone-notificacion.mp3')
let onPage = true

button.addEventListener('click', event => {
  let info = {
    user: nickname.value,
    message: text.value
  }
  socket.emit('message', info)
})
bdown.addEventListener('click', () => {
  toBottom()
  bdown.style.display = 'none'
})

function playSound(){
  audio.play()
}

function toBottom(){
  messages.scroll(0, messages.scrollHeight)
}

document.addEventListener('visibilitychange', function(event) {
  if (!document.hidden) {
    onPage = true
  } else {
    onPage = false
  }
})

socket.on('chat', info => {
  let user = `<div class="u">${info.user ? info.user : 'Anonymous'}</div>`
  let mss = `<div class="m">${info.message}</div>`
  messages.innerHTML += `<div class="message">${user} ${mss}</div>`

  if(!onPage){
    playSound()
  }

  if(messages.scrollHeight > messages.clientHeight){
    if(messages.scrollTop >= 0){
      bdown.style.display = 'block'
    }
  }
})
