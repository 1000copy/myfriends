exports.refer_to = refer_to;
// exports.post = post;
var redis = require("redis")
function refer_to(str){
	var start ='@'
	var end = ' '
	var arr = str.split(start);
	var r = new Array();
	//dump($arr);
	arr.forEach(function(item){
		// console.log('item:\s', item)
	   if (item!=arr[0]){
	   // if (item.indexOf(start)==0){
	   	// if(true){
		   var a1 = item.split(end)
		   if (a1.length>0)
		   	// console.log(a1[0])
		   	r.push(a1[0]);
		}
	})
	return r;
}
