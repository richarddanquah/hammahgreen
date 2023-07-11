import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import CreateUser from "../../components/dashboard/create-user";
import connectDB from "../../lib/connectMongoDB";
import User from "../../models/user";
import { useSession } from "next-auth/react";
import ProtectedPage from "../../components/common/ProtectedPage";

const Index = ({ Users }) => {
  const { data: session, status } = useSession();
  return (
    <>
      <Seo pageTitle="Add User" />
      {session && (
        <>
          <CreateUser Users={Users} />
        </>
      )}
      {!session && (
        <ProtectedPage />
      )}
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });

export async function getServerSideProps() {
  try {
    console.log("CONNECTING TO DATABASE...");
    await connectDB();
    console.log("CONNECTED TO DATABASE ✔");

    console.log("FETCHING DOCUMENTS...");
    const Users = await User.find({});
    console.log("FETCHED DOCUMENTS SUCCESSFULLY ✔");
    console.log(Users);

    return {
      props: {
        Users: JSON.parse(JSON.stringify(Users)),
      },
    };
  } catch (error) {
    console.log(error);
  }
}
