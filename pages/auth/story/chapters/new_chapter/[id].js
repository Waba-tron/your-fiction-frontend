import React, { useState, useEffect, useRef } from "react";
import Layout from "../../../../../components/Layout";
import { useRouter } from "next/router";
import cookie from "cookie";
import { API_URL } from "../../../../../config";
import styles from "../../../../../styles/chapter.module.css";
import { ToastContainer, toast } from "react-toastify";
const NewChapter = ({ token }) => {
  const router = useRouter();
  const editorRef = useRef();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, //Added .CKEditor
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setEditorLoaded(true);
  }, []);
  const [title, setTitle] = useState("");
  const [data, setData] = useState("");

  const createChapter = async (e) => {
    if (!data || !title) {
      toast.error(`Please fill in all the inputs`);
    } else {
      const res = await fetch(`${API_URL}/chapters`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ChapterTitle: title,
          ChapterBody: data,
          ChapterNumber: 4,
          story: 5,
        }),
      });

      if (!res.ok) {
        if (res.status === 403 || res.status === 401) {
          toast.error("Unauthorized");
          return;
        }
        toast.error("Chapter may already have that title");
      } else {
        router.push(`/auth/story/story_edit_content/5`);
      }
    }
  };
  return (
    <Layout>
      <ToastContainer />
      <div className=" p-4">
        <h1 className="text-4xl font-bold mb-4 ">Add new chapter to story</h1>
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className=" border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-bg-blue-600 rounded-md"
          required
        />
        {editorLoaded ? (
          <div className={styles.Space}>
            <CKEditor
              editor={ClassicEditor}
              data={data}
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                console.log("Editor is ready to use!", editor);
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setData(data);
              }}
            />
          </div>
        ) : (
          <p>Carregando...</p>
        )}
        <button onClick={createChapter}>Publish chapter</button>
      </div>
    </Layout>
  );
};

export default NewChapter;

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
