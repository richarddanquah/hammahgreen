import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import { getSession } from "next-auth/react";
import EditListing from "../../components/dashboard/edit-listing";

const Index = () => {
  return (
    <>
      <Seo pageTitle="Edit Listing" />
      <EditListing />
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });

export async function getServerSideProps(context) {
  const session = await getSession(context);

  console.log(session);

  return {
    props: {
      session,
    },
  };
}
