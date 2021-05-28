import React from 'react'
import {news} from "../App/AppUtils"

type loadmore={
  isloading:boolean,
  callback:React.MouseEventHandler,
  postVisible:number,
  stories:news[]
}
const LoadMore:React.FC<loadmore> = ({isloading,callback,postVisible,stories}):React.ReactElement => {
  return (
    <>
      {stories.length>0 &&
        <div className="container">
         <button className="button" disabled={isloading?true:false} onClick={callback} style={{display:`${postVisible && postVisible>=500?"none":"block"}`}}>Load more</button>
        </div>
         }
    </>
  )
}

export default LoadMore
