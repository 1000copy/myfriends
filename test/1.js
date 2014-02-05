return;
common = require("../src/common.js");
assert = require("assert")
var redis_ = require("redis")
var redis = redis_.createClient();
describe('Array', function(){
  describe('#indexOf()', function(){
    it('should return -1 when the value is not present', function(){
      assert.equal(-1, [1,2,3].indexOf(0));
    })
  })
})
describe('regex',function(){
	it('weibo refer to three men',function(){
		var a = common.refer_to('@刘备 请@关羽 出阵，@张飞 掠阵')
		assert.equal(a.toString(),"刘备,关羽,张飞")
	})
})

describe('redis',function(){
	it('man',function(){
		var key ="man:1";
		var json_value ={'name':'ff'}
		var value = JSON.stringify(json_value);
		redis.set("man:1",value);
		redis.get("man:1",function(err,a){
			assert.equal(value,a);	
		});
	})
	it("set man:1 {'name':'周瑜'}",function(){
		// console.log("周瑜");
		var key ="man:1";
		var value ={'name':'周瑜'};
		redis.set("man:1",JSON.stringify(value));
		redis.get("man:1",function(err,redis_value){
			// assert.equal(value,JSON.parse(redis_value));
			assert.equal(JSON.stringify(value),redis_value);
		});
	})
	it("set man:1 {'name':'小乔'}",function(){
		// console.log("周瑜");
		var key ="man:2";
		var value ={'name':'小乔'};
		redis.set(key,JSON.stringify(value));
		redis.get(key,function(err,redis_value){
			// assert.equal(value,JSON.parse(redis_value));
			assert.equal(JSON.stringify(value),redis_value);
		});
	})
	it("set event:1 '@周瑜 给 @小乔买了一个包，价值￥10000多，于是，她昨晚就从了他。'",function(){
		// console.log("周瑜");
		var key ="event:1";
		var value ="@周瑜 给 @小乔买了一个包，价值￥10000多，于是，她昨晚就从了他。";
		redis.set(key,value);
		redis.get(key,function(err,redis_value){
			// assert.equal(value,JSON.parse(redis_value));
			assert.equal(value,redis_value);
		});
	})
	it("set event:2 '随后 @周瑜 又为 @大乔 搞了一个诗社，这样，乔阁老一家被整合完毕。'",function(){
		// console.log("周瑜");
		var key ="event:2";
		var value ="随后 @周瑜 又为 @大乔 搞了一个诗社，这样，乔阁老一家被整合完毕。";
		redis.set(key,value);
		redis.get(key,function(err,redis_value){
			// assert.equal(value,JSON.parse(redis_value));
			assert.equal(value,redis_value);
		});
	})
	it("woo,koo'",function(){
		redis.sadd("man_event:周瑜",1);
		redis.sadd("man_event:周瑜",2);
		redis.sadd("man_event:小乔",1);
		redis.smembers("man_event:周瑜",function(err,redis_value){
			assert.equal("1,2",redis_value.join(","));
		});
	})
	it("和周瑜有关的帖子",function(){
		var man ="周瑜";
		console.log("和周瑜有关的帖子")
		redis.smembers("man_event:"+man,function(err,redis_value){
			assert.equal("1,2",redis_value.join(","));
			redis_value.forEach(function(event_id){
				redis.get("event:"+event_id,function(err,event){
					console.log(event_id,event);
				})
			})
		});
	})
	it("全部帖子",function(){
		console.log("all post")
		redis.keys("event:*",function(err,redis_value){
			// assert.equal("event:2,event:1",redis_value.join(","));
			redis_value.forEach(function(item){
				redis.get(item,function(err,item){
					console.log(item)
				})
			})
		});
	})
	it("incr",function(){
	 redis.incr( 'event' , function( err, id ) {
	 	console.log(id)
	 })
	})
	it("post",function(){
	 post("@man1 do something")
	})
})
function post(thing){
	redis.flushdb();
	redis.incr( 'event' , function( err, event_id ) {
		// fill event
		var key ="event:"+event_id;
		var value =thing;
		redis.set(key,value);
		//fill men
		var men = common.refer_to(thing);
		console.log("dkdk")
		men.forEach(function(man){
			redis.incr('man'),function(err,man_id){
				var key ="man:"+man_id;
				var value ="{'name':'"+man+"'}";
				redis.set(key,value);
				// fill man_event
				redis.sadd("man_event:"+man_id,event_id);
			}
		})
	 })
}