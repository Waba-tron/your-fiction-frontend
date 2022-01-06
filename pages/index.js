import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout";
import { BiBookReader, BiCameraMovie } from "react-icons/bi";
import { BsEmojiHeartEyes } from "react-icons/bs";
import { FiBook } from "react-icons/fi";
import { FaGamepad, FaPhotoVideo } from "react-icons/fa";
import { GiSpiderMask } from "react-icons/gi";
import { MdOutlineChildCare } from "react-icons/md";
import MenuType from "../components/MenuType";
import Test from "../components/test";
export default function Home() {
  return (
    <Layout>
      {
        <div className="mt-8 bg-white shadow-sm">
          <div className="h-2 bg-blue-600"></div>
          <div className="p-10">
            <div className="flex items-center flex-shrink-0  mr-6 text-4xl">
              <BiBookReader />
              <span className=" text-xl ml-4">Fanfiction</span>
            </div>

            <div className="grid md:grid-cols-4 gap-4 mt-2 sm:grid-cols-1 font-press-start">
              <MenuType icon={<BsEmojiHeartEyes size="32" />} type={"Anime"} />
              <MenuType icon={<FiBook size="32" />} type={"Books"} />

              <MenuType icon={<FaGamepad size="32" />} type={"Games"} />
              <MenuType icon={<GiSpiderMask size="32" />} type={"Comics"} />
              <MenuType icon={<BiCameraMovie size="32" />} type={"Movies"} />
              <MenuType icon={<FaPhotoVideo size="32" />} type={"Tv"} />

              <MenuType
                icon={<MdOutlineChildCare size="32" />}
                type={"Cartoons"}
              />
            </div>
          </div>
          <Test />
        </div>
      }
    </Layout>
  );
}
