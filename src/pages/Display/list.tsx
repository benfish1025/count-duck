import React from "react";
import Tabs from "../../components/Tabs/tabs";
import TabPane from "../../components/Tabs/tabPane";
import ListDisplay from "./listDisplay";
import {useAppState} from "../AppStateContext";

interface ListPageProps {
  data: any[]
}
const ListPage = () => {
  const {state, dispatch} = useAppState()
  return (
      <>
        <Tabs type={"card"} showBorder={true}>
          <TabPane tab={'账目概览'}>
            <ListDisplay listData={state.DateList}/>
          </TabPane>
          <TabPane tab={'支出分析'}>
            de
          </TabPane>
          <TabPane tab={'收入分析'}>
            de
          </TabPane>
        </Tabs>
      </>
  )
}

export default ListPage
