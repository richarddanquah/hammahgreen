import featureProContent from "../../../data/properties";
import { useState } from "react";
import Slider from "react-slick";
import Link from "next/link";

const FeatureProperties = ({ listings }) => {
  // console.log(listings);
  const [changeID, setchangeID] = useState(null);

  const settings = {
    dots: true,
    arrows: false,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    speed: 1000,
  };

  return (
    <>
      <Slider {...settings} arrows={false}>
        {listings?.slice(0, 5).map((item) => (
          <div className="item" key={item._id}>
            <div className="feat_property home7">
              <div className="thumb">
                <img
                  className="img-whp"
                  src={item.mainImage}
                  alt="properties identity"
                />

                <div className="thmb_cntnt">
                  <ul className="tag mb0">
                    <li className="list-inline-item">
                      <a>{item.saleTag}</a>
                    </li>
                    {item.featured === "Yes" && (
                      <li className="list-inline-item">
                        <a>Featured</a>
                      </li>
                    )}
                  </ul>
                  <a className="fp_price">
                    ${item.price}
                    {/* <small>/mo</small> */}
                  </a>
                  <h4 className="posr">
                    {/* <Link href={`/listing-details-v2/${item._id}`}> */}
                    <Link href="/#feature-property">
                      <a className="text-white">{item.title}</a>
                    </Link>
                  </h4>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default FeatureProperties;
