import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import MyDashboard from "../../components/dashboard/my-dashboard";
import { getSession } from "next-auth/react";
import connectDB from "../../lib/connectMongoDB";
import Listing from "../../models/listing";

const Index = ({propertyListings}) => {
  return (
    <>
      <Seo pageTitle="Dashboard" />
      <MyDashboard propertyListings={propertyListings} />
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });

export async function getServerSideProps(context) {
  const session = await getSession(context);
  // console.log(session);

  console.log("CONNECTING TO DATABASE...");
  await connectDB();
  console.log("CONNECTED TO DATABASE ✔");

  console.log("FETCHING Listing...");
  const listing = await Listing.find();
  console.log(listing.length);

  return {
    props: {
      session,
      propertyListings: JSON.parse(JSON.stringify(listing)),
    },
  };
}
