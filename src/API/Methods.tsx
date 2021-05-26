
import axios from "axios"
import {BASE_URL} from "./Constant"

const getNews=async (id:number)=>{
  try {
    const single = await axios.get<{}>(`${BASE_URL}/item/${id}.json`);
    return single
    
  } catch (error:any) {
    return Promise.reject("No data Found for given id")
  }
}

const getNewsByType=async (type:string)=>{
  try {
    const { data } = await axios.get<[]>(`${BASE_URL}/${type}stories.json`);
    const news = await Promise.all(data.map(getNews));
    return news
    
  } catch (error:any) {
    return Promise.reject("No data Found")
  }
}

export {getNews,getNewsByType}