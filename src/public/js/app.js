socket = io()
const messages = document.getElementById('messages')
const text = document.getElementById('itext')
const button = document.querySelector('#send')
const bdown = document.querySelector('#buttom-down')
const nickname = document.getElementById('nickname')

const audio = new Audio('sounds/iphone-notificacion.mp3')
let onPage = true

button.addEventListener('click', event => {
  if(nickname.value != ""){
    let info = {
      user: nickname.value,
      message: text.value
    }
    socket.emit('message', info)
    messages.scroll(0, messages.scrollHeight)
  }
  else {
    alert("nickname field is required")
  }
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
  if(info.user === nickname.value){
    messages.innerHTML += `
      <div class="alert alert-primary" role="alert">
        <strong>${info.user}: </strong>${info.message}
      </div>`
  }
  else {
    messages.innerHTML += `
      <div class="alert alert-secondary" role="alert">
        <strong>${info.user}: </strong>${info.message}
      </div>`
  }

  if(!onPage){
    playSound()
  }


  if(info.user === nickname.value){
    toBottom()
  }
  else{
    if(messages.scrollHeight > messages.clientHeight){
      if(messages.scrollTop >= 0){
        bdown.style.display = 'block'
      }
    }
  }
})
