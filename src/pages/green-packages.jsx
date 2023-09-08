import dynamic from "next/dynamic";
import Seo from "../components/common/seo";
import Membership from "../components/membership";
import { getSession } from "next-auth/react";
import connectDB from "../lib/connectMongoDB";
import User from "../models/user";

const Index = ({ theUser }) => {
  return (
    <>
      <Seo pageTitle="Green Packages" />
      <Membership theUser={theUser} />
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

      console.log("FETCHING User...");
      const user = await User.find({ email: sessionEmail });
      console.log("FETCHED USER SUCCESSFULLY ✔");
      console.log(user[0]);

      return {
        props: {
          theUser: JSON.parse(JSON.stringify(user[0])),
        },
      };
    } else if (!session) {
      return {
        props: {
          allusers: JSON.parse(JSON.stringify({})),
        },
      };
    }
  } catch (error) {
    console.log(error);
  }
}
