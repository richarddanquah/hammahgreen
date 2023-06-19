import PopupVideo from "../common/PopupVideo";

const OurMission = () => {
  const missionContent = [
    {
      id: 1,
      icon: "flaticon-user",
      number: "80,123",
      meta: "Customers to date",
    },
    {
      id: 2,
      icon: "flaticon-home",
      number: "$74 Billion",
      meta: "In home sales",
    },
    {
      id: 3,
      icon: "flaticon-transfer",
      number: "$468 Million",
      meta: "In Savings",
    },
  ];

  return (
    <>
      <div className="col-lg-8 col-xl-7">
        <div className="about_content pt50 pr50">
          <p>
            Hammah Green is a new state-of-the-art real estate corporation that
            has a new vision to meet the new passions of today’s modern home
            owner. We are committed to providing custom-made, beautiful yet
            affordable living spaces for people in different income brackets
            that will suit their lifestyle. We are primed to help first-time
            homeowners get their dream homes without stress. With our
            professional and experienced team of experts in land acquisition,
            architecture, land use and spatial planning, we offer our customers
            and the general public world-class accommodation here in Ghana. We
            are here to develop long lasting and prosperous relationships with
            our customers.
          </p>

          <h4 className="large">Our Mission</h4>

          <p>
            At Hammah Green our mission with our communities is to build high
            quality homes in neighborhoods that feature synergy and balance. We
            believe that with the right planning and resources we can provide
            luxurious, sustainable homes that are powered by the sun with
            personal gardens, and a respect for balance between nature and
            infrastructure.
          </p>

          {/* <ul className="ab_counting">
            {missionContent.map((item) => (
              <li className="list-inline-item" key={item.id}>
                <div className="about_counting">
                  <div className="icon">
                    <span className={`${item.icon}`}></span>
                  </div>
                  <div className="details">
                    <h3>{item.number}</h3>
                    <p>{item.meta}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul> */}
          {/* End .ab_counting */}
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-4 col-xl-5">
        <div className="about_thumb">
          <img
            className="img-fluid w100 rounded-5 shadow-sm"
            src="assets/images/background/aboutuspagebanner.jpeg"
            alt="1.jpg"
          />
          <PopupVideo />
        </div>
      </div>
    </>
  );
};

export default OurMission;
