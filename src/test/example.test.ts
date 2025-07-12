import { test, expect, describe, vi, Mocked } from 'vitest'
import axios from 'axios'
import { testFn, request } from './utils'

test('test common matcher', () => {
  const name = 'lw'
  expect(name).toBe('lw')
  expect(2 + 2).toBe(4)
  expect(2 + 2).not.toBe(5)
})

test('test to be true or false', () => {
  expect(1).toBeTruthy()
  expect(0).toBeFalsy()
})

test('test number', () => {
  expect(1).toBeGreaterThan(0)
  expect(1).toBeLessThan(2)
  expect(1).toBeGreaterThanOrEqual(1)
  expect(1).toBeLessThanOrEqual(1)
})

test('test object', () => {
  // expect({ name: 'lw' }).toBe({ name: 'lw' })
  expect({ name: 'lw' }).toEqual({ name: 'lw' })
})

describe('functions', () => {
    test('create a mock function',() => {
        const callback = vi.fn()
        testFn(16, callback)
        expect(callback).toHaveBeenCalled()
        expect(callback).toHaveBeenCalledWith(16)
    })
})
