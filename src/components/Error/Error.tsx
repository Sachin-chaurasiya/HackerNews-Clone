 import {NavLink} from "react-router-dom"

const Error = (props:{message?:string}):JSX.Element => {
  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
      <h3>
      {props.message && "No Data Found"}
      </h3>

      <NavLink to="/" style={{textDecoration:"none",marginLeft:"0.5rem"}}>
       <button className="button">Go Back</button>
      </NavLink>
    </div>
  )
}

export default Error
