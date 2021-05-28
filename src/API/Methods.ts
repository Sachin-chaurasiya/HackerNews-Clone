
import axios from "axios"
import {BASE_URL} from "./Constant"
import {news} from "../components/App/AppUtils"

const getStory=async (id:number):Promise<news>=>{
  try {
    const single = await axios.get<news>(`${BASE_URL}/item/${id}.json`);
    return single.data
    
  } catch (error:unknown) {
    return Promise.reject("No data Found for given id")
  }
}

const getStoryByType=async (type:string,end:number):Promise<news[]>=>{
  try {
    const { data } = await axios.get<number[]>(`${BASE_URL}/${type}stories.json`);
    const news = await Promise.all(data.slice(0,end).map(getStory));
    return news
    
  } catch (error:unknown) {
    return Promise.reject("No data Found for given type")
  }
}

export {getStory,getStoryByType}