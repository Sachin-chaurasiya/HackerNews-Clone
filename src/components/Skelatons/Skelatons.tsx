
import './Skelaton.css';

const Skeleton:Function=(props:{ type:string }):JSX.Element =>{
  const classes = `skeleton ${props.type} `;

  return (
    <div className={classes}></div>
  )
}

export default Skeleton