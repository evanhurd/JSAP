['Export', 'Note as notes.model.Note'];
['CreateModel', 'Note'];
['ExposeModel', 'Note as api/Note', ['GET','POST','DELETE','INSERT']];

var Note = {
	id : 'number',
	note : 'string',
	timestamp : 'datetime',
	test : { subkey : 1}
};

