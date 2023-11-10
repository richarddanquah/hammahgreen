import featureProContent from "../../../data/properties";
import { useState } from "react";
import Slider from "react-slick";
import Link from "next/link";

const FeatureProperties = ({ listings }) => {
  // console.log(listings);
  const [index, setIndex] = useState(0);

  // const settings = {
  //   dots: true,
  //   // arrows: false,
  //   fade: true,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   autoplay: false,
  //   speed: 1000,
  // };

  
  const hasPrev = index > 0;
  const hasNext = index < listings.length - 1;
  
  function handlePrevClick() {
    if (hasPrev) {
      setIndex(index - 1);
    }
  }
  
  function handleNextClick() {
    if (hasNext) {
      setIndex(index++);
    }
  }
  
  let plistings = listings[index];

  return (
    <>
      {/* <Slider {...settings} arrows={false}> */}

      {/* {listings?.slice(0, 5).map((item) => (
          <> */}

      <div className="item">
        <div className="feat_property home7">
          <div className="thumb">
            <img
              className="img-whp"
              // src={item.mainImage}
              src={plistings.mainImage}
              alt="properties identity"
            />

            <div className="thmb_cntnt">
              <ul className="tag mb0">
                <li className="list-inline-item">
                  <a>{plistings.saleTag}</a>
                </li>
                {plistings.featured === "Yes" && (
                        <li className="list-inline-item">
                          <a>Featured</a>
                        </li>
                      )}
              </ul>
              <a className="fp_price">
                ${plistings.price}
                {/* <small>/mo</small> */}
              </a>
              <h4 className="posr">
                <Link href={`/listing-details-v2/${plistings._id}`}>
                  {/* <Link href="/#feature-property"> */}
                  <a className="text-white">{plistings.title}</a>
                </Link>
              </h4>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={handlePrevClick}
            className="btn btn-sm border-0 rounded-5 shadow-sm bg-dark me-1"
            disabled={!hasPrev}
          >
            <i className="fa fa-caret-left text-white"></i>
            <span className="text-white ms-2">Prev</span>
          </button>

          <button
            onClick={handleNextClick}
            className="btn btn-sm border-0 rounded-5 shadow-sm bg-dark"
            disabled={!hasNext}
          >
             <span className="text-white me-2">Next</span>
            <i className="fa fa-caret-right text-white"></i>
          </button>
        </div>
      </div>

      {/* </>
        ))} */}

      {/* </Slider> */}
    </>
  );
};

export default FeatureProperties;
