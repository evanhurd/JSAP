['export', 'main as notes.system.main'];
['import', 'notes.system.database as database'];
['import', 'notes.models.*'];

function main(){
	database.sync().then(function() {
		var app = new App();
	});
}


