import React from "react"
import "./Card.css"
import {BsClock} from "react-icons/bs"

type card={
  header:string|undefined,
  description:string,
  detail:{
    time:string|number|Date|any,
    comments:string
  },
    url:string|undefined
}

const Card:React.FC<card> = (props) => {
  return (
   <a href={props.url} style={{textDecoration:"none",color:"var(--gray-ft)"}} rel="noopener noreferrer" target="_blank">
    <div className="card" >
      <div className="card_body">
        <h3 className="card_header">{props.header}</h3>
        <p className="card_description">{props.description}</p>
      </div>
      <div className="card_footer">
        <p className="card_footer__detail"><BsClock style={{verticalAlign:"middle",fontSize:"1.2rem"}}/>{props.detail.time} | {props.detail.comments}</p>
      </div>
      
    </div>
    </a>
    
  )
}

export default Card
