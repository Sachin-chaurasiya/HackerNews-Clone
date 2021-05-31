import React,{useEffect,useReducer,useState} from "react"
import "./App.css"
import Cardlist from "../CardList/Cardlist"
import {getStoryByType} from "../../API/Methods"
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
  
  
  const [state, dispatch] = useReducer(reducer, initialState);
  const [StoryType,setStoryType]=useState<string>("new")
  const [currentPage,setCurrentPage]=useState<number>(1)
  const [start,setStart] =useState<number>(0)
  const [totalNumberOfStories,setTotalNumberOfStories] =useState<number>(0)
  const [stories,setStories]=useState<News[]>([])
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
   if (StoryType !== match.params.storytype) {
    setStoryType(match.params.storytype) 
    setStart(0)
    dispatch({type:actionType.RESET_VISIBLE})
    setStories([])
    setCurrentPage(1)
  }
  },[StoryType,match.params.storytype])
  

  useEffect(() => {
    dispatch({type:actionType.SET_LOADING})  
    getStoryByType(StoryType,start,postVisible)
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
  }, [StoryType,start,postVisible])
  
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
        {!isloading && !error && <div className="container">Page: {currentPage} / {Math.ceil(totalNumberOfStories/STORY_PERPAGE)}</div>}
        
        {!isloading && <Loadmore callback={loadHandler} postVisible={postVisible} stories={stories} />}
      </>
    )
  
}
export default App