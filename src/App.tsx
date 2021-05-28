import React, {useContext, useEffect} from 'react';
import HomeLayout from './pages/componentsLayout'
import creatData from "./pages/utilities/createData";
import {AppStateProvider} from "./pages/AppStateContext";

function App() {
  // useEffect(() => {
  //   // @ts-ignore
  //   window.addEventListener('load', function() {
  //     // @ts-ignore
  //     new FastClick(document.body);
  //   }, false);
  // }, [])
const data = creatData()
  return (
      <AppStateProvider initialState={{DateList: data}}>
      <div className="App">
          <HomeLayout/>
      </div>
      </AppStateProvider>
  )
}

export default App;
