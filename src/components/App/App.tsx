import React,{useEffect,useReducer} from "react"
import "./App.css"
import Cardlist from "../CardList/Cardlist"
import {getStoryByType} from "../../API/Methods"
import Error from "../Error/Error";
import Skeleton from "../Skelatons/SkeletonComponent"
import {match,AppState,actionType,news} from "./AppUtils"
import {reducer} from "./Reducer"
import Loadmore from "../LoadMore/LoadMore"

const initialState:AppState = {
  stories: [],
  error:"",
  isloading:false,
  postVisible:5,

};

const App:React.FC<match> =(props)=>{
  
  const storyType:string=props.match.params.storytype;
  const [state, dispatch] = useReducer(reducer, initialState);
  const loadHandler:React.MouseEventHandler=()=>{
    dispatch({type:actionType.SET_VISIBLE})
  }
  const {postVisible,isloading,stories,error}=state
  
  
  
  useEffect(() => {
    
    
    
    dispatch({type:actionType.SET_LOADING})

    getStoryByType(storyType)
    .then((res:news[])=>{
      
      dispatch({type:actionType.SET_NEWS,payload:res})
      dispatch({type:actionType.RESET_LOADING})
      dispatch({type:actionType.RESET_ERROR})
      
    })
    .catch(()=>{
      dispatch({type:actionType.RESET_LOADING})
      dispatch({type:actionType.SET_ERROR})
    })
    
    

  }, [storyType])
  
    return(
      <>
        <Skeleton isloading={isloading}/>
        <Cardlist stories={stories.slice(0,postVisible)} isloading={isloading}/> 
        <Error message={error}/>
        <Loadmore isloading={isloading} callback={loadHandler} postVisible={postVisible} stories={stories} />
      </>
    )
  
}
export default App