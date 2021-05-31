import { AppState, actionType, Action } from "./AppTypes";
export const reducer = (state: AppState, action: Action): AppState => {
  const { type, payload } = action;

  switch (type) {
    case actionType.SET_NEWS:
      if (typeof payload !== "undefined") {
        return { ...state, initialStories: payload };
      } else {
        return state;
      }
    case actionType.SET_REMAINNEWS:
      if (typeof payload !== "undefined") {
        return { ...state, remainingStories: payload };
      } else {
        return state;
      }

    case actionType.SET_ERROR:
      return { ...state, error: "No data found" };

    case actionType.RESET_ERROR:
      return { ...state, error: "" };

    case actionType.SET_LOADING:
      return { ...state, isloading: true };

    case actionType.RESET_LOADING:
      return { ...state, isloading: false };

    case actionType.SET_VISIBLE:
      return {
        ...state,
        postVisible: state.postVisible && state.postVisible + 15,
      };

    default:
      return state;
  }
};
