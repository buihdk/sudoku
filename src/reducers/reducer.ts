import { AnyAction } from 'redux'

import { compareArrays, copyGrid, createFullGrid, removeNumbers } from 'utils'

import { IReducer } from './interfaces'
import * as types from './types'

const initialState: IReducer = {
  incorrectCount: 0,
  completed: false,
  status: 'playing',
  gameId: 0,
}

const reducer = (state = initialState, action: AnyAction): IReducer => {
  switch (action.type) {
    case types.CREATE_GRID:
      const solvedGrid = createFullGrid()
      const gridCopy = copyGrid(solvedGrid)
      const challengeGrid = removeNumbers(gridCopy)
      const workingGrid = copyGrid(challengeGrid)
      return {
        ...state,
        challengeGrid,
        solvedGrid,
        workingGrid,
        selectedBlock: undefined,
        incorrectCount: 0,
        completed: false,
        status: 'playing',
        gameId: state.gameId + 1,
      }

    case types.FILL_BLOCK:
      if (state.workingGrid && state.solvedGrid && !state.completed) {
        const [row, col] = action.coords

        if (state.workingGrid[row][col] !== 0) return state

        if (state.solvedGrid[row][col] !== action.value) {
          return {
            ...state,
            incorrectCount: state.incorrectCount + 1,
            status: 'incorrect',
          }
        }

        const nextGrid = copyGrid(state.workingGrid)
        nextGrid[row][col] = action.value

        if (compareArrays(nextGrid, state.solvedGrid)) {
          return {
            ...state,
            workingGrid: nextGrid,
            completed: true,
            status: 'completed',
          }
        }

        return { ...state, workingGrid: nextGrid, status: 'playing' }
      }
      return state

    case types.SELECT_BLOCK:
      return { ...state, selectedBlock: action.coords }

    default:
      return state
  }
}

export default reducer
