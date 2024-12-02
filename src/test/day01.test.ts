import { expect, test } from 'vitest'
import {
  aggregateNumbers,
  calculateDelta,
  countDuplicates,
  multiplyDuplicates,
  separateLists
} from '../advent/day01'
import { loadInput } from '../utils/inputLoader'
const inputs = loadInput('../inputs/day01/example.txt')

test('It should separate the numbers in two lists', () => {
  const leftList: number[] = [3, 4, 2, 1, 3, 3]
  const rightList: number[] = [4, 3, 5, 3, 9, 3]

  expect(separateLists(inputs)).toEqual([leftList, rightList])
})

test('The list must be sorted numerically', () => {
  const leftList = separateLists(inputs)[0]
  const rightList = separateLists(inputs)[1]
  const sortedLeftList: number[] = [1, 2, 3, 3, 3, 4]
  const sortedRightList: number[] = [3, 3, 3, 4, 5, 9]

  expect(leftList.sort()).toEqual(sortedLeftList)
  expect(rightList.sort()).toEqual(sortedRightList)
})

test('It should calculate the delta for each line', () => {
  const sortedLeftList = separateLists(inputs)[0].sort()
  const sortedRightList = separateLists(inputs)[1].sort()
  const deltaList = [2, 1, 0, 1, 2, 5]

  expect(calculateDelta(sortedLeftList, sortedRightList)).toEqual(deltaList)
})

test('It should aggregate all delta numbers', () => {
  const sortedLeftList = separateLists(inputs)[0].sort()
  const sortedRightList = separateLists(inputs)[1].sort()
  const deltaList = calculateDelta(sortedLeftList, sortedRightList)

  expect(aggregateNumbers(deltaList)).toEqual(11)
})

test('It should count the number of time the number of the left list is present in the right list', () => {
  const leftList = separateLists(inputs)[0]
  const rightList = separateLists(inputs)[1]
  const duplicateCountList = [3, 1, 0, 0, 3, 3]

  expect(countDuplicates(leftList, rightList)).toEqual(duplicateCountList)
})

test('It should return a list of multiplied numbers by their duplicates', () => {
  const leftList = separateLists(inputs)[0]
  const rightList = separateLists(inputs)[1]
  const duplicatesList = countDuplicates(leftList, rightList)
  const multipliedList = [9, 4, 0, 0, 9, 9]

  expect(multiplyDuplicates(leftList, duplicatesList)).toEqual(multipliedList)
})
