import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import Notifications from "../../components/client-dashboard/notifications";
import { getSession } from "next-auth/react";
import connectDB from "../../lib/connectMongoDB";
import User from "../../models/user";
import Notification from "../../models/notificaiton";

const index = ({ theUser, userNotifications }) => {
  return (
    <>
      <Seo pageTitle="Client Profile" />
      <Notifications theUser={theUser} userNotifications={userNotifications} />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    const sessionEmail = session.user.email;
    console.log(session);

    try {
      console.log("CONNECTING TO DATABASE...");
      await connectDB();
      console.log("CONNECTED TO DATABASE ✔");

      console.log("FETCHING User...");
      const user = await User.find({ email: sessionEmail });
      console.log("FETCHED USER SUCCESSFULLY ✔");
      // console.log(user[0]);

      console.log("FETCHING Notifications...");
      const notificaiton = await Notification.find({ to: sessionEmail });
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
  } else {
    return {
      props: {
        null: {},
      },
    };
  }
}