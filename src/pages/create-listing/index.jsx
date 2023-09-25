import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import CreateListing from "../../components/dashboard/create-listing";
import { useSession, getSession } from "next-auth/react";
import ProtectedPage from "../../components/common/ProtectedPage";
import connectDB from "../../lib/connectMongoDB";
import User from "../../models/user";

const Index = ({ theUser }) => {
  const { data: session, status } = useSession();
  return (
    <>
      <Seo pageTitle="Create Listing" />
      {session && theUser.role === "Admin" || theUser.role === "Agent"  ? <CreateListing /> : <ProtectedPage />}
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });

export async function getServerSideProps(context) {
  const session = await getSession(context);

  console.log("CONNECTING TO DATABASE...");
  await connectDB();
  console.log("CONNECTED TO DATABASE ✔");

  console.log("FETCHING User...");
  const user = await User.find({ email: session.user.email });
  console.log("FETCHED USER SUCCESSFULLY ✔");
  console.log(user[0]);

  return {
    props: {
      theUser: JSON.parse(JSON.stringify(user[0])),
      session,
    },
  };
}
