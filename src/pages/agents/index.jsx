import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import AgentV2 from "../../components/agent-view/agent-v2";
import connectDB from "../../lib/connectMongoDB";
import Listing from "../../models/listing";
import User from "../../models/user";

const Index = ({ featuredListings, allAgents }) => {
  console.log(allAgents);
  return (
    <>
      <Seo pageTitle="Simple Listing – Agent V2" />
      <AgentV2 featuredListings={featuredListings} allAgents={allAgents} />
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });

export async function getServerSideProps(context) {
  console.log("CONNECTING TO DATABASE...");
  await connectDB();
  console.log("CONNECTED TO DATABASE ✔");

  console.log("FETCHING Featured Listings...");
  const listing = await Listing.find({ featured: "Yes" });
  // console.log(listing);

  console.log("FETCHING All Agents...");
  const agents = await User.find({ role: "Agent" });
  console.log(agents);

  return {
    props: {
      featuredListings: JSON.parse(JSON.stringify(listing)),
      allAgents: JSON.parse(JSON.stringify(agents)),
    },
  };
}
