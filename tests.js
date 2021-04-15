const assert = require('assert');

const extractFirstNameFromEmail = require('./index');

assert(extractFirstNameFromEmail('mathias.blabla@gmail.com') === 'Mathias');
assert(extractFirstNameFromEmail('mathiasblabla@gmail.com') === 'Mathias');
assert(extractFirstNameFromEmail('mathiasx@gmail.com') === 'Mathias');
assert(extractFirstNameFromEmail('xmathias@gmail.com') === 'Mathias');
assert(extractFirstNameFromEmail('xmathiasx@gmail.com') === null);
assert(extractFirstNameFromEmail('jeanpierreblabla@gmail.com') === 'Jean-Pierre');
assert(extractFirstNameFromEmail('jean-pierreblabla@gmail.com') === 'Jean-Pierre');

console.log('Tests passed.');
