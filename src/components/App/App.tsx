import React,{useEffect,useState} from "react"

import "./App.css"
import Cardlist from "../CardList/Cardlist"
import {getNewsByType} from "../../API/Methods"
import Error from "../Error/Error";
import NewsSkelaton from "../Skelatons/NewsSkelaton";

type match={
  match:{params:{type:string}}
}
const App:React.FC<match> =(props:match):JSX.Element=>{
  const type:string=props.match.params.type;
  const [news,setNews]=useState<object[]>([])
  const [error,setError]=useState<string>("")
  const[isLoading,setIsloading]=useState<boolean>(false)

  useEffect(() => {
    setIsloading(true)
    getNewsByType(type)
    .then((res:object[])=>{
      setNews(res)
      setIsloading(false)
      setError("")
    })
    .catch((err:string)=>{
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