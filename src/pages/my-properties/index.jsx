import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import MyProperties from "../../components/dashboard/my-properties";
import { useSession, getSession } from "next-auth/react";
import connectDB from "../../lib/connectMongoDB";
import User from "../../models/user";
import Listing from "../../models/listing";
import ProtectedPage from "../../components/common/ProtectedPage";

const Index = ({ theUser, Listings }) => {
  const { data: session } = useSession();
  return (
    <>
      <Seo pageTitle="My Properties" />
      {(session && theUser.role === "Admin") || theUser.role === "Agent" ? (
        <MyProperties Listings={Listings} />
      ) : (
        <ProtectedPage />
      )}
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });

export async function getServerSideProps(context) {
  try {
    const session = await getSession(context);

    console.log("CONNECTING TO DATABASE...");
    await connectDB();
    console.log("CONNECTED TO DATABASE ✔");

    console.log("FETCHING User...");
    const user = await User.find({ email: session.user.email });
    console.log("FETCHED USER SUCCESSFULLY ✔");
    console.log(user[0]);

    console.log("FETCHING DOCUMENTS...");
    const Listings = await Listing.find({});
    console.log("FETCHED DOCUMENTS SUCCESSFULLY ✔");
    // console.log(Listings);

    return {
      props: {
        theUser: JSON.parse(JSON.stringify(user[0])),
        Listings: JSON.parse(JSON.stringify(Listings)),
        session,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
