var esprima = require('esprima');
var escodegen = require('escodegen');
var ASTMap = require('../astMap.js');
var ASTNode = require('../astNode.js');

function testA(){
	
	function a(){
		
		function b(){
			console.log('test');		
		}
		
	}
	
	for(var i = 0; i < i.length;i++){
		var a = 1;
	}
}

function testB(){
	Test;
}
var codeA = (testA.toString());
var codeB = (testB.toString());

var astA = esprima.parse(codeA);
var astB = esprima.parse(codeB);

var nodeA = new ASTNode(astA, astA, '/');
var nodeB = new ASTNode(astB, astB, '/');

console.log('Find Identifier');
var findIdentifier_a = nodeA.findIdentifier('a');
var findIdentifier_b = nodeA.findIdentifier('b');
var findIdentifier_i = nodeA.findIdentifier('i');

console.log(findIdentifier_a[0][0].path);
console.log(findIdentifier_b[0][0].path);
console.log(findIdentifier_i[0][0].path);


console.log('Find Literal');
var findLiteral_a = nodeA.findLiteral('test');
var findLiteral_b = nodeA.findLiteral('0');
var findLiteral_c = nodeA.findLiteral('1');

console.log(findLiteral_a[0][0].path);
console.log(findLiteral_b[0][0].path);
console.log(findLiteral_c[0][0].path);

console.log('Find Node parents');
var parent = findIdentifier_a[0][0].parent();
console.log(parent.path);

console.log('Find Block Parent');
var blockParent = parent.blockParent();
console.log(blockParent.path);

console.log('Find Parent Block');
var parentBlock = parent.parentBlock();
console.log(parentBlock.path);

console.log('Find Index in Block');
var indexInBlock = findIdentifier_a[0][0].getBlockIndex();
console.log(indexInBlock);

console.log('Remove Function testA');
var blockChild = findIdentifier_a[0][0].remove();
console.log(blockChild.path);

console.log('Insert Function testA into Function testB');
var funcTestB = nodeB.findIdentifier('testB');


//console.log(JSON.stringify(ast, null, 4));
//console.log(JSON.stringify(programAst, null, 4));


//console.log(escodegen.generate(programAst));


