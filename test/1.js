common = require("../src/common.js");
assert = require("assert")
describe('Array', function(){
  describe('#indexOf()', function(){
    it('should return -1 when the value is not present', function(){
      assert.equal(-1, [1,2,3].indexOf(0));
    })
  })
})

event_emmit=function (msg){
	return ['陈翔','杨千栋','豆豆'];
}
function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
describe('my friends', function(){
    it('event emmiting', function(){
		var a  = event_emmit('@陈翔 建议我和 @杨千栋 一起去西昌，让@豆豆 多晒太阳！');
		var b =  ['陈翔','杨千栋','豆豆'];
		var r = arraysEqual(a,b);
		assert.equal(true,r);
    })
 })
describe('regex',function(){
	it('should match three times ',function(){
		var str = "The rain in SPAIN stays mainly in the plain"; 
		var res = str.match(/ain/g);
		assert.equal(res.length,3);
	})
	it('dump3',function(){
		var str =  "The @rain in @rf SPAIN @豆豆 stays mainly in the plain"; 
		var a = common.refer_to(str);
		var b = ['rain','rf','豆豆']
		var r = arraysEqual(a,b)
		assert.equal(r,true)
	})
	it('weibo refer to three men',function(){
		var str = '@陈翔 建议我和 @杨千栋 一起去西昌，让@豆豆 多晒太阳！'
		var a = common.refer_to(str);
		var b = ['陈翔','杨千栋','豆豆']
		var r = arraysEqual(a,b)
		assert.equal(r,true,a)
	})
})



