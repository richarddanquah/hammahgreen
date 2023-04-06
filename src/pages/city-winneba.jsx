import dynamic from "next/dynamic";
import Seo from "../components/common/seo";
import Winneba from "../components/winneba";

const index = () => {
    return (
        <>
            <Seo pageTitle="City-Winneba" />
            <Winneba />
        </>
    );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });