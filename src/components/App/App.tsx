import React,{useEffect,useReducer,useState} from "react"
import "./App.css"
import Cardlist from "../CardList/Cardlist"
import {getStoryByType} from "../../API/Methods"
import Error from "../Error/Error";
import Skeleton from "../Skelatons/Skeletons"
import {Match,AppState,actionType,News} from "./AppTypes"
import {reducer} from "./Reducer"
import Loadmore from "../LoadMore/LoadMore"

const initialState:AppState = {
  stories: [],
  error:"",
  isloading:false,
  postVisible:15,

};

const App:React.FC<Match> =(props)=>{
  
  const storyType:string=props.match.params.storytype;
  const [state, dispatch] = useReducer(reducer, initialState);
  const [currentPage,setCurrentPage]=useState<number>(1)
  const [start,setStart] =useState<number>(0)
  const [totalNumberOfStories,setTotalNumberOfStories] =useState<number>(0)
  const {postVisible,isloading,stories,error}=state
  
  
  const loadHandler:React.MouseEventHandler=()=>{
    setStart(prevState=>prevState+15)
    dispatch({type:actionType.SET_VISIBLE})
    setCurrentPage(preState=>preState+1)
  }
  
  

  useEffect(() => {
    dispatch({type:actionType.SET_LOADING})  
    getStoryByType(storyType,start,postVisible)
    .then((res:{news:News[],TotalNumberOfStories:number})=>{
      setTotalNumberOfStories(res.TotalNumberOfStories)
      dispatch({type:actionType.SET_NEWS,payload:res.news})
      dispatch({type:actionType.RESET_LOADING})
      dispatch({type:actionType.RESET_ERROR})
      
    })
    .catch(()=>{
      dispatch({type:actionType.RESET_LOADING})
      dispatch({type:actionType.SET_ERROR})
    })
    
    

  }, [storyType,start,postVisible])
  
    return(
      <>
        
        {isloading && <Skeleton />}
        {!isloading && <Cardlist stories={stories}/> }
        <Error message={error}/>
        {!isloading && !error && <div className="container">Page: {currentPage} / {Math.ceil(totalNumberOfStories/15)}</div>}
        {!isloading && <Loadmore callback={loadHandler} postVisible={postVisible} stories={stories} />}
      </>
    )
  
}
export default App