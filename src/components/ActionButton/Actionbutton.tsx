import "./Actionbutton.css"

const Actionbutton = (props:{isActive:boolean,text:string}) => {
  return (
    <button className={`btn ${props.isActive?"active":""}`}>
      {props.text}
    </button>
  )
}

export default Actionbutton;
