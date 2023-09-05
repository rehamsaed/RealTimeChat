const chatForm = document.getElementById('chat-form');
const roomName=document.getElementById('room-name')
const userList=document.getElementById('users')

const chatMessage=document.querySelector('.chat-messages')
 const {username,room}=Qs.parse(location.search,{
  ignoreQueryPrefix:true
})
console.log(username,room)
const socket=io();

socket.emit('joinRoom',{username,room})

socket.on('roomUsers',({room,users})=>{
  outputRoomName(room);
  outputUsers(users);
})

socket.on('message',message=>{
  console.log(message)
  outputMessage(message)
  
chatMessage.scrollTop=chatMessage.scrollHeight

})

chatForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  const msg=e.target.elements.msg.value;
  socket.emit('chatMessage',msg)
  //clear input
  e.target.elements.msg.value='';
  e.target.elements.msg.focus()
})


function outputMessage(message){
  const div=document.createElement('div')
  div.classList.add('message')
  div.innerHTML=`<p class='meta'>${message.username}<span>${message.time}</span></p>
  <p class='text'>
${message.text}  
  </p>`
  document.querySelector('.chat-messages').appendChild(div)
}


// Add room name to DOM
function outputRoomName(room) {
  roomName.innerText = room;
}


function outputUsers(users) {
    userList.innerHTML = '';
    users.forEach((user) => {
      const li = document.createElement('li');
      li.innerText = user.username;
      userList.appendChild(li);
    });
  }


  document.getElementById('leave-btn').addEventListener('click', () => {
      const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
      if (leaveRoom) {
        window.location = '../index.html';
      } else {
      }
    });
