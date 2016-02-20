var types = require("ast-types");
var ASTNode = require('./astNode.js');
module.exports = ReplaceIdentifierExpression;

function ReplaceIdentifierExpression(ast, identifierName, newAst){  
  /*types.visit(ast, {
    visitExpressionStatement : function(path){

       if(path.node.expression.type === 'Identifier'
       		&& path.node.expression.name === identifierName) {
       		
       		var node = path.node;
			var parentNode = path.parentPath.node;
       		var index = parentNode.body.indexOf(node);
       		
			parentNode.body.splice(index,1, newAst);
			return false;
       }
       this.traverse(path);
    }
  });*/
  
  var node = new ASTNode(ast);
  var regex = new RegExp('(Identifier\\[name="'+identifierName+'"\\])');
  var results = node.find(regex);
  console.log(results);
  
  results[0][0].insertBefore(newAst);
  results[0][0].remove();
  
  console.log(JSON.stringify(node.ast, null, 4));
}
