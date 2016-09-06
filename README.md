[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

[Mom Made Pizza Rolls](http://forthebadge.com/images/badges/mom-made-pizza-rolls.svg)
[Does Not Contain MSG](http://forthebadge.com/images/badges/does-not-contain-msg.svg)

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

## Rules
Available rules: (*Please open an issue to request a specific rule*)

`min` {integer} // minimum length
`max` {integer} // max length
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
  min: 1,
  max: 30
}

{
  size: 10,
  type: 'phone'
}
```

## Format
