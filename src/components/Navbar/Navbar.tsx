
import "./Navbar.css"
import {
  NavLink,
  withRouter
} from "react-router-dom";

import Actionbutton from "../ActionButton/Actionbutton"

const currentTab = (history:any, path:string) => {
  if (history.location.pathname === path) {
    return true;
  } else {
    return false;
  }
};
const Navbar = (props:any) => {
  return (
    <>

    <nav className="navbar">
      <h2 className="brand">
        <span className="brand_span">Hacker</span>News
      </h2>
    </nav>

    <div className="container">
     <div className="action_button">
      <NavLink to="/new" >
        <Actionbutton isActive={currentTab(props.history,"/new")} text="New" />
      </NavLink>
      
      <NavLink to="/top" >
        <Actionbutton isActive={currentTab(props.history,"/top")} text="Past" />
        </NavLink>

      <NavLink to="/best" >
        <Actionbutton isActive={currentTab(props.history,"/best")} text="Best" />
        </NavLink>
    </div>
    </div>
    </>
  )
}

export default withRouter(Navbar)
