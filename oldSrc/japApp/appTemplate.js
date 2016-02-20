var modules = {};

function getModule(moduleName, callback){

	return (function(moduleName, callback){
		
		
		var resolve = function(){
			if(tryCount > 10) throw new Error('Timeout while trying to resolve module: '+moduleName);
			tryCount++;
			if(modules[moduleName]){
				callback(modules[moduleName]);
			}else{
				setTimeout(resolve, 10);
			}
		};
		
		var tryCount = 0;
		setTimeout(resolve, 10);
	})(moduleName, callback);
}

function putModule(moduleName){
	return function(moduleName, module){
		modules[moduleName] = module;
	}.bind(null, moduleName);
}
