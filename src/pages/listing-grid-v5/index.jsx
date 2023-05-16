import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import GridV5 from "../../components/listing-grid/grid-v5";
import connectDB from "../../lib/connectMongoDB";
import Listing from "../../models/listing";

const index = ({ waterviewsListings, listings }) => {
  return (
    <>
      <Seo pageTitle="Waterviews Estate Listing" />
      <GridV5 waterviewsListings={waterviewsListings} listings={listings} />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });

export async function getServerSideProps(context) {
  console.log("CONNECTING TO DATABASE...");
  await connectDB();
  console.log("CONNECTED TO DATABASE ✔");

  console.log("FETCHING Listing...");
  const waterviewsListings = await Listing.find({ location: "Waterviews" });
  console.log(waterviewsListings);
  console.log("FETCHING Listings");
  const listings = await Listing.find({featured: "Yes"});
  console.log(listings);

  return {
    props: {
      waterviewsListings: JSON.parse(JSON.stringify(waterviewsListings)),
      listings: JSON.parse(JSON.stringify(listings)),
    },
  };
}
