export type match={
  match:{
    params:{
      type:string
    }
  }
}

export interface AppState{
  news:{}[]|undefined,
  error:string|undefined,
  isloading:boolean|undefined,
  postVisible:number|undefined

}
export enum actionType{
  SETNEWS="setNews",
  SETERROR="setError",
  RESETERROR="resetError",
  SETLOADING="setLoading",
  RESETLOADING="resetLoading",
  SETVISIBLE="setVisible",
}

export interface Action{
  type:actionType,
  payload?:{}[]
}