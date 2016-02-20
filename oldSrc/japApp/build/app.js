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


//src\db.js
//Header

//Body
var Sequelize = require('sequelize');
var sequelize = new Sequelize('database', 'username', 'password');

//src\main.js
//Header
var export1 = putModule('notes.system.main');
//Body
getModule('notes.models.*', function (undefined) {
    getModule('notes.system.database', function (database) {
                function main() {
            database.sync().then(function () {
                var app = new App();
            });
        }
        export1(main);
    });
});

//src\model.note.js
//Header

//Body
var Note = {
    id: 'number',
    note: 'string',
    timestamp: 'datetime',
    test: { subkey: 1 }
};

//src\service.js
//Header
var export2 = putModule('notes.service.time');
//Body
function timeService() {
}
export2(timeService);
timeService.prototype.getTime = function () {
    return new Date().toString();
};