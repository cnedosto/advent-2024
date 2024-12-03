import { expect, test } from 'vitest'
import { aggregateNumbers } from '../advent/day01'
import {
  calculateSum,
  extractInstructions,
  extractNumbers,
  extractValidMul,
  multiplyNumbers,
  parseInstructions
} from '../advent/day03'
import { loadInput } from '../utils/inputLoader'

const inputs = loadInput('../inputs/day03/example.txt')
const inputs2 = loadInput('../inputs/day03/example2.txt')

test('It should extract valid muls', () => {
  const expectedArray = ['mul(2,4)', 'mul(5,5)', 'mul(11,8)', 'mul(8,5)']

  expect(extractValidMul(inputs)).toEqual(expectedArray)
})

test('It should extract the numbers from the string', () => {
  const input = ['mul(2,4)', 'mul(5,5)', 'mul(11,8)', 'mul(8,5)']
  const output = [
    [2, 4],
    [5, 5],
    [11, 8],
    [8, 5]
  ]

  expect(extractNumbers(input)).toEqual(output)
})

test('It should multiply the numbers in arrays', () => {
  const input = [
    [2, 4],
    [5, 5],
    [11, 8],
    [8, 5]
  ]
  const output = [8, 25, 88, 40]
  expect(multiplyNumbers(input)).toEqual(output)
})

test('It should aggregate all numbers to get the answer', () => {
  const input = [8, 25, 88, 40]
  const output = 161
  expect(aggregateNumbers(input)).toBe(output)
})

test('It should extract the muls and the instructions', () => {
  const expectedArray = ['mul(2,4)', "don't()", 'mul(5,5)', 'mul(11,8)', 'do()', 'mul(8,5)']

  expect(extractInstructions(inputs2)).toEqual(expectedArray)
})

test('It should create a structure with instructions', () => {
  const extractedInstructions = extractInstructions(inputs2)
  const expectedParsedInstructions = [
    { type: 'mul', value: [2, 4] },
    { type: 'dont' },
    { type: 'mul', value: [5, 5] },
    { type: 'mul', value: [11, 8] },
    { type: 'do' },
    { type: 'mul', value: [8, 5] }
  ]

  expect(parseInstructions(extractedInstructions)).toEqual(expectedParsedInstructions)
})

test('It should calculate the sum of mul instructions respecting do and dont commands', () => {
  const extractedInstructions = extractInstructions(inputs2)
  const parsedInstructions = parseInstructions(extractedInstructions)
  const expectedAnswer = 48

  expect(calculateSum(parsedInstructions)).toBe(expectedAnswer)
})
