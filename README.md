# French-Email-Name

[![npm version](https://badge.fury.io/js/french-email-name.svg)](https://badge.fury.io/js/french-email-name)

Extract the french first name from an email address.

## Installation

```bash
npm i french-email-name
```

## Usage

```js
const extractNameFromEmail = require('french-email-name');

const name = extractNameFromEmail('jeanjacques.goldman@example.com');
console.log(name); // Jean-Jacques
```
