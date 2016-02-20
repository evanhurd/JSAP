var esprima = require('esprima');

function test(){
	
	/*function 1*/
	function test(){
	
	}
	
	var a = 1;
	
	for(var i = 0; i < 10; i++){
	
	}
	
	test.test1.test2 = 1;
	
	if(1){
	
	}
}

console.log(JSON.stringify(esprima.parse(test.toString()), null, 4));
