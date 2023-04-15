import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import MyDashboard from "../../components/dashboard/my-dashboard";

const Index = () => {
  return (
    <>
      <Seo pageTitle="Dashboard" />
      <MyDashboard />
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
