import { useContext, createContext, useState } from "react";
const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {
  const [reviewData, setreviewData] = useState({ chapterNumber: 1 });

  const formData = (chapterNumber) => {
    setreviewData({ chapterNumber });
  };

  return (
    <ReviewContext.Provider value={{ reviewData, formData, setreviewData }}>
      {children}
    </ReviewContext.Provider>
  );
};

export default ReviewContext;
