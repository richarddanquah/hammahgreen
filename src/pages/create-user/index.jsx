import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import CreateUser from "../../components/dashboard/create-user";
import connectDB from "../../lib/connectMongoDB";
import User from "../../models/user";
import { useSession, getSession } from "next-auth/react";
import ProtectedPage from "../../components/common/ProtectedPage";

const Index = ({ theUser, Users }) => {
  const { data: session, status } = useSession();
  return (
    <>
      <Seo pageTitle="Add User" />
      {(session && theUser.role === "Admin") || theUser.role === "Agent" ? (
        <CreateUser Users={Users} />
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
    const Users = await User.find({});
    console.log("FETCHED DOCUMENTS SUCCESSFULLY ✔");
    // console.log(Users);

    return {
      props: {
        theUser: JSON.parse(JSON.stringify(user[0])),
        Users: JSON.parse(JSON.stringify(Users)),
        session,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
