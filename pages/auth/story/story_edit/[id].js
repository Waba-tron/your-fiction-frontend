import React from "react";
import Layout from "../../../../components/Layout";
import router from "next/router";
import { API_URL } from "../../../../config";
import Link from "next/link";
import StorySubNav from "../../../../components/StorySubNav";
const StoryEdit = ({ story }) => {
  return (
    <Layout>
      <div className="p-4 bg-gray-50">
        <h1 className="text-4xl font-bold ">
          Editing Story: {story.StoryTitle}
        </h1>
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
              value={story.StoryTitle}
            />
            <button className="col-span-1 bg-blue-600 text-white py-2 px-6 rounded-lg w-full">
              Update
            </button>
          </div>
          <div className="grid grid-cols-8 gap-4 mt-1">
            <label className="col-span-1 my-auto">Summary</label>
            <textarea
              className="col-span-6 border w-full h-5 px-3 py-5 hover:outline-none focus:outline-none focus:ring-1 focus:ring-bg-blue-600 rounded-md"
              value={story.summary}
            />
          </div>
        </div>
      </div>

      {console.log(story)}
    </Layout>
  );
};

export default StoryEdit;

export async function getServerSideProps(context) {
  const { id } = context.params;

  const res = await fetch(`${API_URL}/stories/${id}`);

  const story = await res.json();

  return {
    props: { story },
  };
}
