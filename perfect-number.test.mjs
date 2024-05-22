import {describe, it} from 'node:test'
import assert from 'node:assert'
import {isPerfectNumber} from './perfect-number.mjs'

describe('Perfect Number', () => {
  it('should return true for 6', () => {
    assert.equal(isPerfectNumber(6n), true);
  })
  it('should return false for 1', () => {
    assert.equal(isPerfectNumber(1n), false);
  })
})
