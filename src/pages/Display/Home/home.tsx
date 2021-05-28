import React, {createContext, memo, useContext, useEffect, useRef, useState} from "react";
import Calendar from "./calendar";
import CardDisplay from "./card";
import Account from "./account";
import {useAppState, Action} from "../../AppStateContext";
import {formatDate, DateProps} from "../../utilities/createData";

interface HomePageProps {
  data: {day: string, value: number}[]
}
interface HomeContextProps {
  todayFormat: string
  current: any,
  onCalendarClick?: (day: any) => void,
  onResetToday: () => void,
  dispatch?: React.Dispatch<Action>
}
export const HomeContext = createContext<HomeContextProps>({onResetToday: () => null,todayFormat: '', current: ''})
const HomePage = () => {
  const {state, dispatch} = useAppState()
  const todayDate = new Date()
  const todayFormatString = formatDate(todayDate)
  const helpInitialCurrent = () => {
    const today = state.DateList.find( item => item.day === todayFormatString)
    if (!today) {
      return {
        date: todayDate,
        day: todayFormatString
      }
    } else {
      return today
    }
  }
  const [current, setCurrent] = useState<any>(helpInitialCurrent())
useEffect(() => {
  handleResetToday()
},[state])
  const handleCalendarClick = (day: any) => {
    setCurrent(day)
  }
  const handleResetToday = () => {
    setCurrent(helpInitialCurrent())
  }
  const context: HomeContextProps = {
    current: current,
    onCalendarClick: handleCalendarClick,
    todayFormat: todayFormatString,
    onResetToday: handleResetToday,
    dispatch: dispatch
  }
  return (
      <HomeContext.Provider value={context}>
        <div className={'home-wrapper'}>
          <Calendar data={state.DateList}/>
          <Account/>
        </div>
      </HomeContext.Provider>
  )
}

export default memo(HomePage)
