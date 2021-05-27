import React,{useEffect,useState} from "react"

import "./App.css"
import Cardlist from "../CardList/Cardlist"
import {getNewsByType} from "../../API/Methods"
import Error from "../Error/Error";
import NewsSkelaton from "../Skelatons/NewsSkelaton";

type match={
  match:{
    params:{
      type:string
    }
  }
}
const App:React.FC<match> =(props)=>{
  const type:string=props.match.params.type;
  const [news,setNews]=useState<object[]>([])
  const [error,setError]=useState<string>("")
  const[isLoading,setIsloading]=useState<boolean>(false)
  
  // visible
  const [visible,setVisible]=useState<number>(5);
  // start
  const [start,setStart]=useState<number>(0)

  // load more handler
  const loadHandler:React.MouseEventHandler=()=>{
    setStart(prevState=>prevState+5)
    setVisible(prevState=>prevState+5)
  }
  
  
  useEffect(() => {
    setIsloading(true)
    getNewsByType(type,start,visible)
    .then((res:object[])=>{
      setNews(prevState=>[...prevState,...res])
      setIsloading(false)
      setError("")
    })
    .catch((err:string)=>{
      setIsloading(false)
      setError(err)
    })

  }, [type,visible,start])
  
    return(
      <>
      
        {isLoading && [1,2,3,4,5].map((n) => <NewsSkelaton key={n} />)}
          {!isLoading && 
            <main className="container">
              <Cardlist news={news}/>
            </main> 
        }
        {error && <Error message={error}/>} 
        
        {news.length>0 &&
        <div className="container">
         <button className="button" disabled={isLoading?true:false} onClick={loadHandler} style={{display:`${visible>=500?"none":"block"}`}}>Load more</button>
        </div>
         }
      </>
    )
  
}
export default App