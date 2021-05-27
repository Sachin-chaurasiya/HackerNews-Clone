import React from "react"
import {v4 as uuidv4} from "uuid"
import Card from "../Card/Card"
import "./Cardlist.css"

type singleNews={
  id?:number,
  title?:string,
  text?:string,
  time?:string|number|Date|any,
  kids?:number[],
  url?:string
}
type news={
  news:{}[]
}


const Cardlist:React.FC<news> = (props) => {

  
  const {news} =props
  
  return (
    <div className="card_list">
          {news.map((value:singleNews)=> 
            <Card key={uuidv4()} header={value?.title} description={value?.text?value.text: "lorem lipsum lorem lipsum lorem lipsum lorem lipsum lorem lipsum lorem lipsum lorem lipsum lorem lipsum"} detail={{time:` ${new Date(value?.time).getMinutes().toLocaleString()} Min`,comments:`${value?.kids && value.kids.length > 0 ? value.kids.length : 0} comments`}} url={value?.url}/>
                 
          )
          }
          
          
    </div>
  )
}

export default Cardlist
