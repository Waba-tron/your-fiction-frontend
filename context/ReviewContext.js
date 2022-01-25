import { useContext, createContext, useState, useEffect } from "react";
const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {
  const [reviewData, setreviewData] = useState({
    chapterNumber: "",
    story: {},
  });

  useEffect(() => {
    console.log(localStorage.RevchapterNumber, localStorage.RevStory);

    setreviewData({
      chapterNumber: localStorage.RevchapterNumber,
      story: JSON.parse(localStorage.RevStory),
    });
    reviewData.story = JSON.parse(localStorage.RevStory);
  }, [reviewData.chapterNumber]);

  const formData = (chapterNumber, story) => {
    localStorage.setItem("RevchapterNumber", chapterNumber);
    localStorage.setItem("RevStory", JSON.stringify(story));
    setreviewData({ chapterNumber, story });
  };

  return (
    <ReviewContext.Provider value={{ reviewData, formData, setreviewData }}>
      {children}
    </ReviewContext.Provider>
  );
};

export default ReviewContext;
