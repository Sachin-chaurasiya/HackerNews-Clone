export type news={
  id:number,
  by:string,
  descendants: number
  score: number
  time: number
  title: string
  type: string
  url: string
  kids?:number[]
  text:string
}

export type match={
  match:{
    params:{
      storytype:string
    }
  }
}

export interface AppState{
  stories:news[],
  error:string,
  isloading:boolean,
  postVisible:number

}

export enum actionType{
  
  SET_NEWS="setNews",
  SET_ERROR="setError",
  RESET_ERROR="resetError",
  SET_LOADING="setLoading",
  RESET_LOADING="resetLoading",
  SET_VISIBLE="setVisible",
}


export interface Action{
  type:actionType,
  payload?:news[]
}