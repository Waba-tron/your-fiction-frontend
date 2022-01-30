import React, { useState, useEffect, useRef } from "react";
import cookie from "cookie";
import Layout from "../../../../../components/Layout";
import { API_URL } from "../../../../../config";
import styles from "../../../../../styles/chapter.module.css";
import { ToastContainer, toast } from "react-toastify";
const EditChapter = ({ token, chapter }) => {
  const editorRef = useRef();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [chapterBody, setchapterBody] = useState(`${chapter.ChapterBody}`);
  const [title, setTitle] = useState(chapter.ChapterTitle);
  const [chapterNumber, setchapterNumber] = useState(chapter.ChapterNumber);

  const { CKEditor, ClassicEditor } = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, //Added .CKEditor
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setEditorLoaded(true);
  }, []);

  const updateChapter = async () => {
    if (!title || !chapterBody || !chapterNumber) {
      toast.error(`Please fill in all the inputs`);
    } else {
      const res = await fetch(`${API_URL}/chapters/${chapter.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ChapterTitle: title,
          ChapterBody: chapterBody,
          ChapterNumber: chapterNumber,
          story: chapter.story.id,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        if (res.status === 403 || res.status === 401) {
          toast.error(`${data.message}`);
          console.log(data.message);
          return;
        }
        toast.error("Error");
      } else {
        toast.success(`Chapter was updated`);
      }
    }
  };
  return (
    <Layout>
      <ToastContainer />
      <div className=" bg-gray-50 p-10  flex">
        <div className=" bg-white m-auto w-full">
          <div className="h-2 bg-blue-600 rounded-t-md"></div>
          <div className=" p-6">
            <h1 className="text-4xl font-bold ">Editing Story: {title}</h1>

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
                  data={chapterBody}
                  config={{
                    toolbar: [
                      "heading",
                      "|",
                      "bold",
                      "italic",

                      "bulletedList",
                      "numberedList",
                      "blockQuote",
                    ],
                  }}
                  onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    console.log("Editor is ready to use!", editor);
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setchapterBody(data);
                  }}
                />
              </div>
            ) : (
              <p>Loading...</p>
            )}

            <button
              className="bg-blue-600 my-5 text-white py-2 px-6 rounded-lg  hover:bg-blue-800"
              onClick={updateChapter}
            >
              Update Story
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditChapter;

export async function getServerSideProps({ params: chapterId, req }) {
  const { id } = chapterId;
  if (req.headers.cookie) {
    const { token } = cookie.parse(req.headers.cookie);
    const res = await fetch(`${API_URL}/chapters/${id}`);

    const chapter = await res.json();

    if (token) {
      return { props: { token, chapter } };
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
