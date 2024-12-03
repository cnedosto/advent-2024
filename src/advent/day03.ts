import { loadInput } from '../utils/inputLoader'
import { aggregateNumbers } from './day01'

const input = loadInput('../inputs/day03/input.txt')

export const extractValidMul = (input: string): string[] => {
  const regex = /(?:mul\((\d+),(\d+)\))+?/g
  const matches = input.match(regex)
  return matches || []
}

export const extractNumbers = (input: string[]): number[][] => {
  return input.map((str) => {
    const matches = str.match(/\d+/g)
    return matches ? [Number(matches[0]), Number(matches[1])] : []
  })
}

export const multiplyNumbers = (input: number[][]): number[] => input.map(([a, b]) => a * b)

export const extractInstructions = (input: string): string[] => {
  const regex = /mul\(\d+,\d+\)|do\(\)|don't\(\)/g
  const matches = input.match(regex)
  return matches || []
}

type Instructions = { type: 'mul'; value: [number, number] } | { type: 'do' } | { type: 'dont' }

export const parseInstructions = (instructions: string[]): Instructions[] => {
  return instructions.map((cmd) => {
    if (cmd.startsWith('mul(')) {
      const matches = cmd.match(/\d+/g)
      const [a, b] = matches ? [Number(matches[0]), Number(matches[1])] : [0, 0]
      return { type: 'mul', value: [a, b] } as Instructions
    } else if (cmd === 'do()') {
      return { type: 'do' } as Instructions
    } else if (cmd === "don't()") {
      return { type: 'dont' } as Instructions
    }
    return { type: 'dont' } as Instructions
  })
}

export const calculateSum = (instructions: Instructions[]): number => {
  let sum = 0
  let shouldDo = true

  for (const Instructions of instructions) {
    switch (Instructions.type) {
      case 'do':
        shouldDo = true
        break
      case 'dont':
        shouldDo = false
        break
      case 'mul':
        if (shouldDo && Instructions.value) {
          sum += Instructions.value[0] * Instructions.value[1]
        }
        break
    }
  }

  return sum
}

const validMuls = extractValidMul(input)
const extractedNumbers = extractNumbers(validMuls)
const multipliedNumbers = multiplyNumbers(extractedNumbers)
const answer = aggregateNumbers(multipliedNumbers)

const instructions = extractInstructions(input)
const parsedInstructions = parseInstructions(instructions)
const answer2 = calculateSum(parsedInstructions)

console.log('answer2 : ', answer2)

console.log('answer : ', answer)
