common = require("../src/common.js");
assert = require("assert")
var redis_ = require("redis")
var redis = redis_.createClient();

describe('redis',function(){
	redis.flushdb()
	it("post",function(){
		 post("@man1 do something for @man2 ",function(){
		 	console.log("post 2")
		 	post("do something1 for @man1 ")	
		 })
	})
})
function post1(thing){
	redis.flushdb()
	redis.incr( 'count:event' , function( err, event_id ) {
		// fill event
		var key ="event:"+event_id;
		var value =thing;
		redis.set(key,value);
		//fill men
		var men = common.refer_to(thing);
		men.forEach(function(man){
			redis.incr('count:man',function(err,man_id){
				var key ="man:"+man_id;
				var value ="{'name':'"+man+"'}";
				redis.set(key,value);
				// fill man_event
				redis.sadd("man_event:"+man_id,event_id);
			})
	 	})
	})
}

function post(thing ,callback){
	
	redis.incr( 'count:event' , function( err, event_id ) {
		// fill event
		var key ="event:"+event_id;
		var value =thing;
		redis.set(key,value);
		//fill men
		var men = common.refer_to(thing);
		men.forEach(function(man){
			var key ="man:"+man;
			var value ="{'name':'"+man+"'}";
			redis.set(key,value);
			// fill man_event
			redis.sadd("man_event:"+man,event_id);
			if (man ==men[men.length-1] && callback )
				callback();
		})
	})
}







