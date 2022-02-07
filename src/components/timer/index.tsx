import { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'

import { IReducer } from 'reducers'

interface IState {
  incorrectCount: number
  completed: boolean
}

const Timer = () => {
  const [timer, setTimer] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout>()

  const state = useSelector<IReducer, IState>(
    ({ incorrectCount, completed }) => ({
      incorrectCount,
      completed,
    })
  )

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimer((timer) => timer + 1)
    }, 1000)

    return () => {
      clearInterval(intervalRef.current as NodeJS.Timeout)
    }
  }, [])

  useEffect(() => {
    if (state.completed) clearInterval(intervalRef.current as NodeJS.Timeout)
  }, [state.completed])

  return (
    <div>
      <p>Timer: {timer}</p>
      <p>Incorrect Count: {state.incorrectCount}</p>
    </div>
  )
}

export default Timer
