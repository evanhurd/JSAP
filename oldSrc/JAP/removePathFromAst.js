module.exports = removePathFromAst;

function removePathFromAst(path){
	var node = path.node;
	var parentNode = path.parentPath.node;
	removeNodeFromParent(node, parentNode);
}



function removeNodeFromParent(node, parentNode){
	var index = parentNode.body.indexOf(node);
	parentNode.body.splice(index,1);
}
