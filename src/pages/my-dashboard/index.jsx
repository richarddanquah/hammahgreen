import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import MyDashboard from "../../components/dashboard/my-dashboard";
import { useSession, getSession } from "next-auth/react";
import connectDB from "../../lib/connectMongoDB";
import Listing from "../../models/listing";
import User from "../../models/user";
import ProtectedPage from "../../components/common/ProtectedPage";

const Index = ({
  user,
  propertyListings,
  waterviewsListings,
  sorokroListings,
}) => {
  const { data: session, status } = useSession();

  return (
    <>
      <Seo pageTitle="Admin Dashboard" />
      {session && user.role === "Admin" || user.role === "Agent" ? (
        <>
          <MyDashboard
            user={user}
            propertyListings={propertyListings}
            waterviewsListings={waterviewsListings}
            sorokroListings={sorokroListings}
          />
        </>
      ) : <ProtectedPage />}
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });

export async function getServerSideProps(context) {
  const session = await getSession(context);
  // console.log(session);

  if (session) {
    console.log("CONNECTING TO DATABASE...");
    await connectDB();
    console.log("CONNECTED TO DATABASE ✔");

    console.log("FETCHING User...");
    const user = await User.find({ email: session.user.email });
    console.log("FETCHED USER SUCCESSFULLY ✔");
    console.log(user[0]);

    console.log("FETCHING Listing...");
    const listings = await Listing.find();
    // console.log(listing.length);

    console.log("FETCHING Waterviews Listings ...");
    const wvlistings = await Listing.find({ location: "Waterviews" });
    // console.log(wvlistings);

    console.log("FETCHING Soro Kro Listings ...");
    const sklistings = await Listing.find({ location: "Soro Kro" });
    // console.log(sklistings);

    return {
      props: {
        session,
        user: JSON.parse(JSON.stringify(user[0])),
        propertyListings: JSON.parse(JSON.stringify(listings)),
        waterviewsListings: JSON.parse(JSON.stringify(wvlistings)),
        sorokroListings: JSON.parse(JSON.stringify(sklistings)),
      },
    };
  } else {
    return {
      props: {},
    };
  }
}
