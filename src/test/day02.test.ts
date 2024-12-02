import { expect, test } from 'vitest'
import {
  calculateDelta,
  canBeSafed,
  countSafeLines,
  hasInvalidDeltas,
  isDecreasing,
  isIncreasing,
  isSafe,
  parseList
} from '../advent/day02'
import { loadInput } from '../utils/inputLoader'

const inputs = loadInput('../inputs/day02/example.txt')
const numbersList = [
  [7, 6, 4, 2, 1],
  [1, 2, 7, 8, 9],
  [9, 7, 6, 2, 1],
  [1, 3, 2, 4, 5],
  [8, 6, 4, 4, 1],
  [1, 3, 6, 7, 9]
]
const firstLine = [7, 6, 4, 2, 1]
const secondLine = [1, 2, 7, 8, 9]
const thirdLine = [8, 6, 4, 4, 1]
const fourthLine = [1, 3, 2, 4, 5]

test('It should split the inputs in arrays of numbers', () => {
  expect(parseList(inputs)).toEqual(numbersList)
})

test('It should check if the line has increased numbers', () => {
  expect(isIncreasing(firstLine)).toBe(false)
  expect(isIncreasing(secondLine)).toBe(true)
  expect(isIncreasing(thirdLine)).toBe(false)
  expect(isIncreasing(fourthLine)).toBe(false)
})

test('It should check if the line has decreased numbers', () => {
  expect(isDecreasing(firstLine)).toBe(true)
  expect(isDecreasing(secondLine)).toBe(false)
  expect(isDecreasing(thirdLine)).toBe(false)
  expect(isDecreasing(fourthLine)).toBe(false)
})

test('It should calculate the delta between two numbers', () => {
  expect(calculateDelta(firstLine)).toEqual([1, 2, 2, 1])
  expect(calculateDelta(secondLine)).toEqual([1, 5, 1, 1])
  expect(calculateDelta(thirdLine)).toEqual([2, 2, 0, 3])
})

test('It should check if the delta is valid or not', () => {
  expect(hasInvalidDeltas(calculateDelta(firstLine))).toBe(false)
  expect(hasInvalidDeltas(calculateDelta(secondLine))).toBe(true)
  expect(hasInvalidDeltas(calculateDelta(thirdLine))).toBe(true)
})

test('It should check if a line is safe or not', () => {
  expect(isSafe(firstLine)).toBe(true)
  expect(isSafe(secondLine)).toBe(false)
  expect(isSafe(thirdLine)).toBe(false)
})

test('It should check if a line is safe after removing one element', () => {
  expect(isSafe(thirdLine, 2)).toBe(true)
  expect(isSafe(fourthLine, 1)).toBe(true)
})

test('It should check if a line can be made safe by removing one element', () => {
  expect(canBeSafed(secondLine)).toBe(false)
  expect(canBeSafed(thirdLine)).toBe(true)
  expect(canBeSafed(fourthLine)).toBe(true)
})

test('It should count the number of safe lines', () => {
  expect(countSafeLines(numbersList)).toBe(2)
})
