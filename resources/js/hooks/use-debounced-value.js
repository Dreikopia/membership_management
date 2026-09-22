import * as React from "react"

/**
 * Return `value` after it has stopped changing for `delay` milliseconds.
 *
 * Useful for delaying expensive work (such as an Inertia visit) until the
 * user has finished typing.
 */
export function useDebouncedValue(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = React.useState(value)

  React.useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay)

    return () => clearTimeout(timeout)
  }, [value, delay])

  return debouncedValue
}
