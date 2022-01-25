import React, { useState, useEffect, useRef } from "react";
import Layout from "../../../../../components/Layout";
import { useRouter } from "next/router";
import cookie from "cookie";
import { API_URL } from "../../../../../config";
import styles from "../../../../../styles/chapter.module.css";
import { ToastContainer, toast } from "react-toastify";
const NewChapter = ({ token, id, StoryTitle, chapters }) => {
  const router = useRouter();
  const editorRef = useRef();
  const [editorLoaded, setEditorLoaded] = useState(false);

  const [chapterNumber, setchapterNumber] = useState();

  const { CKEditor, ClassicEditor } = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, //Added .CKEditor
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setEditorLoaded(true);
  }, []);

  const [title, setTitle] = useState("");
  const [chapterBody, setchapterBody] = useState("");

  const createChapter = async (e) => {
    if (!chapterBody || !title || !chapterNumber) {
      toast.error(`Please fill in all the inputs`);
    } else {
      console.log(chapterBody);

      const res = await fetch(`${API_URL}/chapters`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ChapterTitle: title,
          ChapterBody: chapterBody,
          ChapterNumber: chapterNumber,
          story: id,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 403 || res.status === 401) {
          toast.error(`${data.message}`);
          console.log(data.message);
          return;
        }
        toast.error("Chapter may already have that title");
      } else {
        console.log(data);
        router.push(`/auth/story/story_edit_content/${id}`);
      }
    }
  };
  return (
    <Layout>
      <ToastContainer />
      <div className=" p-4">
        <h1 className="text-4xl font-bold mb-4 ">
          Add new chapter to story {StoryTitle}
        </h1>
        <div className="my-3">
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className=" border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-bg-blue-600 rounded-md"
            required
          />
          <input
            type="number"
            placeholder="Chapter Number"
            onChange={(e) => setchapterNumber(e.target.value)}
            value={chapterNumber}
            className=" border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-bg-blue-600 rounded-md"
            required
          />
        </div>

        {editorLoaded ? (
          <div className={styles.Space}>
            <CKEditor
              editor={ClassicEditor}
              data={`${chapterBody}`}
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                console.log("Editor is ready to use!", editor);
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setchapterBody(data);
                console.log(data);
              }}
            />
          </div>
        ) : (
          <p>Carregando...</p>
        )}
        <button
          className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-800 mt-2"
          onClick={createChapter}
        >
          Publish chapter
        </button>
      </div>
    </Layout>
  );
};

export default NewChapter;

export async function getServerSideProps({ params: { id }, req }) {
  if (req.headers.cookie) {
    const { token } = cookie.parse(req.headers.cookie);

    const res = await fetch(`${API_URL}/stories/${id}`);

    const data = await res.json();

    const StoryTitle = data.StoryTitle;

    const chapters = data.chapters;

    if (token) {
      return { props: { token, id, StoryTitle, chapters } };
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
