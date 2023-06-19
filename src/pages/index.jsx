import dynamic from "next/dynamic";
import Seo from "../components/common/seo";
import HomeMain from "../components/home";
import Home10 from "../components/home-10";
import { getSession } from "next-auth/react";
import connectDB from "../lib/connectMongoDB";
import User from "../models/user";
import Listing from "../models/listing";

const index = ({ theUser, propertyListings, homepageheaderlistings }) => {
  return (
    <>
      <Seo pageTitle="Home" />
      {/* <HomeMain /> */}
      <Home10
        theUser={theUser}
        propertyListings={propertyListings}
        homepageheaderlistings={homepageheaderlistings}
      />
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
      console.log(user[0]);

      console.log("FETCHING Featured Listings...");
      const listing = await Listing.find({ featured: "Yes" });
      // console.log(listing);

      console.log("FETCHING Listings for Homepage Header...");
      const homepageheader = await Listing.find({
        homepageheader: "Yes",
      });
      // console.log(homepageheader);

      return {
        props: {
          theUser: JSON.parse(JSON.stringify(user[0])),
          propertyListings: JSON.parse(JSON.stringify(listing)),
          homepageheaderlistings: JSON.parse(JSON.stringify(homepageheader)),
          session,
        },
      };
    } else if (!session) {
      console.log("CONNECTING TO DATABASE...");
      await connectDB();
      console.log("CONNECTED TO DATABASE ✔");

      console.log("FETCHING Featured Listings...");
      const listing = await Listing.find({ featured: "Yes" });
      // console.log(listing);

      console.log("FETCHING Listings for Homepage Header...");
      const homepageheader = await Listing.find({
        homepageheader: "Yes",
      });
      // console.log(homepageheader);

      return {
        props: {
          propertyListings: JSON.parse(JSON.stringify(listing)),
          homepageheaderlistings: JSON.parse(JSON.stringify(homepageheader)),
        },
      };
    }
  } catch (error) {
    console.log(error);
  }
}
