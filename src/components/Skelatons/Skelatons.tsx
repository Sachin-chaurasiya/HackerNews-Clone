
import './Skelaton.css';

function Skeleton(props:{ type:string }) {
  const classes = `skeleton ${props.type} `;

  return (
    <div className={classes}></div>
  )
}

export default Skeleton