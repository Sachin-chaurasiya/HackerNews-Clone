import React,{useEffect,useState} from "react"

import "./App.css"
import Cardlist from "../CardList/Cardlist"
import {getNewsByType} from "../API/Methods"
import Error from "../Error/Error";
import NewsSkelaton from "../Skelatons/NewsSkelaton";

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
      
        {isLoading && [1,2,3,4,5].map((n) => <NewsSkelaton key={n} />)}
          {!isLoading && 
            <main className="container">
              <Cardlist news={news}/>
            </main> 
        }
        {error && <Error message={error}/>} 
        
      </>
    )
  
}
export default App