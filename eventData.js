var Event = function(date,topic){
	 this.date  = date
	 this.topic = topic
}

var meetup = new Event(20150331, "cocktail social ");

var Inform = function(){
	return (meetup.topic+" happening on "+meetup.date);
};

module.exports=Inform;