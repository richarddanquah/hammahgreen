import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import CreateGreenPackage from "../../components/dashboard/create-green-package";
import { useSession, getSession } from "next-auth/react";
import ProtectedPage from "../../components/common/ProtectedPage";

const Index = () => {
  const { data: session, status } = useSession();
  return (
    <>
      <Seo pageTitle="Create a Green Package" />
      {session && (
        <>
          <CreateGreenPackage />
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
