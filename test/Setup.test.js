'use strict'

var assert = require('assert')

const SFV = require('../dist/bundle.js')

/* global describe, it */

describe('Setup.test.js - Setup, Instantiation, & Invokation', function () {
  it('should return an Error if invoked without any args', function () {
    assert.throws(
      () => { SFV() },
      (err) => { return err instanceof Error },
      'unexpected error'
    )
  })

  it('should return an Error if invoked without wrong args', function () {
    assert.throws(
      () => { SFV('', {}) },
      (err) => { return err instanceof Error },
      'unexpected error'
    )
  })

  it('should return `true` when invoked without rules and empty string', function () {
    assert.ok(SFV({}, ''))
  })
})
