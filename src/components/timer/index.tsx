import { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'

import { IReducer } from 'reducers'

interface IState {
  incorrectCount: number
}

const Timer = () => {
  const [timer, setTimer] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimer((timer) => timer + 1)
    }, 1000)

    return () => {
      clearInterval(intervalRef.current as NodeJS.Timeout)
    }
  }, [])

  const state = useSelector<IReducer, IState>(({ incorrectCount }) => ({
    incorrectCount,
  }))

  return (
    <div>
      <p>Timer: {timer}</p>
      <p>Incorrect Count: {state.incorrectCount}</p>
    </div>
  )
}

export default Timer
