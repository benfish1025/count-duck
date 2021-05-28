import React from "react";
import {
  Link,
  useLocation
} from "react-router-dom";
import {ReactComponent as StoreGraySvg} from "../svg/store-gray.svg";
import {ReactComponent as HomeColorSvg} from "../svg/home-color.svg";
import {ReactComponent as TagBookGraySvg} from "../svg/tagbook-gray.svg";
import {ReactComponent as StoreColorSvg} from "../svg/store-color.svg";
import {ReactComponent as HomeGraySvg} from "../svg/home-gray.svg";
import {ReactComponent as TagBookColorSvg} from "../svg/tagbook-color.svg";

const Sidebar = () => {
  const {pathname} = useLocation()
  return (
      <ul className={'sidebar'}>

          <li className={'sidebar-item'}>
            <Link to={'/account'}>{
            pathname === '/account'
                ? <StoreColorSvg/>
                : <StoreGraySvg/>
          }</Link>
            </li>


          <li className={'sidebar-item'}>
            <Link to={'/home'}>{
            pathname === '/home'
            ? <HomeColorSvg/>
            : <HomeGraySvg/>
            }</Link></li>


        <li className={'sidebar-item'}><Link to={'tags'}>{
          pathname === '/tags'
              ? <TagBookColorSvg/>
              : <TagBookGraySvg/>
        }</Link></li>


      </ul>
  )
}

export default Sidebar
