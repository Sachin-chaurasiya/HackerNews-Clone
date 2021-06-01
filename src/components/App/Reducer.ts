import { AppState, actionType, Action } from "./AppTypes";
import { STORY_PERPAGE } from "./App";
export const reducer = (state: AppState, action: Action): AppState => {
  const { type, payload } = action;

  switch (type) {
    case actionType.SET_NEWS:
      if (typeof payload?.initialstories !== "undefined") {
        return { ...state, initialStories: payload.initialstories };
      } else {
        return state;
      }
    case actionType.SET_STORY_TYPE:
      if (typeof payload?.storyType !== "undefined") {
        return { ...state, StoryType: payload.storyType };
      } else {
        return state;
      }

    case actionType.SET_STORY_IDS:
      if (typeof payload?.storyIds !== "undefined") {
        return { ...state, storyIds: payload.storyIds };
      } else {
        return state;
      }
    case actionType.RESET_STORY_IDS:
      return { ...state, storyIds: [] };

    case actionType.SET_TOTAL_NUMBER_OF_STORIES:
      if (typeof payload?.totalNumberOfStories !== "undefined") {
        return { ...state, totalNumberOfStories: payload.totalNumberOfStories };
      } else {
        return state;
      }

    case actionType.RESET_TOTAL_NUMBER_OF_STORIES:
      return { ...state, totalNumberOfStories: 0 };

    case actionType.SET_ERROR:
      return { ...state, error: "No data found" };

    case actionType.RESET_ERROR:
      return { ...state, error: "" };

    case actionType.SET_CURRENT_PAGE:
      return { ...state, currentPage: state.currentPage + 1 };
    case actionType.RESET_CURRENT_PAGE:
      return { ...state, currentPage: 1 };

    case actionType.SET_START:
      return { ...state, start: state.start + STORY_PERPAGE };

    case actionType.RESET_START:
      return { ...state, start: 0 };

    case actionType.SET_STORIES:
      return { ...state, stories: [...state.stories, ...state.initialStories] };

    case actionType.RESET_STORIES:
      return { ...state, stories: [] };

    case actionType.SET_LOADING:
      return { ...state, isloading: true };

    case actionType.RESET_LOADING:
      return { ...state, isloading: false };

    case actionType.SET_VISIBLE:
      return {
        ...state,
        postVisible: state.postVisible && state.postVisible + STORY_PERPAGE,
      };
    case actionType.RESET_VISIBLE:
      return {
        ...state,
        postVisible: STORY_PERPAGE,
      };

    default:
      return state;
  }
};
