import axios, { AxiosError } from "axios";
import { BASE_URL } from "./Constant";
import { News } from "../components/App/AppTypes";

// type predicate
function isAxiosError(err: any): err is AxiosError {
  return err.isAxiosError === true;
}

const getStory = async (id: number): Promise<News> => {
  try {
    const single = await axios.get<News>(`${BASE_URL}/item/${id}.json`);
    return single.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return Promise.reject(error.response?.data.error);
    }
    return error;
  }
};

const getStoryByType = async (
  type: string,
  start: number = 0,
  end: number = 5
): Promise<{ news: News[]; TotalNumberOfStories: number }> => {
  try {
    const { data } = await axios.get<number[]>(
      `${BASE_URL}/${type}stories.json`
    );
    const news = await Promise.all(data.slice(start, end).map(getStory));
    return { news, TotalNumberOfStories: data.length };
  } catch (error) {
    if (isAxiosError(error)) {
      return Promise.reject(error.response?.data.error);
    }
    return error;
  }
};

export { getStory, getStoryByType };
