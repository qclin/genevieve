

a file that contains event data: date & topic 

publish eventData when attendee first connected 

if client would like to attend 
asked for names and email addresses 
check for name === 'string', First and LAST
check for email === string containing @ and .
	else get return error 
	prompts for correction
keep a head count  var count = 0;
after name and email is verified, both true, count increments 

publish count to each client that connects

save attendee info on separate file 

allow Geneive to have special access with a passcode 

when passcode is enter give option list of possible actions

actions include: change event TOPIC & event DATES, to see the list of attendee information, and to also clear the list of RSVP for the next event 


////// instructions for genevieve 

upon connection you access code is "/gen"
you will then be able to choose a list of actions 

"change DATE or TOPIC, see LIST or CLEAR list for the next event"

even command is in listed in UPPERCASE, 

please enter in the following format 

access code + command + information  please maintain information without space breaks or else you'll loose data 

for example if you would like to change the event TOPIC 
please enter "/gen topic ICE_CREAM_SOCIAL"

and if you would like to change the date 
please enter "/gen date Week3_d02"

for LIST and Clear simply enter after your access code 


