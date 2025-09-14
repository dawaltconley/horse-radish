import { useState, type JSX } from 'react'
import useAnimationFrame from '@lib/browser/hooks/useAnimationFrame'
import clsx from 'clsx'

export interface CountdownProps {
  date: Date
  displayWhenFinished?: JSX.Element
  children?: JSX.Element
}

export default function CountDown({
  date,
  displayWhenFinished: displayWhenFinished1,
  children: displayWhenFinished2,
}: CountdownProps) {
  const [remaining, setRemaining] = useState(
    Math.max(0, date.getTime() - Date.now()),
  )
  let days = Math.floor(remaining / 86400000)
  let hours = Math.floor((remaining % 86400000) / 3600000)
  let minutes = Math.floor((remaining % 3600000) / 60000)
  let seconds = Math.floor((remaining % 60000) / 1000)

  useAnimationFrame((delta) => {
    setRemaining((r) => Math.max(0, r - delta))
  })

  if (remaining <= 0) {
    return displayWhenFinished1 || displayWhenFinished2 || null
  }

  return (
    <time dateTime={`${days}d ${hours}h ${minutes}m ${seconds}s`}>
      {days > 0 && (
        <>
          <Unit number={days} unit="days" />,{' '}
        </>
      )}
      {(days > 0 || hours > 0) && (
        <>
          <Unit number={hours} unit="hours" />,{' '}
        </>
      )}
      {(days > 0 || hours > 0 || minutes > 0) && (
        <>
          <Unit number={minutes} unit="minutes" />,{' '}
        </>
      )}
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
