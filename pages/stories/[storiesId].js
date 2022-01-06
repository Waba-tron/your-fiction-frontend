import React from "react";
import Layout from "../../components/Layout";

import StoryCard from "../../components/StoryCard";
import { API_URL } from "../../config";
const Stories = ({ userStories, title }) => {
  return (
    <Layout>
      <div className="p-5">
        {console.log(userStories)}

        <h1 className=" text-4xl text-left font-medium">
          {title.Title} - Fiction
        </h1>
        <div>
          {userStories.map((story) => (
            <StoryCard story={story} key={story.id} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Stories;

export async function getServerSideProps(context) {
  const { storiesId } = context.params;

  const res = await fetch(
    `${API_URL}/stories?title.id=${storiesId}&chapters_ne=[]`
  );

  const userStories = await res.json();

  const res2 = await fetch(`${API_URL}/titles/${storiesId}`);

  const title = await res2.json();

  return {
    props: { userStories, title },
  };
}
