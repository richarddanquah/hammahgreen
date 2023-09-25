import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import CreateGreenPackage from "../../components/dashboard/create-green-package";
import { useSession, getSession } from "next-auth/react";
import ProtectedPage from "../../components/common/ProtectedPage";
import connectDB from "../../lib/connectMongoDB";
import User from "../../models/user";
import Package from "../../models/greenpackages";

const Index = ({ theUser, greenpackages }) => {
  const { data: session, status } = useSession();
  return (
    <>
      <Seo pageTitle="Create a Green Package" />
      {session && theUser.role === "Admin" ? (
        <CreateGreenPackage greenpackages={greenpackages} />
      ) : (
        <ProtectedPage />
      )}
      {/* {session && (
        <>
          <CreateGreenPackage />
        </>
      )}
      {!session && <ProtectedPage />} */}
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

    console.log("FETCHING Packages...");
    const packages = await Package.find({});
    console.log("FETCHED PACKAGES SUCCESSFULLY ✔");
    // console.log(packages);

    return {
      props: {
        theUser: JSON.parse(JSON.stringify(user[0])),
        greenpackages: JSON.parse(JSON.stringify(packages)),
        session,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
