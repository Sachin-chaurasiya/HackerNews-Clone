export type News = {
  id: number;
  by: string;
  descendants: number;
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
  kids?: number[];
  text: string;
};

export type Match = {
  match: {
    params: {
      storytype: string;
    };
  };
};

export interface AppState {
  initialStories: News[];
  error: string;
  isloading: boolean;
  postVisible: number;
  currentPage: number;
  start: number;
  totalNumberOfStories: number;
  stories: News[];
  storyIds: number[];
  StoryType: string;
}

export enum actionType {
  SET_NEWS = "setNews",

  SET_ERROR = "setError",
  RESET_ERROR = "resetError",

  SET_LOADING = "setLoading",
  RESET_LOADING = "resetLoading",

  SET_VISIBLE = "setVisible",
  RESET_VISIBLE = "resetVisible",

  SET_CURRENT_PAGE = "setCurrentPage",
  RESET_CURRENT_PAGE = "resetCurrentPage",

  SET_START = "setStart",
  RESET_START = "resetStart",

  SET_TOTAL_NUMBER_OF_STORIES = "setTotalNumberOfStories",
  RESET_TOTAL_NUMBER_OF_STORIES = "resetTotalNumberOfStories",

  SET_STORIES = "setStories",
  RESET_STORIES = "resetStories",

  SET_STORY_IDS = "setStoryIds",
  RESET_STORY_IDS = "resetStoryIds",

  SET_STORY_TYPE = "setStoryType",
}

export interface Action {
  type: actionType;
  payload?: {
    initialstories?: News[];
    storyIds?: number[];
    storyType?: string;
    totalNumberOfStories?: number;
  };
}
