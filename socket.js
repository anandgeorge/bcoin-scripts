var socket = require('socket.io-client')('http://173.249.33.195:8332/');

socket.on('connect', function(){
	socket.emit('auth', 'patalmypal')
});

socket.on('version', function(data){
	console.log(data);
});


