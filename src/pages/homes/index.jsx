import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import GridV6 from "../../components/listing-grid/grid-v6";
import connectDB from "../../lib/connectMongoDB";
import Listing from "../../models/listing";

const index = ({ homes, listings }) => {
  return (
    <>
      {/* <Seo pageTitle="Simple Listing – Grid V6" /> */}
      <Seo pageTitle="Homes" />
      <GridV6 homes={homes} listings={listings}/>
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });

export async function getServerSideProps(context) {
  console.log("CONNECTING TO DATABASE...");
  await connectDB();
  console.log("CONNECTED TO DATABASE ✔");

  console.log("FETCHING Listing For Homes...");
  const homes = await Listing.find({ type: "House" });
  // console.log(homes);
  console.log("FETCHING Listings");
  const listings = await Listing.find({});
  console.log(listings);

  return {
    props: {
      homes: JSON.parse(JSON.stringify(homes)),
      listings: JSON.parse(JSON.stringify(listings)),
    },
  };
}
