import React, {useContext, useEffect, useRef} from "react";
import { ResponsiveCalendar, CalendarLegend } from '@nivo/calendar'
import BScroll from '@better-scroll/core'
import {HomeContext} from "./home";

interface CalendarProps {
  data: {day: string, value: number}[]
}
const Calendar = ({data}: CalendarProps) => {
  const context = useContext(HomeContext)
  const handleClick  = (day: any, e: React.MouseEvent) => {
    if (context.onCalendarClick) {
      if (day.data) {
        context.onCalendarClick(day.data)
      } else {
        context.onCalendarClick(day)
      }

    }
  }

  useEffect(() => {
    let wrapper = document.querySelector('.calendar-viewport')
    // @ts-ignore
    let scroll = new BScroll(wrapper, {
      scrollX: true,
      click: true,
      scrollY: false,
    })
  }, [])
  return (
      <div className="calendar-viewport">
        <div className={'calendar-wrapper'}>
          <ResponsiveCalendar
              data={data}
              from="2021-01-01"
              to="2021-5-01"
              emptyColor="#eeeeee"
              colors={[ '#d7ffb8', '#a5ed6e', '#58cc02', '#ff4b4b' ]}
              margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
              yearSpacing={40}
              monthBorderColor="#ffffff"
              dayBorderWidth={2}
              dayBorderColor="#ffffff"
              isInteractive={true}
              onClick={handleClick}
              legends={[
                {
                  anchor: 'bottom-right',
                  direction: 'row',
                  translateY: 36,
                  itemCount: 4,
                  itemWidth: 42,
                  itemHeight: 36,
                  itemsSpacing: 14,
                  itemDirection: 'right-to-left'
                } as CalendarLegend
              ]}
          /></div>
      </div>
  )
}

export default Calendar
