import React, { useState } from "react";
import Layout from "../../../../components/Layout";
import router from "next/router";
import { API_URL } from "../../../../config";
import Link from "next/link";
import StorySubNav from "../../../../components/StorySubNav";
import { ToastContainer, toast } from "react-toastify";
import cookie from "cookie";
const StoryEdit = ({ story, token }) => {
  const [storyTitle, setStoryTitle] = useState(story.StoryTitle);
  const [storySummary, setStorySummary] = useState(story.summary);
  const updateStory = async () => {
    if (!storyTitle || !setStorySummary) {
      toast.error("Please fill in the inputs");
    } else {
      const res = await fetch(`${API_URL}/stories/${story.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          StoryTitle: storyTitle,
          summary: storySummary,
        }),
      });

      if (!res.ok) {
        if (res.status === 403 || res.status === 401) {
          toast.error("Unauthorized");
          return;
        }
        toast.error("Story already has that title");
      } else {
        toast.success("Story updated");
      }
    }
  };
  return (
    <Layout>
      <ToastContainer />
      <div className="p-4 bg-gray-50">
        <h1 className="text-4xl font-bold ">Editing Story: {storyTitle}</h1>
        <StorySubNav id={story.id} />

        <div className="h-2 bg-blue-600 rounded-t-md"></div>
        <div className=" bg-white p-4 mb-8">
          <h1 className="text-3xl">Info</h1>
        </div>

        <div className="h-2 bg-blue-600 rounded-t-md"></div>
        <div className=" bg-white p-4">
          <h1 className="text-3xl ">Story Properties</h1>
          <div className="grid grid-cols-8 gap-4 mt-1">
            <label className="col-span-1 my-auto">Title</label>
            <input
              className="col-span-6 border w-full h-5 px-3 py-5 hover:outline-none focus:outline-none focus:ring-1 focus:ring-bg-blue-600 rounded-md"
              value={storyTitle}
              onChange={(e) => setStoryTitle(e.target.value)}
            />
            <button
              className="col-span-1 bg-blue-600 text-white py-2 px-6 rounded-lg w-full"
              onClick={updateStory}
            >
              Update
            </button>
          </div>
          <div className="grid grid-cols-8 gap-4 mt-1">
            <label className="col-span-1 my-auto">Summary</label>
            <textarea
              className="col-span-6 border w-full h-5 px-3 py-5 hover:outline-none focus:outline-none focus:ring-1 focus:ring-bg-blue-600 rounded-md"
              value={storySummary}
              onChange={(e) => setStorySummary(e.target.value)}
            />
          </div>
        </div>
      </div>

      {console.log(story)}
    </Layout>
  );
};

export default StoryEdit;

export async function getServerSideProps({ params: { id }, req }) {
  if (req.headers.cookie) {
    const { token } = cookie.parse(req.headers.cookie);

    const res = await fetch(`${API_URL}/stories/${id}`);

    const story = await res.json();

    if (token) {
      return { props: { token: token, story, story } };
    }
  } else {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
}
