[![npm version](https://badge.fury.io/js/string-format-validation.svg)](https://badge.fury.io/js/string-format-validation)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

[![Build Status](https://travis-ci.org/crobinson42/string-format-validation.svg?branch=master)](https://travis-ci.org/crobinson42/string-format-validation)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![Code Climate](https://codeclimate.com/github/crobinson42/string-format-validation/badges/gpa.svg)](https://codeclimate.com/github/crobinson42/string-format-validation)

[![forthebadge](https://img.shields.io/badge/Node.js-v4-yellow.svg)](http://nodejs.org)
[![forthebadge](https://img.shields.io/badge/Node.js-v6-orange.svg)](http://nodejs.org)

[![forthebadge](https://img.shields.io/badge/Mom%20Made-Pizza%20Rolls-blue.svg)](http://pizza.com)


# string-format-validation
Javascript library to format &amp; validate strings (or Numbers)

============================

A common usage for this library is `<input />` fields and validating the input and/or formatting (masking ie: phone (###) ###-####).

### Built Atop Awesome Work By Others
[validator.js](https://github.com/chriso/validator.js/)
[string-mask](https://github.com/the-darc/string-mask)

============================

## Usage

`npm install string-format-validation`

#### Format (masking)

```js
import StringFormatValidation from 'string-format-validation'

const userInput = '9166163600'
const format = '(###) ### - ####'
const formattedInput = StringFormatValidation.format(format, userInput)

console.log(formattedInput) // (916) 616 - 3600
```

#### Validate

```js
import StringFormatValidation from 'string-format-validation'

const validationRules = {
  name: {
    min: 1,
    max: 20
  },
  email: {
    type: 'email'
  },
  zip: {
    size: 5
  }
}

const userInput1 = 'Cory'
const userInput2 = 'coryrobinson42@gmail.com'
const userInput3 = '90210'
console.log( StringFormatValidation.validate(validationRules.name, userInput1) ) // returns `true`
console.log( StringFormatValidation.validate(validationRules.email, userInput2) ) // returns `true`
console.log( StringFormatValidation.validate(validationRules.email, userInput3) ) // returns `true` because the string length is '===' 5

```

#### Putting It Together - Validate & Format

```js
import StringFormatValidation from 'string-format-validation'

const rules = {
  name: {
    min: 1,
    max: 20
  },
  email: {
    type: 'email'
  },
  phone: {
    format: '(###) ### - ####'
    size: 13 // must include formatting added characters ie: '()' & '-'
  }
}

const userInputs = {
  name: 'cory',
  email: 'coryrobinson42', // not a valid email
  phone: '9166163600'
}

console.log( StringFormatValidation(rules, userInputs) )
// { name: true, email: false, phone: { valid: true, format: '(916) 616 - 3600'}}
```

## Validation
Available rules: (*Please open an issue to request a specific rule*)

`min` {integer} // minimum length

`max` {integer} // max length

*Note- to enforce max char and return a value that is limited to the max, ie: let this module do the work of not letting the string be greater than the `max`, use `enforce: true`*

*The response will be an object instead of a boolean validation status*

`enforce` {boolean} // defaults to false

`size` {integer} // exact length

`type`
- date
- email
- phone
- creditcard
- number

Rules must be in Object structure:

```js
{
  min: 1, // min characters allowed
  max: 30 // max characters allowed
}

{
  size: 10,
  type: 'phone' // any of the listed 'types' above
}
```

## Format

You can use Special Characters for your format needs.

```js
import StringFormatValidation from 'string-format-validation'

const userInput = '9166163600'
const format = '(###) ### - ####'
const formattedInput = StringFormatValidation.format(format, userInput)

console.log(formattedInput) // (916) 616 - 3600
```

Character | Description
--- | ---
`0` | Any numbers
`9` | Any numbers (Optional)
`#` | Any numbers (recursive)
`A` | Any alphanumeric character
`a` | Any alphanumeric character (Optional) __Not implemented yet__
`S` | Any letter
`U` | Any letter (All lower case character will be mapped to uppercase)
`L` | Any letter (All upper case character will be mapped to lowercase)
`$` | Escape character, used to escape any of the special formatting characters.
