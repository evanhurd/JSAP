['export', 'timeService as notes.service.time'];

function timeService(){
	
}

timeService.prototype.getTime = function(){
	return new Date().toString();
}


