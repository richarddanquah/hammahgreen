import Link from "next/link";
import Slider from "react-slick";
import properties from "../../data/properties";
import Image from "next/image";

const FeaturedProperties = ({ propertyListings }) => {
  const settings = {
    dots: true,
    arrows: false,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    speed: 1200,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  let content = propertyListings
    ?.slice(0, 10)
    ?.reverse()
    ?.map((item) => (
      <div className="item" key={item._id}>
        <div className="feat_property rounded-4 shadow-sm">
          <div className="thumb rounded-4">
            {/* <div style={{"backgroundImage": url({{item.mainImage}}) }} className="img-whp">
          </div> */}
            <img className="img-whp rounded-4" src={item.mainImage} alt="fpimg.jpg" />
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
                {/* {item.saleTag.map((val, i) => (
                <li className="list-inline-item" key={i}>
                  <a href="#">{val}</a>
                </li>
              ))} */}
              </ul>
              {/* End .tag */}

              {/* <ul className="icon mb0">
              <li className="list-inline-item">
                <a href="#">
                  <span className="flaticon-transfer-1"></span>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#">
                  <span className="flaticon-heart"></span>
                </a>
              </li>
            </ul> */}
              {/* End .icon */}

              <a className="fp_price">
                ${item.price}
                {/* <small>/mo</small> */}
              </a>
            </div>
          </div>
          {/* End .thumb */}

          <div className="details">
            <div className="tc_content">
              <p className="text-thm">{item.type}</p>
              <h4>
                <Link href={`/listing-details-v2/${item._id}`}>
                  <a>{item.title}</a>
                </Link>
              </h4>
              <p>
                <span className="flaticon-placeholder"></span> &nbsp;
                {item.location}
              </p>

              <ul className="prop_details mb0">
                <li className="list-inline-item">
                  <a>Bedrooms: {item.bedrooms}</a>
                </li>
                <li className="list-inline-item">
                  <a>Bedrooms: {item.baths}</a>
                </li>
                <li className="list-inline-item">
                  <a>Sqft: {item.sqft}</a>
                </li>
                {/* {item.itemDetails.map((val, i) => (
                <li className="list-inline-item" key={i}>
                  <a href="#">
                    {val.name}: {val.number}
                  </a>
                </li>
              ))} */}
              </ul>
            </div>
            {/* End .tc_content */}

            <div className="fp_footer">
              <ul className="fp_meta float-start mb0">
                <li className="list-inline-item">
                  {/* <Link href="/agent-v2">
                  <a>
                    <img src={item.posterAvatar} alt="pposter1.png" />
                  </a>
                </Link> */}
                </li>
                <li className="list-inline-item">
                  <a>{item.posterName}</a>
                </li>
              </ul>
              <div className="fp_pdate float-end">
                {item.posted.slice(0, 15)}
              </div>
            </div>
            {/* End .fp_footer */}
          </div>
          {/* End .details */}
        </div>
      </div>
    ));

  return (
    <>
      <Slider {...settings} arrows={false}>
        {content}
      </Slider>
    </>
  );
};

export default FeaturedProperties;
