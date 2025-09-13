import { useEffect, useRef } from 'react'

export default function useAnimationFrame(
  callback: (deltaTime: number) => void,
): void {
  const requestRef = useRef<number>()
  const lastFrame = useRef<number>()

  const animate = (time: DOMHighResTimeStamp): void => {
    if (lastFrame.current !== undefined) {
      const delta = time - lastFrame.current
      callback(delta)
    }
    lastFrame.current = time
    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current !== undefined) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [])
}
