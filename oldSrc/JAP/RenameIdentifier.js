var types = require("ast-types");
module.exports = renameIdentifier;

function renameIdentifier(ast, from, to){ 
  types.visit(ast, {
    visitIdentifier : function(path){
    
       if(path.node.name === from) {
			path.node.name = to;
       }
       this.traverse(path);
    }
  });
}
