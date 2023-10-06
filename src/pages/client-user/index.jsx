import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import Dashboard from "../../components/client-dashboard/main";
import { useSession, getSession } from "next-auth/react";
import connectDB from "../../lib/connectMongoDB";
import User from "../../models/user";
import Notification from "../../models/notificaiton";
import ProtectedPage from "../../components/common/ProtectedPage";

const Index = ({ theUser, userNotifications }) => {
  const { data: session } = useSession();

  return (
    <>
      <Seo pageTitle="Client Profile Dashboard" />
      {session && theUser.role === "User" ? (
        <Dashboard theUser={theUser} userNotifications={userNotifications} />
      ) : (
        <ProtectedPage />
      )}
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });

export async function getServerSideProps(context) {
  const session = await getSession(context);

  try {
    console.log("CONNECTING TO DATABASE...");
    await connectDB();
    console.log("CONNECTED TO DATABASE ✔");

    console.log("FETCHING User...");
    const user = await User.find({ email: session.user.email });
    console.log("FETCHED USER SUCCESSFULLY ✔");
    // console.log(user[0]);

    console.log("FETCHING Notifications...");
    const notificaiton = await Notification.find({ to: session.user.email });
    console.log("FETCHED SUCCESSFULLY ✔");
    console.log(notificaiton);

    return {
      props: {
        theUser: JSON.parse(JSON.stringify(user[0])),
        userNotifications: JSON.parse(JSON.stringify(notificaiton)),
        session,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
