import React,{useEffect,useReducer,useState} from "react"
import "./App.css"
import Cardlist from "../CardList/Cardlist"
import {getStoryByType,getStoryByTypeInBackGround} from "../../API/Methods"
import Error from "../Error/Error";
import Skeleton from "../Skelatons/Skeletons"
import {Match,AppState,actionType,News} from "./AppTypes"
import {reducer} from "./Reducer"
import Loadmore from "../LoadMore/LoadMore"

const STORY_PERPAGE=15
const initialState:AppState = {
  initialStories: [],
  remainingStories:[],
  error:"",
  isloading:false,
  postVisible:STORY_PERPAGE,
  

};

const App:React.FC<Match> =(props)=>{
  
  const storyType:string=props.match.params.storytype;
  const [state, dispatch] = useReducer(reducer, initialState);
  const [currentPage,setCurrentPage]=useState<number>(1)
  const [start,setStart] =useState<number>(0)
  const [totalNumberOfStories,setTotalNumberOfStories] =useState<number>(0)
  const {postVisible,isloading,initialStories,error,remainingStories}=state
  
  
  const loadHandler:React.MouseEventHandler=()=>{
    setStart(prevState=>prevState+STORY_PERPAGE)
    dispatch({type:actionType.SET_VISIBLE})
    setCurrentPage(preState=>preState+1)
    window.scrollTo({
      top: window.pageYOffset-468,
      behavior: "smooth"
    });
  }
  
  

  useEffect(() => {
    dispatch({type:actionType.SET_LOADING})  
    getStoryByType(storyType)
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

    getStoryByTypeInBackGround(storyType)
    .then((res:News[])=>{
      dispatch({type:actionType.SET_REMAINNEWS,payload:res})
    })
    .catch(()=>{
      dispatch({type:actionType.SET_ERROR})
    })
    

  }, [storyType])
  
    return(
      <>
        
        {isloading && <Skeleton />}
        {!isloading && 
         <Cardlist stories={initialStories}/>
         }
         {start>=STORY_PERPAGE && !isloading && <Cardlist stories={remainingStories.slice(STORY_PERPAGE,postVisible)}/>}
        <Error message={error}/>
        {!isloading && !error && <div className="container">Page: {currentPage} / {Math.ceil(totalNumberOfStories/STORY_PERPAGE)}</div>}
        
        {!isloading && <Loadmore callback={loadHandler} postVisible={postVisible} stories={initialStories} />}
      </>
    )
  
}
export default App