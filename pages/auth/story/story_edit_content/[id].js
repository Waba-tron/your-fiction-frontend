import React from "react";
import Layout from "../../../../components/Layout";
import { API_URL } from "../../../../config";
import StorySubNav from "../../../../components/StorySubNav";
import { AiOutlineDelete } from "react-icons/ai";
import { BsPencilSquare } from "react-icons/bs";
import ChapterRow from "../../../../components/ChapterRow";
import Link from "next/link";
import { useRouter } from "next/router";
const StoryEditContent = ({ chapters, storyTitle, id }) => {
  const router = useRouter();
  return (
    <Layout>
      <div className=" p-4">
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
              {chapters.map((chapter) => (
                <>
                  <ChapterRow id={chapter.id} chapter={chapter} />
                </>
              ))}
            </tbody>
          </table>
          <button
            className="bg-blue-600 text-white py-2 px-6 rounded-lg"
            onClick={() =>
              router.push(`/auth/story/chapters/new_chapter/${id}`)
            }
          >
            Post new Chapter
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default StoryEditContent;

export async function getServerSideProps(context) {
  const { id } = context.params;

  const res = await fetch(`${API_URL}/stories/${id}`);

  const data = await res.json();

  const chapters = data.chapters.sort(function (a, b) {
    return a.ChapterNumber - b.ChapterNumber;
  });

  const storyTitle = data.StoryTitle;

  return {
    props: { chapters, storyTitle, id },
  };
}
