'use strict'

var assert = require('assert')

const SFV = require('../dist/bundle.js')

/* global describe, it */

describe('Validate.test.js - Validate inputs', function () {
  it('should validate an email address', function () {
    assert.ok(SFV.validate({type: 'email'}, 'coryrobinson42@gmail.com'))
  })
  it('should invalidate a bad email address', function () {
    assert.ok(!SFV.validate({type: 'email'}, 'coryrobinson42gmail.com'))
  })
  it('should validate a credit card number', function () {
    assert.ok(SFV.validate({type: 'creditcard'}, '4715109622057237'))
  })
  it('should invalidate a credit card number', function () {
    assert.ok(!SFV.validate({type: 'creditcard'}, '4715109622057'))
  })
  it('should validate a date 00/00/000', function () {
    assert.ok(SFV.validate({type: 'date'}, '01/02/2017'))
  })
  it('should validate a date 00-00-00', function () {
    assert.ok(SFV.validate({type: 'date'}, '01-02-17'))
  })
  it('should validate a date with time 00-00-00 HH:MM', function () {
    assert.ok(SFV.validate({type: 'date'}, '01-02-17 17:50'))
  })
  it('should validate a phone number string (916) 616-3600', function () {
    assert.ok(SFV.validate({type: 'phone'}, '(916) 616-3600'))
  })
  it('should invalidate a phone number string (916) 616-36', function () {
    assert.ok(!SFV.validate({type: 'phone'}, '(916) 616-36'))
  })
  it('should validate a Number string 1234', function () {
    assert.ok(SFV.validate({type: 'number'}, 1234))
  })
  it('should invalidate a Number string 1234aB1234', function () {
    assert.ok(!SFV.validate({type: 'number'}, '1234aB1234'))
  })
})
