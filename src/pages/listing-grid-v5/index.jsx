import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import GridV5 from "../../components/listing-grid/grid-v5";
import { getSession } from "next-auth/react";
import connectDB from "../../lib/connectMongoDB";
import User from "../../models/user";
import Listing from "../../models/listing";

const index = ({ theUser, waterviewsListings, listings }) => {
  return (
    <>
      <Seo pageTitle="Waterviews Estate Listing" />
      <GridV5 theUser={theUser} waterviewsListings={waterviewsListings} listings={listings} />
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
      const waterviewsListings = await Listing.find({ location: "Waterviews" });
      // console.log(waterviewsListings);
      console.log("FETCHING Listings");
      const listings = await Listing.find({ featured: "Yes" });
      // console.log(listings);

      return {
        props: {
          theUser: JSON.parse(JSON.stringify(user[0])),
          waterviewsListings: JSON.parse(JSON.stringify(waterviewsListings)),
          listings: JSON.parse(JSON.stringify(listings)),
        },
      };
    } else {
      console.log("CONNECTING TO DATABASE...");
      await connectDB();
      console.log("CONNECTED TO DATABASE ✔");

      console.log("FETCHING Listing...");
      const waterviewsListings = await Listing.find({ location: "Waterviews" });
      console.log(waterviewsListings);
      console.log("FETCHING Listings");
      const listings = await Listing.find({ featured: "Yes" });
      console.log(listings);

      return {
        props: {
          waterviewsListings: JSON.parse(JSON.stringify(waterviewsListings)),
          listings: JSON.parse(JSON.stringify(listings)),
        },
      };
    }
  } catch (error) {}
}
