import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import GridV6 from "../../components/listing-grid/grid-v6";
import { getSession } from "next-auth/react";
import connectDB from "../../lib/connectMongoDB";
import User from "../../models/user";
import Listing from "../../models/listing";

const Index = ({ theUser, homes, listings }) => {
  return (
    <>
      {/* <Seo pageTitle="Simple Listing – Grid V6" /> */}
      <Seo pageTitle="Homes" />
      <GridV6 theUser={theUser} homes={homes} listings={listings} />
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });

export async function getServerSideProps(context) {
  const session = await getSession(context);

  try {
    if (session) {
      const sessionEmail = session.user.email;

      console.log("CONNECTING TO DATABASE...");
      await connectDB();
      console.log("CONNECTED TO DATABASE ✔");

      console.log("FETCHING Listing For Homes...");
      const homes = await Listing.find({});
      // console.log(homes);
      console.log("FETCHING Listings");
      const listings = await Listing.find({ featured: "Yes" });
      console.log(listings);

      console.log("FETCHING User...");
      const user = await User.find({ email: sessionEmail });
      console.log("FETCHED USER SUCCESSFULLY ✔");
      // console.log(user[0]);

      return {
        props: {
          homes: JSON.parse(JSON.stringify(homes)),
          listings: JSON.parse(JSON.stringify(listings)),
          theUser: JSON.parse(JSON.stringify(user[0])),
        },
      };
    } else {
      console.log("CONNECTING TO DATABASE...");
      await connectDB();
      console.log("CONNECTED TO DATABASE ✔");

      console.log("FETCHING Listing For Homes...");
      const homes = await Listing.find({});
      // console.log(homes);
      console.log("FETCHING Listings");
      const listings = await Listing.find({ featured: "Yes" });
      console.log(listings);

      return {
        props: {
          homes: JSON.parse(JSON.stringify(homes)),
          listings: JSON.parse(JSON.stringify(listings)),
        },
      };
    }
  } catch (error) {
    console.log(error);
  }
}
