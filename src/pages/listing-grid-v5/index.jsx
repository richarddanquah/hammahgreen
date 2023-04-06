import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import GridV5 from "../../components/listing-grid/grid-v5";

const index = () => {
  return (
    <>
      <Seo pageTitle="Waterviews Estate Listing" />
      <GridV5 />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
