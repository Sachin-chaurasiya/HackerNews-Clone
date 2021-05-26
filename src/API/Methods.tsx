import axios from "axios"
import {BASE_URL} from "./Constant"

const getNews=async (id:number)=>{
  try {
    const single = await axios.get(`${BASE_URL}/item/${id}.json`);
    return single
    
  } catch (error) {
    return error
  }
}

const getNewsByType=async (type:string)=>{
  try {
    const { data: newsIds} = await axios.get(`${BASE_URL}/${type}stories.json`);
    const news = await Promise.all(newsIds.slice(0,60).map(getNews));
    return news
    
  } catch (error) {
    return Promise.reject("No data Found")
  }
}

export {getNews,getNewsByType}