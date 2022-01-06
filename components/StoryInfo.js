import React from "react";

const StoryInfo = ({ formData, setFormData }) => {
  return (
    <div>
      <h1>Please full in the inputs</h1>
      <input
        type="text"
        className=" border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-bg-blue-600 rounded-md"
        placeholder="Story Title"
        value={formData.StoryTitle}
        onChange={(e) => {
          setFormData({ ...formData, StoryTitle: e.target.value });
        }}
      />
      <input
        type="text"
        className=" border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-bg-blue-600 rounded-md"
        placeholder="Summary"
        value={formData.summary}
        onChange={(e) => {
          setFormData({ ...formData, summary: e.target.value });
        }}
      />

      {/*
      <button className=" bg-blue-600 m-4 text-white py-2 px-6 rounded-lg hover:bg-blue-800 font-light">
      Publish Story
    </button>*/}
    </div>
  );
};

export default StoryInfo;
