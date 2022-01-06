import React, { useEffect } from "react";
import Layout from "../../../components/Layout";
import StoryContext from "../../../context/StoryContext";
import { useContext } from "react";
import { API_URL } from "../../../config";
import UserStoryCard from "../../../components/UserStoryCard";
import cookie from "cookie";

const StoryTabList = () => {
  const { userStories, getUserStories } = useContext(StoryContext);

  useEffect(() => {
    getUserStories();
  }, []);

  const deleteStory = (id) => {
    console.log(id);
  };
  return (
    <Layout>
      <div className=" p-4">
        <h1 className=" text-3xl">Published Stories</h1>
        {userStories &&
          userStories.map((story) => (
            <UserStoryCard
              story={story}
              key={story.id}
              handleDelete={deleteStory}
            />
          ))}
      </div>
    </Layout>
  );
};

export default StoryTabList;

export async function getServerSideProps({ req }) {
  if (req.headers.cookie) {
    const { token } = cookie.parse(req.headers.cookie);

    if (token) {
      return { props: { token: token } };
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
