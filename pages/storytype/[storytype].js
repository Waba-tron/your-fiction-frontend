import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import TitleCards from "../../components/TitleCards";
const StoryType = ({ match, titles }) => {
  const router = useRouter();

  const { storytype } = router.query;

  const test = (e) => {
    router.push("/stories/1");
  };

  return (
    <Layout>
      <div className="p-5">
        <h1 className=" text-center text-5xl mb-5 font-light">
          Browse our {storytype} titles
        </h1>
        <div className="grid md:grid-cols-4 gap-4 sm:grid-cols-2">
          {titles.map((title) => (
            <TitleCards title={title} key={title.id} />
            /*
              <div className="grid md:grid-cols-4 gap-9 mt-6 sm:grid-cols-1">
            <div
              className="  m-auto text-center shadow-sm p-10 border-l-2 border-blue-600 truncate w-60 px-6 py-4 mx-auto bg-indigo-200 text-indigo-500 font-medium rounded-lg "
              onClick={test}
            >
              <p className=" text-base overflow-ellipsis overflow-hidden ...">
                {title.Title}
              </p>
          </div>
          */
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default StoryType;

export async function getServerSideProps(context) {
  console.log(context.params);
  const { storytype } = context.params;
  const res = await fetch(
    `http://localhost:1337/titles?story_type.Type=${storytype}`
  );

  const titles = await res.json();

  return {
    props: { titles },
  };
}
