import reducer from './reducer'
import { IReducer } from './interfaces'
import { createGrid, fillBlock, selectBlock } from './actions'
import { GRID } from 'typings'

const solved: GRID = [
  [8, 4, 2, 6, 5, 1, 3, 9, 7],
  [5, 3, 7, 2, 8, 9, 6, 4, 1],
  [6, 9, 1, 7, 3, 4, 5, 2, 8],
  [1, 6, 3, 8, 4, 5, 9, 7, 2],
  [7, 5, 8, 1, 9, 2, 4, 6, 3],
  [9, 2, 4, 3, 7, 6, 1, 8, 5],
  [4, 7, 6, 5, 1, 8, 2, 3, 9],
  [2, 8, 5, 9, 6, 3, 7, 1, 4],
  [3, 1, 9, 3, 1, 7, 8, 5, 6],
]

const emptyLastCell = (): GRID =>
  solved.map((row, r) =>
    row.map((v, c) => (r === 8 && c === 8 ? 0 : v))
  ) as GRID

const playingState = (): IReducer => ({
  solvedGrid: solved.map((row) => [...row]) as GRID,
  workingGrid: emptyLastCell(),
  incorrectCount: 0,
  completed: false,
  status: 'playing',
  gameId: 1,
})

describe('reducer CREATE_GRID', () => {
  it('resets completed, incorrectCount, status and selection on a new game', () => {
    const won: IReducer = {
      solvedGrid: solved,
      workingGrid: solved,
      incorrectCount: 4,
      completed: true,
      status: 'completed',
      selectedBlock: [3, 3],
      gameId: 2,
    }

    const next = reducer(won, createGrid())

    expect(next.completed).toBe(false)
    expect(next.incorrectCount).toBe(0)
    expect(next.status).toBe('playing')
    expect(next.selectedBlock).toBeUndefined()
    expect(next.gameId).toBe(3)
  })
})

describe('reducer FILL_BLOCK', () => {
  it('does not mutate the previous working grid', () => {
    const state = playingState()
    const before = state.workingGrid

    reducer(state, fillBlock(6, [8, 8]))

    expect(before && before[8][8]).toBe(0)
  })

  it('marks the board completed on the last correct move', () => {
    const next = reducer(playingState(), fillBlock(6, [8, 8]))

    expect(next.completed).toBe(true)
    expect(next.status).toBe('completed')
  })

  it('increments incorrectCount on a wrong value without mutating the grid', () => {
    const state = playingState()

    const next = reducer(state, fillBlock(9, [8, 8]))

    expect(next.incorrectCount).toBe(1)
    expect(next.status).toBe('incorrect')
    expect(next.workingGrid && next.workingGrid[8][8]).toBe(0)
  })

  it('ignores fills on an already filled cell', () => {
    const state = playingState()

    const next = reducer(state, fillBlock(1, [0, 0]))

    expect(next).toBe(state)
  })

  it('ignores fills after the board is completed', () => {
    const state: IReducer = { ...playingState(), completed: true }

    const next = reducer(state, fillBlock(6, [8, 8]))

    expect(next).toBe(state)
  })
})

describe('reducer SELECT_BLOCK', () => {
  it('stores the selected block coords', () => {
    const next = reducer(playingState(), selectBlock([2, 5]))

    expect(next.selectedBlock).toEqual([2, 5])
  })
})
