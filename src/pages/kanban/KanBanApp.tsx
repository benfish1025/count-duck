import React from 'react'
import { Column } from "./Column"
import {AppContainer} from './styles'
import {AddNewItem} from "./AddNewItem";
import {useAppState} from './AppStateContext'
import { CustomDragLayer } from "./CustomDragLayer"

function KanBanApp() {
  const { state, dispatch } = useAppState()
  return (
      <AppContainer>
        {/*<Column text="To Do">
          <Card text="Generate app scaffold" />
        </Column>
        <Column text="In Progress">
          <Card text="Learn Typescript" />
        </Column>
        <Column text="Done">
          <Card text="Begin to use static typing" />
        </Column>*/}
        <CustomDragLayer />
        {state.lists.map((list,index) => {
          return (
              <Column id={list.id} text={list.text} key={list.id} index={index}/>
          )
        })}
        <AddNewItem toggleButtonText="+ Add another list" onAdd={text => dispatch({type:'ADD_LIST', payload: text})} />
      </AppContainer>
  )

}

export default KanBanApp;
