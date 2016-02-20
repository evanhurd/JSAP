var types = require("ast-types");
module.exports = findAttributes;

function findAttributes(ast, attrList){
  
  var foundAttrs = [];
   
  types.visit(ast, {
    visitExpressionStatement : function(path){
       if(path.node.expression.type ===  'ArrayExpression'){
			var tagElements = path.node.expression.elements;
			var elementValue = tagElements[0] ? tagElements[0].value : null;
			var elementType = tagElements[0] ? tagElements[0].type : null;

			if((elementType == 'Literal' || elementType == 'Identifier')
				&& attrList.indexOf(elementValue) > -1){
				
				foundAttrs.push({
					path : path,
					attribute : elementValue
				})
			}
       }
       this.traverse(path);
    }
  });
  
  
  return foundAttrs;
}
