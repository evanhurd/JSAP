var esprima = require('esprima');
var types = require("ast-types");
var renameIdentifier = require("../RenameIdentifier.js");
var replaceIdentifierExpression = require("../ReplaceIdentifierExpression.js");
var renameLiteral = require("../RenameLiteral.js");



function Attribute(name){
	this.exec = function(){};
	this.global = null;
	this.program = null;
	program.attributeByName[name] = this;
	program.attributes.push(name);
	return this;
}

Attribute.prototype.run = function(attrNode, ast){


	this.global = esprima.parse(this.global.toString()).body[0].body;
	//console.log(JSON.stringify(this.global, null, 4));
	this.program = esprima.parse(this.program.toString()).body[0].body;
	//console.log(JSON.stringify(this.program, null, 4));
	var attrArgs = [];
	attrNode.expression.elements.forEach(function(n){
		attrArgs.push(n.value);
	});
	this.exec(attrArgs, ast);
	return this;
}

Attribute.prototype.renameIdentifier = renameIdentifier;
Attribute.prototype.replaceIdentifierExpression = replaceIdentifierExpression;
Attribute.prototype.renameLiteral = renameLiteral;

var program = {
	attributes : [],
	Attribute : Attribute,
	attributeByName :{}

};

module.exports = program;
