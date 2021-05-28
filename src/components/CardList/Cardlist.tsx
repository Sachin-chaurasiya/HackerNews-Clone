import React from "react"
import {v4 as uuidv4} from "uuid"
import Card from "../Card/Card"
import "./Cardlist.css"
import {news} from "../App/AppUtils"

type story={
  stories:news[],
  isloading:boolean
}

const Cardlist:React.FC<story> = ({stories,isloading}) => {
  return (
    <main className="container">
      <div className="card_list">
            {!isloading && stories.map((value:news)=> <Card key={uuidv4()} {...value}/> )}     
      </div>
    </main>
  )
}

export default Cardlist
