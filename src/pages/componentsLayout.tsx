import React, {useEffect, useState, Suspense} from 'react'
import {ReactComponent as DuckSvg} from "./svg/duck.svg";
import {ReactComponent as HomeColorSvg} from "./svg/home-color.svg";
import {ReactComponent as HomeGraySvg} from "./svg/home-gray.svg";
import {ReactComponent as TagBookColorSvg} from "./svg/tagbook-color.svg";
import {ReactComponent as TagBookGraySvg} from "./svg/tagbook-gray.svg";
import {ReactComponent as StoreColorSvg} from "./svg/store-color.svg";
import {ReactComponent as StoreGraySvg} from "./svg/store-gray.svg";
import SwitchTransition from "react-transition-group/SwitchTransition";
import {
  Redirect,
  BrowserRouter as Router,
  Switch,
  NavLink,
  Link,
  Route
} from 'react-router-dom'
import ShowInput from "./Display/Home/showInput";
import Message from "../components/Message/message";
import Modal from "../components/Modal/modal";
import Sidebar from "./Display/sidebar";
import HomePage from "./Display/Home/home";
import ListPage from "./Display/list";
interface Iparams {
  floor: string
}

const ComponentsLayout = () => {
  return (
      <Router>
      <div className={'components-layout'}>

        <div className={'components-layout__content'}>

            <Route path={'/home'}>
              <HomePage/>
            </Route>
            <Route path={'/account'}>
              <ListPage/>
            </Route>
            <Route path={'/tags'}>
              <p>Tags：页面不存在</p>
            </Route>
            <Route exact={true} path={'/'}>
              <Redirect to={'/home'}/>
            </Route>


        </div>

        <div className="components-layout__sidebar">
          <Sidebar/>
        </div>
      </div>
      </Router>
  )
}

export default ComponentsLayout
