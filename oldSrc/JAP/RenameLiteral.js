var types = require("ast-types");
module.exports = renameLiteral;

function renameLiteral(ast, from, to){  
  types.visit(ast, {
    visitLiteral : function(path){
    
       if(path.node.value === from) {
			path.node.value = to;
			path.node.raw = to;
       }
       this.traverse(path);
    }
  });
}
