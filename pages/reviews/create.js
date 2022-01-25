import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useContext } from "react";
import ReviewContext from "../../context/ReviewContext";
import cookie from "cookie";
import { ToastContainer, toast } from "react-toastify";
import { API_URL } from "../../config";
import { useRouter } from "next/router";
const Create = ({ token }) => {
  const router = useRouter();
  const { reviewData, setreviewData } = useContext(ReviewContext);
  const [reviewBody, setReviewBody] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!reviewData.story || !reviewBody || !reviewData.chapterNumber) {
      toast.error(`Please in the inputs`);
    } else {
      const res = await fetch(`${API_URL}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          story: reviewData.story.id,
          ReviewBody: reviewBody,
          ChapterNumber: reviewData.chapterNumber,
        }),
      });

      if (!res.ok) {
        if (res.status === 403 || res.status === 401) {
          toast.error("Unauthorized");
          return;
        }
      } else {
        router.push(`/reviews/${reviewData.story.id}`);
      }
    }
  };
  return (
    <Layout>
      <ToastContainer />

      <div className="min-m-screen antialiased px-4 py-6 flex flex-col justify-center sm:py-12 font-press-start">
        <div className="relative py-1 mx-auto text-center">
          <span className="text-2xl font-light">Add a review</span>
          <div className="relative mt-4 bg-white shadow-md sm:rounded-lg text-left max-w-max">
            <div className="h-2 bg-blue-600 rounded-t-md"></div>
            <div className="py-6 px-8">
              <form onSubmit={handleSubmit}>
                <label className="block mt-3 font-semibold">
                  Story: {reviewData.story && reviewData.story.StoryTitle}
                </label>
                <label className="block mt-3 font-semibold">Review</label>
                <textarea
                  type="text"
                  placeholder="Type here..."
                  rows="4"
                  cols="30"
                  onChange={(e) => setReviewBody(e.target.value)}
                  className=" border w-full  px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-bg-blue-600 rounded-md"
                />

                <button
                  type="submit"
                  className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg w-full hover:bg-blue-800"
                >
                  Create review
                </button>
              </form>

              <div className="text-center mt-4"></div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Create;

export async function getServerSideProps({ req }) {
  if (req.headers.cookie) {
    const { token } = cookie.parse(req.headers.cookie);

    if (token) {
      return { props: { token } };
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
