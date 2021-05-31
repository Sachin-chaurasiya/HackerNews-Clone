import React,{useEffect,useReducer,useState} from "react"
import "./App.css"
import Cardlist from "../CardList/Cardlist"
import {getStoryByType,getStories} from "../../API/Methods"
import Error from "../Error/Error";
import Skeleton from "../Skelatons/Skeletons"
import {Match,AppState,actionType,News} from "./AppTypes"
import {reducer} from "./Reducer"
import Loadmore from "../LoadMore/LoadMore"

const STORY_PERPAGE=15
const initialState:AppState = {
  initialStories: [],
  error:"",
  isloading:false,
  postVisible:STORY_PERPAGE,
  

};

const App:React.FC<Match> =({match})=>{
  
  // refator local state to useReducer state
  const [state, dispatch] = useReducer(reducer, initialState);
  const [StoryType,setStoryType]=useState<string>(match.params.storytype)
  const [currentPage,setCurrentPage]=useState<number>(1)
  const [start,setStart] =useState<number>(0)
  const [totalNumberOfStories,setTotalNumberOfStories] =useState<number>(0)
  const [stories,setStories]=useState<News[]>([])
  const [storyIds,setStoryIds]=useState<number[]>([])
  const {postVisible,isloading,initialStories,error}=state

  
  const loadHandler:React.MouseEventHandler=()=>{
    setStart(prevState=>prevState+STORY_PERPAGE)
    dispatch({type:actionType.SET_VISIBLE})
    setCurrentPage(preState=>preState+1)
    window.scrollTo({
      top: window.pageYOffset-468,
      behavior: "smooth"
    });
  }
  
  useEffect(()=>{
    console.log("fetching ids");
    dispatch({type:actionType.SET_LOADING})
    getStoryByType(StoryType)
    .then((res:{data:number[],TotalNumberOfStories:number})=>{
      setTotalNumberOfStories(res.TotalNumberOfStories)
      setStoryIds(res.data) 
      dispatch({type:actionType.RESET_LOADING})
    })
    .catch(()=>{
      dispatch({type:actionType.RESET_LOADING})
      dispatch({type:actionType.SET_ERROR})
    })
  },[StoryType])
  

  useEffect(()=>{
    if (StoryType !== match.params.storytype) {
     console.log("render when type changed");
    setStoryType(match.params.storytype) 
    setStart(0)
    dispatch({type:actionType.RESET_VISIBLE})
    setStories([])
    setStoryIds([])
    dispatch({type:actionType.SET_NEWS,payload:[]})
    setTotalNumberOfStories(0)
    setCurrentPage(1)
  }
  },[StoryType,match.params.storytype])
  
  
  useEffect(()=>{
   dispatch({type:actionType.SET_LOADING})
   getStories(storyIds,start,postVisible)
   .then((res:News[])=>{
    dispatch({type:actionType.SET_NEWS,payload:res})
      dispatch({type:actionType.RESET_LOADING})
      dispatch({type:actionType.RESET_ERROR})
   })
   .catch(()=>{
      dispatch({type:actionType.RESET_LOADING})
      dispatch({type:actionType.SET_ERROR})
    })
  },[storyIds,start,postVisible])

  useEffect(()=>{
   setStories(prevStories=>[...prevStories,...initialStories])
  },[initialStories])

    return(
      <>
        
        {isloading && <Skeleton />}
        {!isloading && 
         <Cardlist stories={stories}/>
         }
        
        <Error message={error}/>
        {!isloading && totalNumberOfStories>0 && !error && <div className="container">Page: {currentPage} / {Math.ceil(totalNumberOfStories/STORY_PERPAGE)}</div>}
        
        {!isloading && <Loadmore callback={loadHandler} postVisible={postVisible} stories={stories} />}
      </>
    )
  
}
export default App