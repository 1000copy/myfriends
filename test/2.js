common = require("../src/common.js");
assert = require("assert")
var r = require("../src/db.js")

describe('redis',function(){
	r.flushdb();
	it("post",function(){
		  r.post("@man1 do something for @man2 ")
		  r.post("do something1 for @man1 ")	
		  r.post("@刘备 请@关羽 出阵，@张飞 掠阵")
	})
})
