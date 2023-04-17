import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import MyProperties from "../../components/dashboard/my-properties";
import connectDB from "../../lib/connectMongoDB";
import Listing from "../../models/listing";

const Index = ({Listings}) => {
  return (
    <>
      <Seo pageTitle="My Properties" />
      <MyProperties Listings={Listings} />
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
