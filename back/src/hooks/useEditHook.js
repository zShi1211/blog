import { useState, useCallback } from 'react'

export default (initValue) => {
  const [editValue, setEditValue] = useState(initValue)
  const editValueChange = useCallback(
    (val, a) => {
      setEditValue(val)
    },
    [],
  )
  return [editValue, editValueChange]
}
