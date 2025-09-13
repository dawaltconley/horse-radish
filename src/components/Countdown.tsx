import { useState } from 'react'
import useAnimationFrame from '@lib/browser/hooks/useAnimationFrame'

export interface CountdownProps {
  date: Date
}

export default function CountDown({ date }: CountdownProps) {
  const [remaining, setRemaining] = useState(date.getTime() - Date.now())
  let days = Math.floor(remaining / 86400000)
  let hours = Math.floor((remaining % 86400000) / 3600000)
  let minutes = Math.floor((remaining % 3600000) / 60000)
  let seconds = Math.floor((remaining % 60000) / 1000)

  useAnimationFrame((delta) => {
    setRemaining((r) => r - delta)
  })

  return (
    <time dateTime={`${days}d ${hours}h ${minutes}m ${seconds}s`}>
      <span>{days} days, </span>
      <span>{hours} hours, </span>
      <span>{minutes} minutes, </span>
      <span>{seconds} seconds</span>
    </time>
  )
}
