import { useCallback, useEffect, useState } from 'react'

export function useCountdown(duration = 60) {
  const [endTime, setEndTime] = useState<number | null>(null)
  const [secondsLeft, setSecondsLeft] = useState(0)

  useEffect(() => {
    if (endTime === null) return

    const tick = () => {
      const remaining = Math.max(0, Math.ceil((endTime - Date.now()) / 1000))
      setSecondsLeft(remaining)
      if (remaining === 0) setEndTime(null)
    }

    tick()
    const id = setInterval(tick, 250)
    return () => clearInterval(id)
  }, [endTime])

  const start = useCallback(() => setEndTime(Date.now() + duration * 1000), [duration])

  return { secondsLeft, isRunning: endTime !== null, start }
}
