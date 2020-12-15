const assert = require('assert');

const extractFirstNameFromEmail = require('./index');

assert(extractFirstNameFromEmail('mathias.blabla@gmail.com') === 'Mathias');
assert(extractFirstNameFromEmail('mathiasblabla@gmail.com') === 'Mathias');
assert(extractFirstNameFromEmail('mathiasb@gmail.com') === null);
assert(extractFirstNameFromEmail('jeanpierreblabla@gmail.com') === 'Jean-Pierre');

console.log('Tests passed.');
