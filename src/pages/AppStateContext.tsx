import React, {createContext, useContext, useReducer} from 'react'
import {
  findItemIndexByDay,
  insertItemAtIndex,
  moveItem,
  overrideItemAtIndex,
  findMoneyIndexById,
    deleteDateByDay,
  deleteMoneyById,
  removeItemAtIndex
} from './utilities/arrayHelper'

import { DateProps, MoneyOutProps, formatDate} from './utilities/createData'
import {nanoid} from "nanoid";

export interface AppStateProps {
  DateList: DateProps[]
}

export type Action =
  | {
  type: 'ADD_DATE_MONEY_IN',
  payload: {
    tag: string,
    value: number
  }
}
  | {
  type: 'ADD_DATE_MONEY_OUT',
  payload: {
    tag: string,
    value: number
  }
}
  | {
  type:'ADD_MONEY_IN',
  payload: {
    day: string,
    tag: string,
    value: number
  }
}
  | {
  type:'ADD_MONEY_OUT',
  payload: {
    day: string,
    tag: string,
    value: number
  }
}
  | {
  type: 'EDIT_DATE_DATA',
  payload: {
    day: string,
    type: 'moneyIn' | 'moneyOut',
    id: string,
    value: number,
    tag: string
  }
}
  | {
  type: 'DELETE_DATE',
  payload: {
    day: string
  }
}
  | {
  type:'DELETE_MONEY',
  payload: {
    day: string,
    type: 'moneyIn' | 'moneyOut',
    id: string,
    value: number
  }
}
interface AppStateContextProps {
  state: AppStateProps,
  dispatch: React.Dispatch<Action>
}

/*----------------------------------------------*/

const AppStateContext = createContext<AppStateContextProps>( {} as AppStateContextProps)

const appStateReducer = (state: AppStateProps, action: Action): AppStateProps => {
  switch (action.type) {
    case 'ADD_DATE_MONEY_IN': {
      const date = new Date()
      return {...state, DateList: [...state.DateList, {
          date: date,
          day: formatDate(date),
          value: 0,
          inValue: action.payload.value,
          moneyOut: [] as MoneyOutProps[],
          moneyIn: [{
            id: nanoid(),
              ...action.payload
          }]
        }]}
    }

    case 'ADD_DATE_MONEY_OUT': {
      const date = new Date()
      return {...state, DateList: [...state.DateList, {
          date: date,
          day: formatDate(date),
          value: action.payload.value,
          inValue: 0,
          moneyIn: [] as MoneyOutProps[],
          moneyOut: [{
            id: nanoid(),
            ...action.payload
          }]
        }]}
    }

    case 'ADD_MONEY_IN': {
      const targetDateIndex = findItemIndexByDay(state.DateList, action.payload.day)
      const targetDate = state.DateList[targetDateIndex]
      const updatedTargetDate = {
          ...targetDate,inValue: targetDate.inValue + action.payload.value, moneyIn: [
            ...targetDate.moneyIn,
          {
            id: nanoid(),
            tag: action.payload.tag,
            value:action.payload.value
          }
        ]
      }

      return {
          ...state,
        DateList: overrideItemAtIndex(state.DateList, updatedTargetDate, targetDateIndex)
      }
    }

    case 'ADD_MONEY_OUT': {
      const targetDateIndex = findItemIndexByDay(state.DateList, action.payload.day)
      const targetDate = state.DateList[targetDateIndex]
      const updatedTargetDate = {
        ...targetDate,value: targetDate.value + action.payload.value, moneyIn: [
          ...targetDate.moneyOut,
          {
            id: nanoid(),
            tag: action.payload.tag,
            value:action.payload.value
          }
        ]
      }

      return {
        ...state,
        DateList: overrideItemAtIndex(state.DateList, updatedTargetDate, targetDateIndex)
      }
    }

    case 'EDIT_DATE_DATA': {
      const targetDateIndex = findItemIndexByDay(state.DateList, action.payload.day)
      const targetDate = state.DateList[targetDateIndex]
      const targetMoneyList = targetDate[action.payload.type]
      const targetMoneyIndex = findMoneyIndexById(targetMoneyList,action.payload.id)
      const targetMoney = targetMoneyList[targetMoneyIndex]
      const updatedTargetMoney = {
          ...targetMoney,
          value: action.payload.value,
          tag:action.payload.tag
      }
      const anchor = action.payload.type === 'moneyIn' ? 'inValue' : 'value'
      const updatedDate = {
          ...targetDate,
        [anchor]: targetDate[anchor] - targetMoney.value + action.payload.value,
        [action.payload.type]: overrideItemAtIndex(targetMoneyList, updatedTargetMoney,targetMoneyIndex)
      }
      return {
          ...state,
        DateList: overrideItemAtIndex(state.DateList, updatedDate, targetDateIndex)
      }
    }

    case 'DELETE_DATE': {
      return {
          ...state,
        DateList: deleteDateByDay(state.DateList, action.payload.day)
      }
    }

    case 'DELETE_MONEY': {
      const targetDateIndex = findItemIndexByDay(state.DateList, action.payload.day)
      const targetDate = state.DateList[targetDateIndex]
      const anchor = action.payload.type === 'moneyIn' ? 'inValue' : 'value'

      const updatedDate = {
          ...targetDate,
        [anchor]: targetDate[anchor] -  action.payload.value,
        [action.payload.type]: deleteMoneyById(targetDate[action.payload.type], action.payload.id)
      }

      return {
          ...state,
        DateList: overrideItemAtIndex(state.DateList, updatedDate, targetDateIndex)
      }
    }

    default: {
      return state
    }
  }
}

/*-------------------------------------------------------*/


interface AppStateProviderProps  {
  initialState: AppStateProps
}
export const AppStateProvider: React.FC<AppStateProviderProps> = ({children, initialState}) => {
  const [state, dispatch] = useReducer(appStateReducer, initialState)

  return <AppStateContext.Provider value={{state, dispatch}}>
    {children}
  </AppStateContext.Provider>
}


export const useAppState = () => {
  return useContext(AppStateContext)
}

