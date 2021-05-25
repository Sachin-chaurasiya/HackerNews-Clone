
import "./Actionbutton.css"
const Actionbutton = (props:{isActive:boolean,text:string,clickHandler?:any}) => {
  return (
    <button className={`btn ${props.isActive?"active":""}`} onClick={props.clickHandler}>
      {props.text}
    </button>
  )
}

export default Actionbutton;
