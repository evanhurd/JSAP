var esprima = require('esprima');
var astCRUD = require('astCRUD');

module.exports = init;
var exportId = 0;
function init(attributeList){
	attributeList['CreateModel'] = CreateModel;
}

function CreateModel(module, attrs){
	var modelVar = attrs[1];
	
	var templateAST = esprima.parse(template.toString());
	var templateCrud = new astCRUD(templateAST);
	
	var modelNode = module.program.findOneIdentifier(modelVar).blockParent();


	//console.log(JSON.stringify(modelNode.map.map.paths, null, 4));
	//console.log(module.program.ast);
	replaceObjectLiteral(modelNode, 'string');
}

function template(){
	GetModule('notes.system.database', function(){
	
		var ModelName = sequelize.define('lowerCaseName', {
		  keys : keys
		});	
	
	});
}

function replaceObjectLiteral(node, literalValue){
	var regex = '\/ObjectExpression\/Property\/Literal\[value=\"'+literalValue+'\"\]"';

	var results = node.find(new RegExp(regex));
	console.log(results.length);
}

