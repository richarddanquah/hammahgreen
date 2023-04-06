import dynamic from "next/dynamic";
import Seo from "../components/common/seo";
import HomeMain from "../components/home";
import Home10 from "../components/home-10";

const index = () => {
  return (
    <>
      <Seo pageTitle="Home" />
      {/* <HomeMain /> */}
      <Home10 />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
