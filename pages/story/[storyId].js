import React, { useState, useEffect, useContext } from "react";
import Layout from "../../components/Layout";
import router from "next/router";
import ReviewContext from "../../context/ReviewContext";
import parse from "html-react-parser";
import styles from "../../styles/chapter.module.css";
const Story = ({ story }) => {
  const [select, setselect] = useState(1);
  const [chapters, setchapters] = useState(
    story.chapters.sort(function (a, b) {
      return a.ChapterNumber - b.ChapterNumber;
    })
  );
  const [chosenChapter, setchosenChapter] = useState();
  const { formData, setreviewData } = useContext(ReviewContext);

  return (
    <Layout>
      <div className="p-7 bg-gray-100 min-h-screen">
        <div className="flex justify-between">
          <h1 className="mt-auto mb-auto text-4xl font-bold ">
            {story.StoryTitle}
          </h1>
          <div>
            <select
              class="form-select block w-50 mt-1"
              onChange={(e) => {
                setselect(e.target.value);
              }}
            >
              {story.chapters.map((chapter) => (
                <option value={chapter.ChapterNumber}>
                  {chapter.ChapterNumber}. {chapter.ChapterTitle}
                </option>
              ))}
            </select>
            <button
              className=" bg-blue-600"
              onClick={() => {
                formData(select);
                router.push("/reviews/create");
              }}
            >
              Review{" "}
            </button>
          </div>
        </div>
        {chapters
          .filter((chapter) => chapter.ChapterNumber == select)
          .map((chapter) => (
            <div className="shadow-sm bg-white  rounded mt-5 p-2">
              <h1 className="text-xl ">{chapter.ChapterTitle}</h1>

              <p className={styles.space}>{parse(chapter.ChapterBody)}</p>
            </div>
          ))}
      </div>
    </Layout>
  );
};

export default Story;

export async function getServerSideProps(context) {
  console.log(context.params);
  const { storyId } = context.params;
  const res = await fetch(`http://localhost:1337/stories/${storyId}`);

  const story = await res.json();

  return {
    props: { story },
  };
}
