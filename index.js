const firstNames = require('fs').readFileSync(__dirname + '/first_names.txt').toString().split('\n').map(firstName => {
	return ({
		original: firstName,
		lowercase: firstName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace('-', '')
	});
});

function extractFirstNameFromEmail(email) {
	const emailSplit = email.replace('-', '').split('@');
	if(emailSplit[0].match(/^[a-z]\.[a-z]+$/))
		return null;

	if(emailSplit[0].match(/^[a-z]+\.[a-z]+$/))
		for(let firstName of firstNames)
			if(emailSplit[0].match(new RegExp('^' + firstName.lowercase + '\\.')))
				return firstName.original;

	const hardMatches = [];
	const easyMatches = [];

	for(let firstName of firstNames) {
		if(emailSplit[0].match(new RegExp(`\\b${firstName.lowercase}\\b`)))
			hardMatches.push(firstName.original);
		if(emailSplit[0].includes(firstName.lowercase) && !emailSplit[0].match(new RegExp(`[a-z.]${firstName.lowercase}[a-z.]`)) && emailSplit[0].length - 1 > firstName.lowercase)
			easyMatches.push(firstName.original);
	}

	if(hardMatches.length)
		return hardMatches.filter(x => !!x).sort((a, b) => b.length - a.length)[0];
	if(easyMatches.length)
		return easyMatches.filter(x => !!x).sort((a, b) => b.length - a.length)[0];

	return null;
}

module.exports = extractFirstNameFromEmail;
