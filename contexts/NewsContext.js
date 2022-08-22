import axios from "axios";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer,
} from "react";
import { getNewsAPI } from "../API/api";
import { newsReducer } from "../reducers/newsReducer";
import uuid from "react-native-uuid";

export const NewsContext = createContext();

const NewsProvider = ({ children }) => {
  const [category, setCategory] = useState("general");

  const initialState = {
    articles: [],
    save: [],
    isLoading: true,
  };

  const [state, dispatch] = useReducer(newsReducer, initialState);

  const fetchNews = async () => {
    const {
      data: { articles },
    } = await axios.get(getNewsAPI(category));

    const modifiedArticles = articles.map((item) => {
      return { ...item, _id: uuid.v4() };
    });

    dispatch({
      type: "AXIOS_SUCCESS",
      payload: modifiedArticles,
    });
  };

  useEffect(() => {
    fetchNews();
  }, [category]);

  return (
    <NewsContext.Provider value={{ state, dispatch }}>
      {children}
    </NewsContext.Provider>
  );
};

export const useNews = () => useContext(NewsContext);

export default NewsProvider;
