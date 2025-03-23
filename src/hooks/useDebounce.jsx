import { useEffect, useRef, useState } from 'react'

export function useDebounce (value, delay = 600) {
  const [debounceValue, setDebounceValue] = useState(value)
  const timeoutRef = useRef(null)

  useEffect(() => {
    clearTimeout(timeoutRef.current)

    timeoutRef.current = setTimeout(() => {
      setDebounceValue(value)
    }, delay)

    return () => clearTimeout(timeoutRef.current)
  }, [value, delay])

  return debounceValue
}