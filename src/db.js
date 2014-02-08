exports.post = post;
exports.flushdb = flushdb;
exports.get_events = get_events;
var redis_ = require("redis")
var redis = redis_.createClient();

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

function flushdb(){
	redis.flushdb();
}
function get_events(callback){
	// return [1,2,3];
	var events = [];
	redis.keys("event:*",function(err,keys){
		keys.forEach(function(key){
			redis.get(key,function(err,item){
				events.push(item)
				if (events.length == keys.length)
					callback(events)
			})
		})
		
	})	
}
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

