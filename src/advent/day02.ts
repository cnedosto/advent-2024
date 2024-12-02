import { loadInput } from '../utils/inputLoader'

const input = loadInput('../inputs/day02/input.txt')

export const parseList = (input: string): number[][] => {
  const lines: number[][] = []
  input.split('\n').forEach((line) => {
    const splitLine = line.trim().split(/\s+/).map(Number)
    lines.push(splitLine)
  })
  return lines
}

export const isIncreasing = (line: number[]): boolean =>
  line.every((currentValue, index) => {
    if (index === 0) return true
    return line[index - 1] < currentValue
  })

export const isDecreasing = (line: number[]): boolean =>
  line.every((currentValue, index) => {
    if (index === 0) return true
    return line[index - 1] > currentValue
  })

export const calculateDelta = (line: number[]): number[] =>
  line.slice(0, -1).map((num, index) => Math.abs(line[index + 1] - num))

export const hasInvalidDeltas = (deltas: number[]): boolean =>
  deltas.some((delta) => delta === 0 || delta > 3)

export const isSafe = (line: number[], skipIndex?: number): boolean => {
  const checkLine = skipIndex !== undefined ? line.filter((_, index) => index !== skipIndex) : line

  const deltas = calculateDelta(checkLine)
  return (isIncreasing(checkLine) || isDecreasing(checkLine)) && !hasInvalidDeltas(deltas)
}

export const countSafeLines = (input: number[][]): number => input.filter(isSafe).length

export const countSafeLinesWithNewLogic = (input: number[][]): number => {
  return input.filter((line) => isSafeWithNewLogic(line)).length
}

export const canBeSafed = (line: number[]): boolean => {
  return line.some((_, index) => isSafe(line, index))
}

export const isSafeWithNewLogic = (line: number[]): boolean => {
  return isSafe(line) || canBeSafed(line)
}

const parsedInput = parseList(input)
const answer = countSafeLines(parsedInput)
const answer2 = countSafeLinesWithNewLogic(parsedInput)

console.log('answer : ', answer)
console.log('answer2 : ', answer2)
