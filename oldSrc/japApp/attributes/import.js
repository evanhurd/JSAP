var esprima = require('esprima');
var astCRUD = require('astCRUD');

module.exports = init;
var exportId = 0;
function init(attributeList){
	attributeList['import'] = exportMethod;
}

function exportMethod(module, attrs){
	var importKeys = attrs[1].split(' as ');
	var importModule = importKeys[0];
	var importAs = importKeys[1];
	
	var templateAST = esprima.parse(template.toString());
	var templateCrud = new astCRUD(templateAST);
	
	var getModule = templateCrud.findOneIdentifier('getModule');
	getModule.changeLiteralValue('importModule', importModule );
	getModule.renameIdentifier('importAs', importAs );
	getModule.findOneIdentifier('existingCode').replace(module.program);
	module.program = getModule.blockParent();
}

function template(){
	getModule('importModule', function(importAs){
		existingCode;
	});
}

