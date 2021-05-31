import React from 'react'
import {News} from "../App/AppTypes"

type loadmore={

  callback:React.MouseEventHandler,
  postVisible:number,
  stories:News[]
}
const LoadMore:React.FC<loadmore> = ({callback,postVisible,stories}):React.ReactElement => {
  return (
    <>
      {stories.length>0 &&
        <div className="container">
         <button className="button"  onClick={callback} style={{display:`${postVisible && postVisible>=500?"none":"block"}`}}>Load more</button>
        </div>
         }
    </>
  )
}

export default LoadMore
