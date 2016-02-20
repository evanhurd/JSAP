module.exports = ASTNode;

var ASTMap = require('./astMap.js');

function ASTNode(ast, node, path){
	this.ast = ast;
	this.node = node || arguments[0];
	this.path = path || '/';
	this.refreshMap();
}

ASTNode.prototype.refreshMap = function(){
	this.map = new ASTMap(this.ast);
}

ASTNode.prototype.findOne = function(rejex){
	var result = mapResultsToNodes(this.ast, this.map.find(rejex));
	return result.length > 0 ? result[0][0] : null;
}

ASTNode.prototype.find = function(rejex){
	return mapResultsToNodes(this.ast, this.map.find(rejex));
}

ASTNode.prototype.findByPath = function(path){
	var node = this.map.getNodeByPath(path);
	if(!node) return null
	return new ASTNode(this.ast, node, path);
}

ASTNode.prototype.findOneIdentifier = function(name){
	var result = this.findIdentifier(name);
	return result.length > 0 ? result[0][0] : null;
}

ASTNode.prototype.findOneLiteral = function(value){
	var result = this.findLiteral(value);
	return result.length > 0 ? result[0][0] : null;
}

ASTNode.prototype.findIdentifier = function(name){
	var regexString = '(Identifier\\[name="'+name+'"\\])';
	return this.find(new RegExp(regexString));
}

ASTNode.prototype.findLiteral = function(value){
	var regexString = '(Literal\\[value="'+value+'"\\])';
	return this.find(new RegExp(regexString));
}

ASTNode.prototype.parent = function(){
	var parentPath = this.getParentPath(this.path);
	return this.findByPath(parentPath);
}

ASTNode.prototype.blockParent = function(){
	var match = /(.+[0-9+]\/[a-z|A-Z]+)/.exec(this.path);
	if(match === null)return null;
	var blockParent = match[1];
	return this.findByPath(blockParent);
}

ASTNode.prototype.parentBlock = function(){
	var match = /(.+)\/[0-9]\//.exec(this.path);
	if(match === null)return null;
	return this.findByPath(match[1]);
}

ASTNode.prototype.getParentPath = function(path){
	var parts = path.split('/');
	parts.splice(parts.length-1,1);
	return parts.join('/');
}

ASTNode.prototype.getBlockIndex = function(){
	var match = /.+([0-9+])/.exec(this.path);
	return match ? match[1] : null;
}

ASTNode.prototype.remove = function(){
	var index = this.getBlockIndex();
	var block = this.parentBlock();
	var blockChild = this.blockParent();
	return this.getBlockArray(block.node).splice(index,1) ? blockChild : false;
}

ASTNode.prototype.insertBefore = function(newSiblingNode){
	var index = this.getBlockIndex();
	var block = this.parentBlock();
	return this.getBlockArray(block.node).splice(index,0,newSiblingNode.node) ? true : false;
}

ASTNode.prototype.insertAfter = function(newSiblingNode){
	var index = this.getBlockIndex();
	var block = this.parentBlock();
	if(block.length - 1 > index)index++;
	return this.getBlockArray(block.node).splice(index++,0,newSiblingNode.node) ? true : false;
}

ASTNode.prototype.insert = function(newSiblingNode){
	return this.node.body && this.getBlockArray(this.node).push(newSiblingNode.node) ? true : false;
}

ASTNode.prototype.getBlockArray = function(node){
	if(node.type == 'FunctionDeclaration'){
		return node.body.body;
	}else{
		return node.body;
	}
}

ASTNode.prototype.replace = function(newNode){
	var index = this.getBlockIndex();
	var block = this.parentBlock();
	var blockChild = this.blockParent();
	return block.node.body.splice(index,1, newNode.node) ? blockChild : false;
}

ASTNode.prototype.renameIdentifier = function(oldName, newName){
	var nodes = this.findIdentifier(oldName);
	
	for(var i = 0; i < nodes.length; i++){
		nodes[i][0].node.name = newName;
	}
}

ASTNode.prototype.changeLiteralValue = function(oldValue, newValue){
	var nodes = this.findLiteral(oldValue);
	for(var i = 0; i < nodes.length; i++){
		nodes[i][0].node.value = newValue;
	}
}


ASTNode.prototype.findRootBlock = function(){
	var regex = /\/([a-z]+)\/[0-9+]/i;
	var results = this.find(regex);
	return results.length > 0 ? results[0][0] : null
}

function mapResultsToNodes(ast, results){
	var ret = [];
	
	for(var i = 0; i < results.length;i++){
		var group = results[i];
		var groupArray = [];
		for(var x = 0; x < results[i].length; x++){
			var node = results[i][x].node;
			var nodePath = results[i][x].path;
			groupArray.push(new ASTNode(ast, node, nodePath));
		}
		ret.push(groupArray);
	}
	return ret;
}


