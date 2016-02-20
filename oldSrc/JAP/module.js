module.exports = JapModule;
var esprima = require('esprima');
var escodegen = require('escodegen');
var AstCRUD = require('astCRUD');

function JapModule(code, attributePool, filePath){
	this.ast = esprima.parse(code);
	this.headerAst = returnModuleHeader();
	this.program = new AstCRUD(this.ast);
	this.header = new AstCRUD(this.headerAst);
	this.attributePool = attributePool || {};
	this.filePath = filePath || '';
	this.escodegen = escodegen;
	this.attributes = findASTAttributes(this.program);
	this._execAttributes();
	
	//this._mergeHeaderProgram();
	
	return this;
}

JapModule.prototype.generate = function(){
	return  "//Header\n" +escodegen.generate(this.header.node) + "\n//Body\n" + escodegen.generate(this.program.node);
}

JapModule.prototype._execAttributes = function(){
	
	for(var i = 0; i < this.attributes.length; i++){
		var attribute = this.attributes[i];
		var attributeKey = attribute[0];
		if(this.attributePool[attributeKey]){
			this.attributePool[attributeKey](this, attribute);
		}
		
		this.program = new AstCRUD(this.program.node);
		this.headerAst = new AstCRUD(this.headerAst.node);
	}
	
	return this;
}

JapModule.prototype._mergeHeaderProgram = function(){
	
	var rootBlock = this.program.findRootBlock();
	if(!rootBlock)return false;
	
	for(var i = this.header.ast.body.length-1; i >= 0; i--){
		var node = this.header.ast.body[i];
		rootBlock.ast.body.splice(0,0,node);
	}
	
	return this;
}



function returnModuleHeader(){
	return {
		"type" : "Program",
		"body" : []
	};
}

function findASTAttributes(astCrud){
	var regex = /[0-9+]\/ExpressionStatement\/(ArrayExpression)/;

	var matches = astCrud.find(regex);
	var attributes = [];
	
	for(var i = matches.length - 1; i >= 0  ; i--){
		var node = matches[i][0];
		
		attributes.splice(0,0,eval(escodegen.generate(node.node)));
		node.remove();		
	}
	
	return attributes;
}
