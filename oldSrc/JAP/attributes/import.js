var attribute = require('./attribute.js');
var attr = new attribute.Attribute('Import');
module.exports = attr;


function header_block(){
  var _importPromise = getModule('_exportAs');
}


function code_block(){
  _importPromise(function(_argument){
    existingCode;
  });
}

attr.exec = function(attrNode, ast){
	var promiseName = 'TESATING';
	var moduleName = 'test.test.test';
	var importAs = 'test';
	
	this.renameIdentifier(this.program, '_importPromise', promiseName);
	this.renameIdentifier(this.program, '_argument', importAs);
	this.renameIdentifier(this.global, '_importPromise', promiseName);
	this.renameLiteral(this.global, '_exportAs', moduleName);
	//console.log(JSON.stringify(this.program, null, 4));
	this.replaceIdentifierExpression(this.program, 'existingCode', ast.body[0]);
	
}

attr.global = header_block;
attr.program = code_block;

