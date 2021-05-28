import {nanoid} from "nanoid";

export interface MoneyOutProps {
  value: number,
  tag: string,
  id: string
}

export interface DateProps {
  date: Date,
  day: string,
  value: number,
  inValue: number,
  moneyIn: MoneyOutProps[],
  moneyOut: MoneyOutProps[]
}

export const createRandom = (max: number, min: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
export const creatDate = () => {
  return new Date(2021, createRandom(4,0), createRandom(29, 1))
}
export const formatDate = (date: Date) => {
  return date.toLocaleDateString('zh-CN', {
    month: '2-digit',
    year: 'numeric',
    day: '2-digit'
  }).replaceAll('/','-')
}
export const creatMoneyOut = () => {
  const tags = ['吃饭', '娱乐', '衣服', '日用品', '投资', '个人成长']
  return [...Array(createRandom(7,2))].map(() => {
    return {
      tag: tags[createRandom(5,0)],
      value: createRandom(10, 105),
      id: nanoid()
    }
  })
}
export const creatMoneyIn = (formatDate: string) => {
  const tags = ['工资', '副业', '投资']
  return [...Array(createRandom(2,1))].map(() => {
    return {
      tag: tags[createRandom(2,0)],
      value: formatDate.includes('9') ? 3000 : 10,
      id: nanoid()
    }
  })
}
const calculateTotal = (values: {value: number}[]) => {
  return values.map(item => item.value).reduce((a,b) => a + b)
}
const creatData = () => {
  return [...Array(60)].map((item, index) => {
    const currentDate = creatDate()
    const date = formatDate(currentDate)
    const moneyIn = creatMoneyIn(date)
    const moneyOut = creatMoneyOut()
    const value = calculateTotal(moneyOut)
    const inValue = calculateTotal(moneyIn)
    return {
      date: currentDate,
      day: date,
      value: value,
      moneyIn: moneyIn,
      moneyOut: moneyOut,
      inValue: inValue
    } as DateProps
  })
}

export default creatData
