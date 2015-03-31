var net = require("net");
var fs = require("fs");
var event = require("./eventData.js");
var port = 3000;

var names = [];
var emails=[];
var count = 0;
var at = /[@]/;

var server = net.createServer(function(socket){
	console.log("somebody is here");
	broadcast("current attendance "+ count);
socket.write("Join us at "+ event() +"Please RSVP with your First and last name >> ");

socket.on('data',function(data){
	var response = data.toString().trim();
	var split = response.split(" ");
		if (split.length === 2){
			names.push(response);
			socket.write("Great, now we just need your email address to RSVP >> ");
			console.log(names);
		}
		if(response.indexOf("@") != -1){
			emails.push(response);
			count ++; 
			console.log(emails);
			console.log(count);
		}
	var contacts = [];
	for (var i = 0; i<names.length; i++){
		contacts.push(names[i]+" , "+emails[i]);
	}

	var Jfile = JSON.stringify(contacts);
	fs.writeFile("rsvp.json",Jfile,function(err,data){
			if (err){ console.log(err); }else{}
		});
	});

// Send a message to all clients
  function broadcast(message, sender) {
    clients.forEach(function (client) {
      // Don't want to send it to sender
      if (client === sender) return;
      client.write(message);
    });
    // Log it to the server output too
    process.stdout.write(message)
  }

});


server.listen(port, function(){
	console.log("listening on port"+port);
});
