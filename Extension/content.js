var heartRate = 60;
var isBeating = true;


$('body').css({
  'transition': 'all 0.3s cubic-bezier(0, 0, 0.1, 3.32)'
});

function heartBeatDown() {
  $('body').css({
    //opacity: 0.6,
    transform: "scale(0.99, 0.999)",
    "transform-origin": "center"
  });

  console.log('next up-beat', 1000*(60/(heartRate*2)));
  if (isBeating) {
    setTimeout(heartBeatUp, 1000*(60/(heartRate*2)));
  }
}

function heartBeatUp() {
  $('body').css({
    //opacity: 1,
    transform: "scale(1, 1.05)",
    "transform-origin": "center"
  });

  if (isBeating) {
    setTimeout(heartBeatDown, 1000*(60/(heartRate*2)));
  }
}

heartBeatDown();


// Socket.io
//--------------------------------------------------------------------

var port = 3201;
var socket = io.connect('http://localhost:' + port);

socket.on('connect', function() {
  console.log('io connected successfully');
});

socket.on('connect_error', function() {
  console.log('io failed to connect. Is the socket server running?');
});

// Add a listener for an event named "news"
socket.on('news', function (data) {
  console.log('received "news" event with data:',data);
  // send back an event named "my other event" to the socket server
  socket.emit('my other event', { my: 'data' });
});
var messageCount = 0;
socket.on('heart', function (data) {
  messageCount = messageCount+1;
  console.log('received "news" event with data:',data);
  var beat = data.beat;
  console.log('heart data: ', data)
  heartRate = data.beat;

  if (heartRate < 40 || heartRate > 100) {
    isBeating = false;
  } else {
    if (!isBeating) {
      isBeating = true;
      heartBeatDown();
    }
  }

if(isBeating){
  chrome.runtime.sendMessage(heartRate);

}

  socket.emit('my other event', { my: 'beats' });
});