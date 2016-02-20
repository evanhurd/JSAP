var attribute = require('./attribute.js');
var ASTMap =require('../astMap.js');
var attr = new attribute.Attribute('Export');
module.exports = attr;


function header_block(){
	var _exportPromise = putModule('_exportAs');
}


function code_block(){
   existingCode;
   _exportPromise(_exportObject);
}

attr.exec = function(attrNode, ast){
	var map = new ASTMap(ast);
	var temp = attrNode[1].split(' as ');
	var exportObject = temp[0];
	var moduleName = temp[1];
	var promiseName = 'exportPromise_'+exportObject;
	
	this.renameIdentifier(this.program, '_exportPromise', promiseName);
	this.renameIdentifier(this.program, '_exportObject', exportObject);
	this.renameIdentifier(this.global, '_exportPromise', promiseName);
	this.renameLiteral(this.global, '_exportAs', moduleName);
		
	this.replaceIdentifierExpression(this.program, 'existingCode', ast.body[0]);
	
}

attr.global = header_block;
attr.program = code_block;

