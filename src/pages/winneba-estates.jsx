import dynamic from "next/dynamic";
import Seo from "../components/common/seo";
import WinnebaEstates from "../components/winneba-estates";

const index = () => {
  return (
    <>
      <Seo pageTitle="About Us" />
      <WinnebaEstates />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
