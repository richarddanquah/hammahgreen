import dynamic from "next/dynamic";
import Seo from "../components/common/seo";
import ComingSoon from "../components/comingsoon"

const index = () => {
    return (
        <>
            <Seo pageTitle="Coming Soon" />
            <ComingSoon />
        </>
    );
}

export default dynamic(() => Promise.resolve(index), { ssr: false });