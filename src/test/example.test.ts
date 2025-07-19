import { test, expect, describe, vi } from 'vitest'
import type { Mocked } from 'vitest'
import { testFn, request } from './utils'
import axios from 'axios'

vi.mock('axios')
const mockedAxios = axios as Mocked<typeof axios>

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
  test('create a mock function', () => {
    const callback = vi.fn()
    testFn(16, callback)
    expect(callback).toHaveBeenCalled()
    expect(callback).toHaveBeenCalledWith(16)
  })

  test('spy on method', () => {
    const obj = {
      getName: () => 'lw',
    }

    const spy = vi.spyOn(obj, 'getName')
    obj.getName()
    expect(spy).toHaveBeenCalled()
    obj.getName()
    expect(spy).toHaveBeenCalledTimes(2)
  })

  test('mock third party module', async () => {
    // mockedAxios.get.mockImplementation(() => Promise.resolve({ data: 123 }))
    mockedAxios.get.mockResolvedValue({ data: 123 }) // 上一行代码的简写形式
    const result = await request()
    expect(result).toBe(123)
  })
})
