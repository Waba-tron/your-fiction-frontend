import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { API_URL } from "../config";
import AuthContext from "./AuthContext";
import { useContext } from "react";

const StoryContext = createContext();

export const StoryProvider = ({ children }) => {
  const [categoryData, setCategoryData] = useState();
  const [userStories, setUserStories] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (user) {
      getCategories();
      getUserStories();
    }
  }, [user]);

  const getCategories = async () => {
    const res = await fetch(`${API_URL}/story-types`);

    const data = await res.json();

    if (res.ok) {
      setCategoryData(data);
      console.log(data);
    } else {
      setCategoryData(null);
    }
  };

  const getUserStories = async () => {
    if (user) {
      const res = await fetch(`${API_URL}/stories?user.id=${user.id}`);

      const data = await res.json();

      if (res.ok) {
        setUserStories(data);
      } else {
        setUserStories([]);
        console.log(data);
      }
    }
  };

  return (
    <StoryContext.Provider
      value={{ categoryData, userStories, getUserStories }}
    >
      {children}
    </StoryContext.Provider>
  );
};

export default StoryContext;
