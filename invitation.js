var net = require("net");
var fs = require("fs");
var port = 3000;

var names = [];
var emails=[];
var count = 0;
var at = /[@]/;

/// admin verifications 
var key = "/gen";
var login = false;
var guest = false;

var eTopic=[];
var eDate=[];

fs.readFile("eventInfo.json",function(err,data){
	 if(err){console.log(err)}else{
		var info = JSON.parse(data);
		 eTopic.push(info[0]);
		 eDate.push(info[1]);
	}

});
// var meetup = new Event(20150331, "cocktail social ");

var server = net.createServer(function(socket){
	console.log("somebody is here");


	socket.write(eTopic+" is happening on "+eDate+" current attendance count is "+ count + " people. Won't you join us? ");

socket.on('data',function(data){
	var response = data.toString().trim();
	var checkRes = response.split(" ");
	// console.log(checkRes);
	if(checkRes[0] ===key){
		login = true; 
		if (checkRes.length===1){
		socket.write("Hey girl what'sUp? :change DATE or TOPIC, see LIST or CLEAR list for the next event? >>");
		}else if(checkRes.length > 1 && login === true){
		var command = checkRes[1].toUpperCase();
		console.log(command);
			if (checkRes[0]===key && command === "DATE"){
				eDate = checkRes[2];
				console.log( " date is now " + eDate);
			}else if(checkRes[0]===key && command==="TOPIC"){
				eTopic = checkRes[2];
				console.log(eTopic);
			}else if(checkRes[0]===key && command ==="LIST"){
				
				fs.readFile("rsvp.json",function(err,data){
					if (err){
						console.log("something is wrong");
					}else{
						socket.write(data);
					}
				});
			}else if(checkRes[0]===key && command ==="CLEAR"){
				fs.unlink("rsvp.json",function(err){
					if(err){
						console.log(err);
					}else{
						console.log("RSVP list cleared for the next event");}
				});
			}
			/// write her changes into the json file/// test for readFile line 19
			var newInfo = [eTopic,eDate];
			console.log(newInfo);
			var JnewInfo = JSON.stringify(newInfo);

			fs.writeFile("eventInfo.json",JnewInfo,function(err){
						console.log("thing changed");
					}); 
		}

	}else{
		if (checkRes[0].toLowerCase()==="yes"){
		guest = true;
		socket.write("Please RSVP with your First and last name >> ");
		}else if (checkRes[0].toLowerCase()==="no"){
			socket.write("Who are you POSER (╯°□°)╯︵ ┻━┻");
		}
		if (checkRes[0] != key && checkRes.length === 2){
			names.push(response);
			socket.write("Great, now we just need your email address to RSVP >> ");
			console.log(names);
		}
		if(checkRes[0] != key && response.indexOf("@") != -1){
			emails.push(response);
			count ++; 
			var contacts = [];
		for (var i = 0; i<names.length; i++){
			contacts.push(names[i]+" , "+emails[i]);
		}
		console.log(contacts);
		var Jfile = JSON.stringify(contacts);
		fs.writeFile("rsvp.json",Jfile,function(err,data){
				if (err){ console.log(err); }else{socket.write("See you at the party ヾ(⌐■_■)ノ♪ ")}
			});

		}
	}

	
	});
});

server.listen(port, function(){
	console.log("listening on port"+port);
});
