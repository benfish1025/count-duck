export function removeItemAtIndex<T>(array: T[], index: number) {
  return [...array.slice(0, index), ...array.slice(index + 1)]
}

export function insertItemAtIndex<T>(
    array: T[],
    item: T,
    index: number
) {
  return [...array.slice(0, index), item, ...array.slice(index)]
}

export function overrideItemAtIndex<T>(
    array: T[],
    newItem: T,
    targetIndex: number
) {
  return array.map((item, index) => {
    if (index !== targetIndex) {
      return item
    }

    return newItem
  })
}

type Item = {
  day: string
}

export const findItemIndexByDay = <T extends Item>(items: T[], day: string) => {
  return items.findIndex((item: T) => item.day === day)
}

type Money = {
  id: string
}
export const deleteDateByDay = <T extends Item>(Array: T[], day: string) => {
  return Array.filter((item, index) => {
    return item.day !== day
  })
}

export const deleteMoneyById = <T extends Money>(Array: T[], id: string) => {
  return Array.filter((item, index) => {
    return item.id !== id
  })
}
export const findMoneyIndexById = <T extends Money>(items: T[], id: string) => {
  return items.findIndex((item: T) => item.id === id)
}

export const moveItem = <T>(array: T[], from: number, to: number) => {
  const item = array[from]
  return insertItemAtIndex(removeItemAtIndex(array, from), item, to)
}
