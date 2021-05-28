import React, {useEffect} from "react";
import styled from "styled-components";
import BScroll from '@better-scroll/core'
const Wrapper = styled.div`
  padding-bottom: 8px;
  background-color: #ffffff;
`
const Tittle = styled.div`
  height: 50px;
  background-color: #fff5d3;
`
interface ListItemProps {
  data?: any

}
const ListItem = ({data}: ListItemProps) => {
  return (
      <Wrapper>
        <Tittle>{data.day.replace('-','年').replace('-', '月').concat('日')}</Tittle>
        {data.value}
      </Wrapper>
  )
}
interface ListDisplayProps {
  listData: any[]
}
const ListDisplay = ({listData}: ListDisplayProps) => {
  useEffect(() => {
    let wrapper = document.querySelector('.b-tabs-pane__container')
    // @ts-ignore
    let scroll = new BScroll(wrapper, {
      scrollY: true,
      click: true,
      scrollX: false,
    })
  }, [])
  return (
      <div className={'b-list-display'}>
        {listData.map((item, index) => {
          return <ListItem data={item} key={index}/>
        })}
      </div>
  )
}

export default ListDisplay
