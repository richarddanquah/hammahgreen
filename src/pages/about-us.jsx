import dynamic from "next/dynamic";
import Seo from "../components/common/seo";
import AboutUs from "../components/about-us";
import { getSession } from "next-auth/react";
import connectDB from "../lib/connectMongoDB";
import User from "../models/user";

const Index = ({ theUser }) => {
  return (
    <>
      <Seo pageTitle="About Us" />
      <AboutUs theUser={theUser} />
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const sessionEmail = session.user.email;
  console.log(session);

  try {
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
  } catch (error) {
    console.log(error);
  }
}
