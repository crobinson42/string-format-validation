var assert = require('assert')

const SFV = require('../dist/bundle.js')

/* global describe, it */

describe('Format.test.js - Formatting strings', function () {
  it('should format a phone number with Number inputs', function () {
    assert.equal(SFV.format('(###)###-####', '9166163600'), '(916)616-3600')
  })

  it('should format a phone number with mixed character "()-asdf.,[]" inputs', function () {
    assert.equal(SFV.format('(###)###-####', '(916)6[16-360,0.'), '(916)616-3600')
  })

  it('should format a date with the given format', function () {
    assert.equal(SFV.format('00/00/0000', '01022017'), '01/02/2017')
  })

})
