
import axios from "axios"
import {BASE_URL} from "./Constant"


const getNews=async (id:number):Promise<{}>=>{
  try {
    const single = await axios.get<{}>(`${BASE_URL}/item/${id}.json`);
    return single.data
    
  } catch (error:any) {
    return Promise.reject("No data Found for given id")
  }
}

const getNewsByType=async (type:string,end?:number):Promise<{}[]>=>{
  try {
    const { data } = await axios.get<[]>(`${BASE_URL}/${type}stories.json`);
    const news = await Promise.all(data.slice(0,end).map(getNews));
    return news
    
  } catch (error:any) {
    return Promise.reject("No data Found")
  }
}

export {getNews,getNewsByType}