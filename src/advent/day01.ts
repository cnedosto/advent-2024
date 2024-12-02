import { loadInput } from '../utils/inputLoader'

const input = loadInput('../inputs/day01/input.txt')

export const separateLists = (input: string): number[][] => {
  const leftList: number[] = []
  const rightList: number[] = []

  input.split('\n').forEach((line) => {
    const [a, b] = line.trim().split(/\s+/).map(Number)
    leftList.push(a)
    rightList.push(b)
  })

  return [leftList, rightList]
}
export const calculateDelta = (leftList: number[], rightList: number[]): number[] => {
  return leftList.map((leftNumber, index) => {
    const rightNumber = rightList[index]
    return Math.abs(leftNumber - rightNumber)
  })
}

export const aggregateNumbers = (numberList: number[]): number =>
  numberList.reduce((sum, current) => sum + current, 0)

export const countDuplicates = (leftList: number[], rightList: number[]): number[] => {
  return leftList.map(
    (leftNumber) => rightList.filter((rightNumber) => rightNumber === leftNumber).length
  )
}

export const multiplyDuplicates = (leftList: number[], duplicatesList: number[]): number[] => {
  return leftList.map((number, index) => number * duplicatesList[index])
}

const lists = separateLists(input)
const sortedLeftList = lists[0].sort()
const sortedRightList = lists[1].sort()
const deltaList = calculateDelta(sortedLeftList, sortedRightList)
const duplicatesList = countDuplicates(lists[0], lists[1])
const multipliedList = multiplyDuplicates(lists[0], duplicatesList)

const answer = aggregateNumbers(deltaList)
const answer2 = aggregateNumbers(multipliedList)

console.log('answer : ', answer)
console.log('answer 2 : ', answer2)
