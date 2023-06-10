import dynamic from "next/dynamic";
import Seo from "../components/common/seo";
import SignUp from "../components/register";

const Index = () => {
  return (
    <>
      <Seo pageTitle="SignUp" />
      <SignUp />
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });


