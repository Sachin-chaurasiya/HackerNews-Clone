
import {AppState,actionType,Action} from "./AppUtils"
export const reducer = (state:AppState, action:Action):AppState => {
  const {type, payload} = action;
  
  switch (type) {
    case actionType.SETNEWS:
      return {...state,news:payload}
      
    case actionType.SETERROR:
      return {...state,error:"No data found"}

    case actionType.RESETERROR:
      return {...state,error:""}
      
    case actionType.SETLOADING:
      return {...state,isloading:true}

    case actionType.RESETLOADING:
      return {...state,isloading:false}
      
    case actionType.SETVISIBLE:
      return {...state,postVisible:state.postVisible && state.postVisible +5}
      
      default:
        return state;
  }
};