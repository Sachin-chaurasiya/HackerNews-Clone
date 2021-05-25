import React from "react"
import Footer from "../Footer/Footer"
import Navbar from "../Navbar/Navbar"
import Actionbutton from "../ActionButton/Actionbutton"
import "./App.css"
import Cardlist from "../CardList/Cardlist"

class App extends React.Component{
  render(){
    return(
      <>
        <Navbar/>
        <main className="container">
          <div className="action_button">

            <Actionbutton isActive={true} text="New"/>
            <Actionbutton isActive={false} text="Past"/>
          </div>
          <Cardlist/>
          <Cardlist/>
          <Cardlist/>
          <button className="button">Load more</button>
        </main>
        <Footer/>
      </>
    )
  }
}
export default App