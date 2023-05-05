import dynamic from "next/dynamic";
import Seo from "../components/common/seo";
import HomeMain from "../components/home";
import Home10 from "../components/home-10";
import { getSession } from "next-auth/react";
import connectDB from "../lib/connectMongoDB";
import User from "../models/user";
import Listing from "../models/listing";

const index = ({ theUser, propertyListings }) => {
  return (
    <>
      <Seo pageTitle="Home" />
      {/* <HomeMain /> */}
      <Home10 theUser={theUser} propertyListings={propertyListings} />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });

export async function getServerSideProps(context) {
  const session = await getSession(context);
  

  try {
    if (session) {
      const sessionEmail = session.user.email;

      console.log("CONNECTING TO DATABASE...");
      await connectDB();
      console.log("CONNECTED TO DATABASE ✔");

      console.log("FETCHING User...");
      const user = await User.find({ email: sessionEmail });
      console.log("FETCHED USER SUCCESSFULLY ✔");
      // console.log(user[0]);

      console.log("FETCHING Listing...");
      const listing = await Listing.find();
      // console.log(listing);

      return {
        props: {
          theUser: JSON.parse(JSON.stringify(user[0])),
          propertyListings: JSON.parse(JSON.stringify(listing)),
          session,
        },
      };
      
    } else if (!session) {
      console.log("CONNECTING TO DATABASE...");
      await connectDB();
      console.log("CONNECTED TO DATABASE ✔");

      console.log("FETCHING Listing...");
      const listing = await Listing.find();
      // console.log(listing);

      return {
        props: {
          propertyListings: JSON.parse(JSON.stringify(listing)),
        },
      };
    }
  } catch (error) {
    console.log(error);
  }
}
