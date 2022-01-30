import React, { useState } from "react";
import Layout from "../../../../components/Layout";
import { API_URL } from "../../../../config";
import StorySubNav from "../../../../components/StorySubNav";
import Modal from "../../../../components/Modal";
import ChapterRow from "../../../../components/ChapterRow";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import cookie from "cookie";
const StoryEditContent = ({ chapters, storyTitle, id, token }) => {
  const [showModal, setshowModal] = useState(false);
  const [uChapters, setuChapters] = useState(chapters);
  const [chapter, setChapter] = useState({
    id: "",
    title: "",
    chapterNumber: "",
  });
  const showDeleteModal = (id, title, chapterNumber) => {
    setshowModal(true);
    setChapter({ ...chapter, id, title, chapterNumber });
    console.log(id, title, chapterNumber);
  };
  const deleteChapter = async (id, chapterNumber) => {
    const res = await fetch(`${API_URL}/chapters/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message);
    } else {
      toast.success(`Chapter ${chapterNumber} was deleted`);
      setshowModal(false);
      const newChapters = uChapters.filter((chapter) => chapter.id != id);
      setuChapters(newChapters);
    }

    console.log(id);
  };
  const router = useRouter();
  return (
    <Layout>
      <ToastContainer />
      <div className=" p-8">
        <h1 className="text-4xl font-bold ">Editing Story: {storyTitle}</h1>
        <StorySubNav id={id} />
        <div className="h-2 bg-blue-600 rounded-t-md mt-3"></div>
        <div className="p-4">
          <h1 className="text-2xl font-med">Story Chapters</h1>

          <table class="table-auto mt-2">
            <thead>
              <tr className=" bg-blue-600 text-left p-2 ">
                <th className="w-2/12">Chapter Number</th>
                <th className="w-9/12">Chapter Title</th>
                <th className="w-1/12">Update</th>
                <th className="w-1/12 ">Delete</th>
              </tr>
            </thead>
            <tbody>
              {uChapters.map((chapter) => (
                <>
                  <ChapterRow
                    id={chapter.id}
                    chapter={chapter}
                    handleDelete={() =>
                      showDeleteModal(
                        chapter.id,
                        chapter.ChapterTitle,
                        chapter.ChapterNumber
                      )
                    }
                  />
                </>
              ))}
            </tbody>
          </table>
          <button
            className="bg-blue-600 text-white py-2 px-6 rounded-lg m-2 hover:bg-blue-800"
            onClick={() =>
              router.push(`/auth/story/chapters/new_chapter/${id}`)
            }
          >
            Post new Chapter
          </button>

          <Modal
            show={showModal}
            onClose={() => setshowModal(false)}
            title={`Are you sure you want to delete this chapter ${chapter.title}?`}
            secondTitle={`Wont be able to get it back`}
          >
            <img
              className="m-2"
              src="https://htxt.co.za/wp-content/uploads/2019/11/Gfycat-Delete-Thanos-Snap.gif"
            />
            <div className="flex">
              <button
                className="bg-yellow-400 mt-0.5 ml-1 text-white py-1 px-4 rounded-lg hover:bg-yellow-500"
                onClick={() => setshowModal(false)}
              >
                No, cancel{" "}
              </button>
              <button
                className="bg-red-600 mt-0.5 ml-1 text-white py-1 px-4 rounded-lg hover:bg-red-800"
                onClick={() => deleteChapter(chapter.id, chapter.chapterNumber)}
              >
                Yes, Delete{" "}
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default StoryEditContent;

export async function getServerSideProps({ params: storyId, req }) {
  const { id } = storyId;

  if (req.headers.cookie) {
    const { token } = cookie.parse(req.headers.cookie);
    const res = await fetch(`${API_URL}/stories/${id}`);

    const data = await res.json();

    const chapters = data.chapters.sort(function (a, b) {
      return a.ChapterNumber - b.ChapterNumber;
    });

    const storyTitle = data.StoryTitle;

    return {
      props: { chapters, storyTitle, id, token },
    };
  } else {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
}
