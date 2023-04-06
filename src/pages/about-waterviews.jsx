import dynamic from "next/dynamic";
import Seo from "../components/common/seo";
import Waterviews from "../components/waterviews";

const index = () => {
    return (
        <>
            <Seo pageTitle="Site" />
            <Waterviews />
        </>
    );
}

export default dynamic(() => Promise.resolve(index), { ssr: false });