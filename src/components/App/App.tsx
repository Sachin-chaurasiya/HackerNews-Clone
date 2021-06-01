import React,{useEffect,useReducer} from "react"
import "./App.css"
import Cardlist from "../CardList/Cardlist"
import {getStoryByType,getStories} from "../../API/Methods"
import Error from "../Error/Error";
import Skeleton from "../Skelatons/Skeletons"
import {Match,AppState,actionType,News} from "./AppTypes"
import {reducer} from "./Reducer"
import Loadmore from "../LoadMore/LoadMore"

export const STORY_PERPAGE=15

const initialState:AppState = {
  initialStories: [],
  error:"",
  isloading:false,
  postVisible:STORY_PERPAGE,
  currentPage: 1,
  start: 0,
  stories:[],
  StoryType:"new",
  storyIds:[],
  totalNumberOfStories:0

};

const App:React.FC<Match> =({match})=>{
  
  const [state, dispatch] = useReducer(reducer, initialState);
  const {postVisible,isloading,initialStories,error,currentPage,start,stories,totalNumberOfStories,storyIds,StoryType}=state

  const loadHandler:React.MouseEventHandler=()=>{
    dispatch({type:actionType.SET_START})
    dispatch({type:actionType.SET_VISIBLE})
    dispatch({type:actionType.SET_CURRENT_PAGE})
    window.scrollTo({
      top: window.pageYOffset-500,
      behavior: "smooth"
    });
  }
  
  useEffect(()=>{
    dispatch({type:actionType.SET_LOADING})
    getStoryByType(StoryType)
    .then((res:{data:number[],TotalNumberOfStories:number})=>{
      dispatch({type:actionType.SET_TOTAL_NUMBER_OF_STORIES,payload:{totalNumberOfStories:res.TotalNumberOfStories}})
      dispatch({type:actionType.SET_STORY_IDS,payload:{storyIds:res.data}})
      dispatch({type:actionType.RESET_LOADING})
    })
    .catch(()=>{
      dispatch({type:actionType.RESET_LOADING})
      dispatch({type:actionType.SET_ERROR})
    })
  },[StoryType])
  

  useEffect(()=>{
    if (StoryType !== match.params.storytype) {
    dispatch({type:actionType.SET_STORY_TYPE,payload:{storyType:match.params.storytype}})
    dispatch({type:actionType.RESET_START})
    dispatch({type:actionType.RESET_VISIBLE})
    dispatch({type:actionType.RESET_STORIES})
    dispatch({type:actionType.RESET_CURRENT_PAGE})
    dispatch({type:actionType.SET_NEWS,payload:{initialstories:[]}})
    dispatch({type:actionType.RESET_STORY_IDS})
    dispatch({type:actionType.RESET_TOTAL_NUMBER_OF_STORIES})
  }
  },[StoryType,match.params.storytype])
  
  
  useEffect(()=>{
   dispatch({type:actionType.SET_LOADING})
   getStories(storyIds,start,postVisible)
   .then((res:News[])=>{
    dispatch({type:actionType.SET_NEWS,payload:{initialstories:res}})
      dispatch({type:actionType.RESET_LOADING})
      dispatch({type:actionType.RESET_ERROR})
   })
   .catch(()=>{
      dispatch({type:actionType.RESET_LOADING})
      dispatch({type:actionType.SET_ERROR})
    })
  },[storyIds,start,postVisible])

  useEffect(()=>{
   dispatch({type:actionType.SET_STORIES})
  },[initialStories])

    return(
      <>
        
        {isloading && <Skeleton />}
        {!isloading && 
         <Cardlist stories={stories}/>
         }
        
        <Error message={error}/>
        {!isloading && totalNumberOfStories>0 && !error && <div className="container">Page: {currentPage} / {Math.ceil(totalNumberOfStories/STORY_PERPAGE)}</div>}
        
        {!isloading && <Loadmore callback={loadHandler} postVisible={postVisible} totalNumberOfStories={totalNumberOfStories} stories={stories} />}
      </>
    )
  
}
export default App