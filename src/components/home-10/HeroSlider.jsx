import Link from "next/link";
import Slider from "react-slick";

const HeroSlider = ({ homepageheaderlistings }) => {
  const settings = {
    dots: false,
    arrow: true,
    speed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
  };
  const sliderContent = [
    {
      id: 1,
      bgImage: "slidebg-1",
      price: "565000",
      title: "Royal Family Estate",
      itemDetails: [
        { name: "Beds", number: "7" },
        { name: "Baths", number: "8" },
        { name: "SqFt", number: "9100" },
      ],
    },
    {
      id: 2,
      bgImage: "slidebg-2",
      price: "490000",
      title: "Eloquence Estate",
      itemDetails: [
        { name: "Beds", number: "5" },
        { name: "Baths", number: "6" },
        { name: "SqFt", number: "N/A" },
      ],
    },
    {
      id: 3,
      bgImage: "slidebg-3",
      price: "400000",
      title: "Nature Valley Estate",
      itemDetails: [
        { name: "Beds", number: "5" },
        { name: "Baths", number: "6" },
        { name: "SqFt", number: "N/A" },
      ],
    },
  ];

  return (
    <Slider {...settings} arrows={true}>
      {homepageheaderlistings.map((item) => (
        <div key={item._id}>
          <div
            style={{ backgroundImage: `url(${item.mainImage})` }}
            className={`slide slide-one d-flex align-items-center`}
          >
            <div
              className="container"
              // style={{ backgroundImage: `url(${item.mainImage})` }}
            >
              <div className="home-content position-relative text-center p0">
                <h2 className="banner_top_title">${item.price}</h2>
                <h3 className="banner-title">{item.title}</h3>
                <ul className="prop_details ">
                  <li className="list-inline-item">
                    <a href="#">Beds: {item.bedrooms}</a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">Baths: {item.bedrooms}</a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">SqFt: {item.sqft}</a>
                  </li>
                </ul>
                <div className="active">
                  <Link href="/properties">
                    <a className="banner-btn">Book Now</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* {sliderContent.map((item) => (
        <div
          className={`slide slide-one d-flex align-items-center ${item.bgImage}`}
          key={item.id}
        >
          <div className="container">
            <div className="home-content position-relative text-center p0">
              <h2 className="banner_top_title">
                ${item.price}
              </h2>
              <h3 className="banner-title">{item.title}</h3>
              <ul className="prop_details ">
                {item.itemDetails.map((val, i) => (
                  <li className="list-inline-item" key={i}>
                    <a href="#">
                      {val.name}: {val.number}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="active">
                <Link href="/homes">
                  <a className="banner-btn">Book Now</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))} */}
    </Slider>
  );
};

export default HeroSlider;
