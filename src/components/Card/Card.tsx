import "./Card.css"
import {BsClock} from "react-icons/bs"
const Card = (props:{header:string,description:string,detail:{time:any,comments:string}}) => {
  return (
    <div className="card">
      <div className="card_body">
        <h2 className="card_header">{props.header}</h2>
        <p className="card_description">{props.description}</p>
      </div>
      <div className="card_footer">
        <p className="card_footer__detail"><BsClock style={{verticalAlign:"middle",fontSize:"1.2rem"}}/>{props.detail.time} | {props.detail.comments}</p>
      </div>
      
    </div>
  )
}

export default Card
