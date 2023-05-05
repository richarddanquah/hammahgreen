import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import EditListing from "../../components/dashboard/edit-listing";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import connectDB from "../../lib/connectMongoDB";
import Listing from "../../models/listing";


let listingID;

const Index = ({ theListing }) => {
  const route = useRouter();
  listingID = route.query.index;

  console.log(listingID);

  return (
    <>
      <Seo pageTitle="Edit Listing" />
      <EditListing theListing={theListing} />
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });

export async function getServerSideProps(context) {
  const session = await getSession(context);

  console.log("CONNECTING TO DATABASE...");
  await connectDB();
  console.log("CONNECTED TO DATABASE ✔");

  console.log(context.query.index);
  
  console.log("FETCHING Listing...");
  const foundListing = await Listing.find({_id: context.query.index});
  console.log(foundListing);

  return {
    props: {
      session,
      theListing: JSON.parse(JSON.stringify(foundListing[0])),
    },
  };

}
