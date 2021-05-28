import React,{useEffect,useReducer} from "react"
import "./App.css"
import Cardlist from "../CardList/Cardlist"
import {getNewsByType} from "../../API/Methods"
import Error from "../Error/Error";
import NewsSkelaton from "../Skelatons/NewsSkelaton";
import {match,AppState,actionType} from "./AppUtils"
import {reducer} from "./Reducer"


const initialState:AppState = {
  news: [],
  error:"",
  isloading:false,
  postVisible:5,

};



const App:React.FC<match> =(props)=>{
  const type:string=props.match.params.type;
  const [state, dispatch] = useReducer(reducer, initialState);
  const {postVisible,isloading,news,error}=state
  
  // load more handler
  const loadHandler:React.MouseEventHandler=()=>{
    dispatch({type:actionType.SETVISIBLE})
  }
  
  
  useEffect(() => {
    dispatch({type:actionType.SETLOADING})

    getNewsByType(type,postVisible)
    .then((res:object[])=>{
      dispatch({type:actionType.SETNEWS,payload:res})
      dispatch({type:actionType.RESETLOADING})
      dispatch({type:actionType.RESETERROR})
      
    })
    .catch((err:string)=>{
      dispatch({type:actionType.RESETLOADING})
      dispatch({type:actionType.SETERROR})
    })
    

  }, [type,postVisible])
  
    return(
      <>
      
        {isloading && [1,2,3,4,5].map((n) => <NewsSkelaton key={n} />)}
          {!isloading && 
            <main className="container">
              <Cardlist news={news}/>
            </main> 
        }
        {error && <Error message={error}/>} 
        
        {news && news.length>0 &&
        <div className="container">
         <button className="button" disabled={isloading?true:false} onClick={loadHandler} style={{display:`${postVisible && postVisible>=500?"none":"block"}`}}>Load more</button>
        </div>
         }
      </>
    )
  
}
export default App