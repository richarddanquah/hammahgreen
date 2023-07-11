import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import AgentDetails from "../../components/agent-details";

const Index = () => {
  return (
    <>
      <Seo pageTitle="Agent Details" />
      <AgentDetails />
    </>
  );
};

export default dynamic(() => Promise.resolve(ndex), { ssr: false });
