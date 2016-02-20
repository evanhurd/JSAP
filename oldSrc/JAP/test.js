var JapModule = require('./module.js');

function test(){
	['test','test2',function(){}];	
}
var testCode = (test.toString());

var code = new JapModule(testCode).generate();

console.log(code);

return 0;


/*var esprima = require('esprima');
var escodegen = require('escodegen');
var findA(ttrs = require('./FindAttributes.js');
var removeAttrs = require('./removePathFromAst.js');
var ASTMap = require('./astMap.js');
var ASTNode = require('./astNode.js');

var attribute = require('./attributes/attribute.js');
var exportAttr = require('./attributes/export.js');


function programDefinition(){
	var module = test;
}


function test(){
	[];	
}
var testCode = (test.toString());
var ast = esprima.parse(testCode);
console.log(JSON.stringify(ast, null, 4));


var testCode = (test.toString());
var programDefinitionCode = (programDefinition.toString());

var ast = esprima.parse(testCode);

var programAst = esprima.parse(programDefinitionCode);

var attrs = findAttrs(ast, attribute.attributes);

attrs.forEach(function(attr){
	removeAttrs(attr.path);
	var result = attribute.attributeByName[attr.attribute].run(attr.path.node, ast);
	
	programAst.body[0].body.body = Array.prototype.concat.call(programAst.body[0].body.body, result.global.body);
	programAst.body[0].body.body = Array.prototype.concat.call(programAst.body[0].body.body, result.program.body);
		
	//console.log(JSON.stringify(result.program, null, 4));
});*/


//console.log(JSON.stringify(ast, null, 4));
//console.log(JSON.stringify(programAst, null, 4));


console.log(escodegen.generate(programAst));


