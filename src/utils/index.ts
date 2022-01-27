import global from 'global'
import { GRID, INDEX, NUMBERS } from 'typings'
import {
  checkGrid,
  identifyingSquare,
  isInCol,
  isInRow,
  isInSquare,
  getRandomIndex,
} from 'utils'

export { default as checkGrid } from './check-grid'
export { default as createFullGrid } from './create-full-grid'
export { default as getRandomIndex } from './get-random-index'
export { default as fillGrid } from './fill-grid'
export { default as identifyingSquare } from './identify-square'
export * from './is-in'
export { default as shuffle } from './shuffle'

export const copyGrid = (grid: GRID): GRID => {
  const gridCopy: GRID = [
    [0, 4, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 9, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 0, 0, 0],
    [0, 0, 2, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]

  for (let r: INDEX = 0; r < 9; r++) {
    for (let c: INDEX = 0; c < 9; c++) {
      gridCopy[r][c] = grid[r][c]
    }
  }

  return gridCopy
}

const numbers: NUMBERS[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]

/**
 * A backtrcking/recursive function to check all possible combinations of numbers until a solution is found
 * @param grid A 9x9 array consisting of values from 0 to 9
 */
export const solveGrid = (grid: GRID) => {
  let row = 0
  let col = 0

  for (let i = 0; i < 81; i++) {
    row = Math.floor(i / 9)
    col = i % 9

    if (grid[row][col] === 0) {
      for (let value of numbers) {
        if (!isInRow({ grid, row, value })) {
          if (!isInCol({ grid, col, value })) {
            const square = identifyingSquare({ grid, row, col })
            if (!isInSquare({ square, value })) {
              grid[row][col] = value
              if (checkGrid(grid)) {
                global.counter++
                break
              } else if (solveGrid(grid)) return true
            }
          }
        }
      }
      break
    }
  }

  grid[row][col] = 0
}

/**
 * Removes numbers from a full grid to create a Sudoku puzzle.
 * @param grid 9x9 Sudoku Grid
 * @param attempts number of attemps to solve (higher means more difficult) - default 5
 * @returns
 */
export const removeNumbers = (grid: GRID, attempts = 5): GRID => {
  while (attempts > 0) {
    let row = getRandomIndex()
    let col = getRandomIndex()

    while (grid[row][col] === 0) {
      row = getRandomIndex()
      col = getRandomIndex()
    }

    const backup = grid[row][col]
    grid[row][col] = 0

    const gridCopy = copyGrid(grid)

    global.counter = 0
    solveGrid(gridCopy)

    if (global.counter !== 1) {
      grid[row][col] = backup
      attempts--
    }
  }
  return grid
}

/**
 * Compares two arrays (of any dimensions) and returns true if they are equal, otherwise returns false
 * @param arr1 first array to be compared
 * @param arr2 second array to be compared
 */
export const compareArrays = (arr1: any[], arr2: any[]): boolean => {
  if (!Array.isArray(arr1) && !Array.isArray(arr2)) return arr1 === arr2

  if (arr1.length !== arr2.length) return false

  for (let i = 0, len = arr1.length; i < len; i++) {
    if (!compareArrays(arr1[i], arr2[i])) return false
  }

  return true
}
