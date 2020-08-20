const socket= io('http://localhost:8000');

const form=document.getElementById('form');
const messageInput=document.getElementById('get-message');
const messageContainer=document.querySelector('.container');
var audio=new Audio('notify.mp3');
const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerHTML=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left'){
        audio.play();
    }
}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value=''
})

const name= prompt("Enter your name to join");
socket.emit('new-user-joined',name);

socket.on('user-joined',name=>{
    append(`${name} joined the chat`,'left')
})

socket.on('receive',data=>{
    append(`${data.name}: ${data.message}`,'left')
})

socket.on('leave',name=>{
    append(`${name} left the chat`, 'left')
})