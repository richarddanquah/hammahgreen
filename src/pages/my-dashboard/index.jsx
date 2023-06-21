import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import MyDashboard from "../../components/dashboard/my-dashboard";
import { getSession } from "next-auth/react";
import connectDB from "../../lib/connectMongoDB";
import Listing from "../../models/listing";

const Index = ({ propertyListings, waterviewsListings, sorokroListings }) => {
  return (
    <>
      <Seo pageTitle="Dashboard" />
      <MyDashboard
        propertyListings={propertyListings}
        waterviewsListings={waterviewsListings}
        sorokroListings={sorokroListings}
      />
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
  const listings = await Listing.find();
  // console.log(listing.length);

  console.log("FETCHING Waterviews Listings ...");
  const wvlistings = await Listing.find({ location: "Waterviews" });
  console.log(wvlistings);

  console.log("FETCHING Soro Kro Listings ...");
  const sklistings = await Listing.find({ location: "Soro Kro" });
  console.log(sklistings);

  return {
    props: {
      session,
      propertyListings: JSON.parse(JSON.stringify(listings)),
      waterviewsListings: JSON.parse(JSON.stringify(wvlistings)),
      sorokroListings: JSON.parse(JSON.stringify(sklistings)),
    },
  };
}
