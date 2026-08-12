import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { IReducer, STATUS } from 'reducers'

interface IState {
  incorrectCount: number
  completed: boolean
  gameId: number
  status: STATUS
}

const messages: Record<STATUS, string> = {
  playing: '',
  incorrect: 'Incorrect option.',
  completed: 'Completed.',
}

const Timer = () => {
  const [timer, setTimer] = useState(0)

  const state = useSelector<IReducer, IState>(
    ({ incorrectCount, completed, gameId, status }) => ({
      incorrectCount,
      completed,
      gameId,
      status,
    })
  )

  // Reset the clock whenever a new game starts.
  useEffect(() => {
    setTimer(0)
  }, [state.gameId])

  // Run the clock while playing and stop once the board is completed.
  useEffect(() => {
    if (state.completed) return

    const interval = setInterval(() => {
      setTimer((timer) => timer + 1)
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [state.gameId, state.completed])

  return (
    <div>
      <p>Timer: {timer}</p>
      <p>Incorrect Count: {state.incorrectCount}</p>
      {messages[state.status] && (
        <p data-cy="status-message">{messages[state.status]}</p>
      )}
    </div>
  )
}

export default Timer
