import React,{useEffect,useState} from "react"

import "./App.css"
import Cardlist from "../CardList/Cardlist"
import Loader from "../Loader/Loader";
import {getNewsByType} from "../API/Methods"
import Error from "../Error/Error";
const App =(props:{match:any})=>{
  const type:string=props.match.params.type;
  const [news,setNews]=useState([])
  const [error,setError]=useState("")
  const[isLoading,setIsloading]=useState(false)

  useEffect(() => {
    setIsloading(true)
    getNewsByType(type)
    .then((res:any)=>{
      setNews(res)
      setIsloading(false)
      setError("")
    })
    .catch((err:any)=>{
      setIsloading(false)
      setError(err)
    })

  }, [type])

    return(
      <>
          {isLoading && <Loader/>}
          {!isLoading && 
            <main className="container">
              <Cardlist news={news}/>
              {news.length>0 && <button className="button">Load more</button>}
            </main> 
        }
        {error && <Error message={error}/>} 
        
      </>
    )
  
}
export default App