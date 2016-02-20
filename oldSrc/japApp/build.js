var JAP = require('JAP');
var dir = require('node-dir');
var fs = require('fs');

var attrPool = require('./attributes/attribute.js');

dir.files('./src', function(err, files) {
    if (err) throw err;
	var regex = /.+\.js$/;
	var code = "";
	for(var i = 0; i < files.length; i++){
		var file = files[i];
		var match = regex.exec(file);
		if(match) {
			console.log('JAPing: ', file);
			var content = fs.readFileSync(file, 'utf8');
			var jap = new JAP(content, attrPool);	
			code += "\n\n//"+file+"\n" + jap.generate();
			
		}
	}
	
	writeCode(code);
});

function writeCode(code){
	var content = fs.readFileSync('./appTemplate.js', 'utf8') + code;
	fs.writeFileSync('./build/app.js', content);
}
