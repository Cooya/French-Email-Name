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

	const exactMatches = [], closeMatches = [];

	for(let firstName of firstNames) {
		if(emailSplit[0].match(new RegExp(`\\b${firstName.lowercase}\\b`)))
			exactMatches.push(firstName.original);
		
		if(emailSplit[0].includes(firstName.lowercase) && !emailSplit[0].match(new RegExp(`[a-z.]${firstName.lowercase}[a-z.]`)))
			closeMatches.push(firstName.original);
	}

	if(exactMatches.length)
		return exactMatches.filter(x => !!x).sort((a, b) => b.length - a.length)[0];
	if(closeMatches.length)
		return closeMatches.filter(x => !!x).sort((a, b) => b.length - a.length)[0];

	return null;
}

module.exports = extractFirstNameFromEmail;
