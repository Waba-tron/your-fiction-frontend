import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout";
import StoryContext from "../../../context/StoryContext";
import { useContext } from "react";
import { API_URL } from "../../../config";
import UserStoryCard from "../../../components/UserStoryCard";
import cookie from "cookie";
import Modal from "../../../components/Modal";
import { ToastContainer, toast } from "react-toastify";

const StoryTabList = ({ token }) => {
  const [uStories, setuStories] = useState([]);
  const { userStories } = useContext(StoryContext);

  const [story, setStory] = useState({ id: "", title: "" });
  const [showModal, setshowModal] = useState(false);
  useEffect(() => {
    setuStories(userStories);
  }, [userStories]);

  const showDeleteModal = (storyId, title) => {
    setshowModal(true);

    setStory({ ...story, id: storyId, title, title });
  };

  const deleteStory = async (id) => {
    const res = await fetch(`${API_URL}/stories/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message);
    } else {
      toast.success("Story was deleted");
      setshowModal(false);
      const newStories = uStories.filter((story) => story.id !== id);
      setuStories(newStories);
    }
  };
  return (
    <Layout>
      <ToastContainer />
      <div className=" p-4">
        <h1 className=" text-3xl">Published Stories</h1>
        {uStories &&
          uStories.map((sto) => (
            <UserStoryCard
              story={sto}
              key={sto.id}
              handleDelete={() => showDeleteModal(sto.id, `${sto.StoryTitle}`)}
            />
          ))}
        <Modal
          show={showModal}
          onClose={() => setshowModal(false)}
          title={`Are you sure you want to delete ${story.title}?`}
        >
          <img
            className=" m-2"
            src="https://htxt.co.za/wp-content/uploads/2019/11/Gfycat-Delete-Thanos-Snap.gif"
          />
          <div className="flex">
            <button className=" bg-yellow-400 mt-0.5 ml-1 text-white py-1 px-4 rounded-lg hover:bg-yellow-500">
              No, cancel{" "}
            </button>
            <button
              className="bg-red-600 mt-0.5 ml-1 text-white py-1 px-4 rounded-lg hover:bg-red-800"
              onClick={() => deleteStory(story.id)}
            >
              Yes, Delete{" "}
            </button>
          </div>
        </Modal>
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
