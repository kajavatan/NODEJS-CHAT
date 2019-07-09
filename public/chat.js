// Make connection
var socket = io.connect('https://webrtckaja.herokuapp.com/');

// Query DOM
var message = document.getElementById('message'),
      btn = document.getElementById('send'),
      output = document.getElementById('output');
      feedback = document.getElementById('feedback');

var handle = prompt("Please enter your name", "Harry Potter");
// Emit events
btn.addEventListener('click', function(){
  socket.emit('chat', {
      message: message.value,
      handle: handle
  });
  message.value = "";
});

message.addEventListener('keypress',function(){
  socket.emit('typing',handle);
});

// Listen for events
socket.on('chat', function(data){
	feedback.innerHTML = "";
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' : is typing' + '</em></p>';
});

// var handle = prompt("Please enter your name", "Harry Potter");