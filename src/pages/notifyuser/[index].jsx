import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import NotifyUser from "../../components/dashboard/notify-user"
import { getSession } from "next-auth/react";

const Index = () => {
  return (
    <>
      <Seo pageTitle="Notify A User" />
      <NotifyUser />
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });

export async function getServerSideProps(context){
    const session = await getSession(context);
  
    console.log(session);
  
    return {
      props: {
        session,
      }
    }
  }
