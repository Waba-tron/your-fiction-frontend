import React from "react";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import StoryContext from "../context/StoryContext";
import StoryCategoryInfo from "./StoryCategoryInfo";
import StoryInfo from "./StoryInfo";
import { ToastContainer, toast } from "react-toastify";
import { API_URL } from "../config";
import { useRouter } from "next/router";
const CreateStoryForm = ({ token }) => {
  const router = useRouter();
  const { categoryData, userStories, getUserStories } =
    useContext(StoryContext);
  const { user } = useContext(AuthContext);
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    StoryTitle: "",
    summary: "",
    title: 0,
  });

  const submitStory = async () => {
    if (!formData.StoryTitle || !formData.summary || !formData.title) {
      toast.error("Please fill in all the inputs");
    } else {
      const res = await fetch(`${API_URL}/stories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        console.log(data);
        router.push(`/auth/story/story_edit/${data.id}`);
      } else {
        toast.error(data.message);
      }
    }
    console.log(formData);
  };

  const pageDisplay = () => {
    if (page === 0) {
      return (
        <StoryCategoryInfo
          categorys={categoryData}
          formData={formData}
          setFormData={setFormData}
        />
      );
    } else if (page === 1) {
      return <StoryInfo formData={formData} setFormData={setFormData} />;
    }
  };

  return (
    <div className=" flex">
      <ToastContainer />
      <div className=" text-gray-700 m-auto">
        {pageDisplay()}

        <div className=" mt-3">
          <button
            disabled={page === 0}
            onClick={() => setPage(() => page - 1)}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg m-2 font-light"
          >
            Prev
          </button>
          <button
            disabled={page === 1}
            onClick={() => setPage(() => page + 1)}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg m-2 font-light"
          >
            Next
          </button>

          {formData.title > 0 && formData.StoryTitle && formData.summary ? (
            <button
              onClick={submitStory}
              className=" bg-blue-600 m-4 text-white py-2 px-6 rounded-lg hover:bg-blue-800 font-light"
            >
              Publish Story
            </button>
          ) : (
            <button className="  bg-gray-500 m-4 text-white py-2 px-6 rounded-lg font-light">
              Publish Story
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateStoryForm;
