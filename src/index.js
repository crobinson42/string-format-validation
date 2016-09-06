import { isEmail, isDate, isCreditCard, isInt, isLength } from 'validator'
const Mask = require('string-mask')

const StringFormatValidation = (rules, val) => {
  const __validArgs = __validateArguments(rules, val)
  if (__validArgs) {
    try {
      console.error(new Error(__validArgs))
    } catch (e) {
      return new Error(__validArgs)
    }
    return
  }

  let returnVal

  // if val is an obj iterate it's keys and look for matching rules
  if (typeof val === 'object') {
    returnVal = {}
    for (let _key in val) {
      returnVal[_key] = dowork(rules[_key], val[_key])
    }
  } else {
    returnVal = dowork(rules, val)
  }

  function dowork (rules = {}, val) {
    let _valid
    let _formatted

    // check for format key in rules, first
    if (rules.format) {
      _formatted = _format(rules.format, val)
    }

    // if rule 'required' === false then it's considered 'valid' (we don't validate)
    if (rules.require === false) {
      _valid = true
    } else {
      _valid = _validate(rules, val)
    }

    if (_formatted) {
      return {
        format: _formatted,
        valid: _valid
      }
    } else {
      return _valid
    }
  }

  return returnVal
}

const _validate = StringFormatValidation.validate = (rules = {}, string) => {
  if (typeof string === 'number') {
    // coerce to string
    string += ''
  }

  // use 'validator' as 'v'
  let _valid = true
  if (rules.type) {
    switch (rules.type) {
      case 'date':
        _valid = isDate(string)
        break
      case 'email':
        _valid = isEmail(string)
        break
      case 'creditcard':
        _valid = isCreditCard(string)
        break
      case 'phone':
        try {
          _valid = string.match(/\d/g).join('').length === 10
        } catch (e) {
          _valid = false
        }
        break
      case 'number':
        _valid = isInt(string)
        break
    }
  }

  if (!_valid) {
    return _valid
  }

  if (rules.min || rules.max || rules.size) {
    let min = rules.min || 0
    let max = rules.max || undefined
    let size = rules.size || undefined

    if (size) {
      min = max = size
    }

    _valid = isLength(string, {min: min, max: max})
  }

  return _valid
}

const _format = StringFormatValidation.format = (format, string) => {
  try {
    string = string.match(/\w/g).join('')
  } catch (e) {
    string = ''
  }
  // use 'string-mask' as 'mask'
  return new Mask(format, {}).apply(string)
}

/**
 * Export Our Function
 */
export default StringFormatValidation

const __validateArguments = (rules, val) => {
  let invokationError = null
  let invokationMsg = 'string-format-validation :: argument error - '

  const _rules = typeof rules
  const _val = typeof val

  if (_rules !== 'object') {
    invokationError = invokationMsg + 'first argument is not an object'
  } else if (_val !== 'object' && _val !== 'string' && _val !== 'number') {
    invokationError = invokationMsg + 'second argument must be string, number or object map that matches the rules map'
  }

  return invokationError === null ? false : invokationError
}
