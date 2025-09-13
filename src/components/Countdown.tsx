import { useState } from 'react'
import useAnimationFrame from '@lib/browser/hooks/useAnimationFrame'
import clsx from 'clsx'

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
      <Unit number={days} unit="days" />, <Unit number={hours} unit="hours" />,{' '}
      <Unit number={minutes} unit="minutes" />,{' '}
      <Unit number={seconds} unit="seconds" fixedWidth />
    </time>
  )
}

interface UnitProps {
  number: number
  unit: string
  fixedWidth?: boolean
}

function Unit({ number, unit, fixedWidth = false }: UnitProps) {
  const numString = fixedWidth
    ? number.toString().padStart(2, '0')
    : number.toString()
  return (
    <span className="whitespace-nowrap">
      <span
        className={clsx('inline-block text-right', {
          'w-[1.5em]': fixedWidth,
        })}
      >
        {numString}
      </span>{' '}
      {unit}
    </span>
  )
}
