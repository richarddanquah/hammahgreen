import Link from "next/link";
import Slider from "react-slick";
import properties from "../../data/properties";

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
          slidesToShow: 3,
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
    ?.slice(0, 4)
    ?.reverse()
    ?.map((item) => (
      <div className="item" key={item.id}>
        <div className="feat_property">
          <div className="thumb">
            <img className="img-whp" src={item.mainImage} alt="fp1.jpg" />
            <div className="thmb_cntnt">
              <ul className="tag mb0">
                <li className="list-inline-item">
                  <a href="#">{item.saleTag}</a>
                </li>
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

              <Link href={`/listing-details-v1/${item.id}`}>
                <a className="fp_price">
                  ${item.price}
                  {/* <small>/mo</small> */}
                </a>
              </Link>
            </div>
          </div>
          {/* End .thumb */}

          <div className="details">
            <div className="tc_content">
              <p className="text-thm">{item.type}</p>
              <h4>
                {/* <Link href={`/listing-details-v2/${item.id}`}> */}
                <a>{item.title}</a>
                {/* </Link> */}
              </h4>
              <p>
                <span className="flaticon-placeholder"></span> &nbsp;
                {item.location}
              </p>

              <ul className="prop_details mb0">
                <li className="list-inline-item">
                  <a href="#">Bedrooms: {item.bedrooms}</a>
                </li>
                <li className="list-inline-item">
                  <a href="#">Bedrooms: {item.baths}</a>
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
                  <Link href="/agent-v2">
                    <a>{item.posterName}</a>
                  </Link>
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
