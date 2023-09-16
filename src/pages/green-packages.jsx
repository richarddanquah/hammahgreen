import dynamic from "next/dynamic";
import Seo from "../components/common/seo";
import Membership from "../components/membership";
import { getSession } from "next-auth/react";
import connectDB from "../lib/connectMongoDB";
import User from "../models/user";
import Package from "../models/greenpackages";

const Index = ({ theUser, greenpackages }) => {
  return (
    <>
      <Seo pageTitle="Green Packages" />
      <Membership theUser={theUser} greenpackages={greenpackages} />
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
      // console.log(user[0]);

      console.log("FETCHING Packages...");
      const packages = await Package.find({});
      console.log("FETCHED PACKAGES SUCCESSFULLY ✔");
      // console.log(packages);

      return {
        props: {
          theUser: JSON.parse(JSON.stringify(user[0])),
          greenpackages: JSON.parse(JSON.stringify(packages)),
        },
      };
    } else if (!session) {
      console.log("CONNECTING TO DATABASE...");
      await connectDB();
      console.log("CONNECTED TO DATABASE ✔");

      console.log("FETCHING Packages...");
      const packages = await Package.find({});
      console.log("FETCHED PACKAGES SUCCESSFULLY ✔");
      // console.log(packages);
      return {
        props: {
          allusers: JSON.parse(JSON.stringify({})),
          greenpackages: JSON.parse(JSON.stringify(packages)),
        },
      };
    }
  } catch (error) {
    console.log(error);
  }
}
