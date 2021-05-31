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
}

export enum actionType {
  SET_NEWS = "setNews",
  SET_ERROR = "setError",
  RESET_ERROR = "resetError",
  SET_LOADING = "setLoading",
  RESET_LOADING = "resetLoading",
  SET_VISIBLE = "setVisible",
  RESET_VISIBLE = "resetVisible",
}

export interface Action {
  type: actionType;
  payload?: News[];
}
