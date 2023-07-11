import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import MyProperties from "../../components/dashboard/my-properties";
import connectDB from "../../lib/connectMongoDB";
import Listing from "../../models/listing";
import { useSession } from "next-auth/react";
import ProtectedPage from "../../components/common/ProtectedPage";

const Index = ({ Listings }) => {
  const { data: session } = useSession();
  return (
    <>
      <Seo pageTitle="My Properties" />
      {session && (
        <>
          <MyProperties Listings={Listings} />
        </>
      )}
      {!session && <ProtectedPage />}
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
    const Listings = await Listing.find({});
    console.log("FETCHED DOCUMENTS SUCCESSFULLY ✔");
    console.log(Listings);

    return {
      props: {
        Listings: JSON.parse(JSON.stringify(Listings)),
      },
    };
  } catch (error) {
    console.log(error);
  }
}
