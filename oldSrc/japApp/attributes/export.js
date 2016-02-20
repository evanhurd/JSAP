var esprima = require('esprima');
var astCRUD = require('astCRUD');

module.exports = init;
var exportId = 0;
function init(attributeList){
	attributeList['export'] = exportMethod;
}

function exportMethod(module, attrs){
	exportId++;
	
	var exportKeys = attrs[1].split(' as ');
	var exportObject = exportKeys[0];
	var exportAs = exportKeys[1];
	var exportName = 'export'+exportId;
	
	var templateAST = esprima.parse(template.toString());
	var templateCrud = new astCRUD(templateAST);

	templateCrud.renameIdentifier('exportName', exportName );
	templateCrud.changeLiteralValue('exportAs', exportAs );
	templateCrud.renameIdentifier('exportName', exportName );
	templateCrud.renameIdentifier('exportObject', exportObject);

	var exportHeader = templateCrud.findOneIdentifier('exportName').blockParent();
	module.header.findOne(/(Program)/).insert(exportHeader);
	exportHeader.remove();
	
	templateCrud.refreshMap();
	
	var exportExpression = templateCrud.findOneIdentifier(exportObject).blockParent();
	//console.log(module.program.findOneIdentifier(exportObject).node);
	module.program.findOneIdentifier(exportObject).insertAfter(exportExpression);
	
}

function template(){
	var exportName = putModule('exportAs');
	exportName(exportObject);
}

/*


var search = templateCrud.findIdentifier('exportName');
	var node1 = search[0][0].blockParent();
	var node2 = search[1][0].blockParent();
	
	node1.renameIdentifier('exportName', exportName );
	node1.changeLiteralValue('exportAs', exportAs );
	node2.renameIdentifier('exportName', exportName );
	node2.renameIdentifier('exportObject', exportObject);
	
	var search = module.program.findIdentifier(exportObject);
	if(search.length == 0) throw new Error('Could not find Identifier for "'+exportObject+'" to export');
	
	module.header.node.body.push(node1.node);
	var node = search[0][0];
	node.insertAfter(node2);*/
