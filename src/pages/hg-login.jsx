import dynamic from "next/dynamic";
import Seo from "../components/common/seo";
import AdminLogin from "../components/admin-login";

const index = () => {
  return (
    <>
      <Seo pageTitle="Administrator - login" />
      <AdminLogin />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
