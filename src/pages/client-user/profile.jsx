import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import Profile from "../../components/client-dashboard/profile";
import { useSession, getSession } from "next-auth/react";
import connectDB from "../../lib/connectMongoDB";
import User from "../../models/user";
import ProtectedPage from "../../components/common/ProtectedPage";

const Index = ({ theUser }) => {
  const { data: session } = useSession();

  return (
    <>
      <Seo pageTitle="Client Profile" />
      {session && theUser.role === "User" ? (
        <Profile theUser={theUser} />
      ) : (
        <ProtectedPage />
      )}
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    const sessionEmail = session.user.email;
    // console.log(session);

    try {
      console.log("CONNECTING TO DATABASE...");
      await connectDB();
      console.log("CONNECTED TO DATABASE ✔");

      console.log("FETCHING User...");
      const user = await User.find({ email: sessionEmail });
      console.log("FETCHED USER SUCCESSFULLY ✔");
      // console.log(user[0]);

      return {
        props: {
          theUser: JSON.parse(JSON.stringify(user[0])),
          session,
        },
      };
    } catch (error) {
      console.log(error);
    }
  } else {
    return {
      props: {
        null: JSON.parse(JSON.stringify({})),
      },
    };
  }
}
