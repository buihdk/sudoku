import { BLOCK_COORDS, GRID } from 'typings'

export type STATUS = 'playing' | 'incorrect' | 'completed'

export interface IReducer {
  challengeGrid?: GRID
  selectedBlock?: BLOCK_COORDS
  solvedGrid?: GRID
  workingGrid?: GRID
  incorrectCount: number
  completed: boolean
  status: STATUS
  gameId: number
}
