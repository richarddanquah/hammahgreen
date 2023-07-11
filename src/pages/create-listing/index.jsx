import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import CreateListing from "../../components/dashboard/create-listing";
import { useSession, getSession } from "next-auth/react";
import Link from "next/link";
import ProtectedPage from "../../components/common/ProtectedPage";

const Index = () => {
  const { data: session, status } = useSession();
  return (
    <>
      <Seo pageTitle="Create Listing" />
      {session && (
        <>
          <CreateListing />
        </>
      )}
      {!session && <ProtectedPage />}
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
