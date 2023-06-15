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
          <h4 className="large">About Description Undergoing Changes</h4>

          <p>
            Nec feugiat nisl pretium fusce id velit ut. Ligula ullamcorper
            malesuada proin libero. Morbi leo urna molestie at elementum eu
            facilisis sed. Enim ut sem viverra aliquet eget sit amet tellus
            cras. Feugiat in ante metus dictum at tempor commodo. Dictum varius
            duis at consectetur lorem donec massa. Amet purus gravida quis
            blandit turpis cursus. Gravida cum sociis natoque penatibus et
            magnis dis parturient. Ultrices dui sapien eget mi proin sed libero
            enim sed. Auctor augue mauris augue neque gravida in fermentum et.
          </p>

          <p>
            Auctor urna nunc id cursus metus aliquam eleifend mi in. Orci a
            scelerisque purus semper eget duis at. Leo a diam sollicitudin
            tempor id. Magna fermentum iaculis eu non diam phasellus vestibulum
            lorem sed. Nulla aliquet enim tortor at auctor urna nunc id. Nec
            feugiat nisl pretium fusce id velit ut. Senectus et netus et
            malesuada fames ac turpis egestas. Scelerisque fermentum dui
            faucibus in ornare quam viverra orci sagittis.
          </p>
          {/* <p>
            Waterviews Estates is a new state-of-the-art real estate community located in Winneba, within a larger project called Winneba Estates. We are committed to providing custom-made, beautiful yet affordable living spaces for people in different income brackets that will suit their lifestyle. We are primed to help first-time homeowners get their dream homes without stress. With our professional and experienced team of experts in land acquisition, architecture, land use and spatial planning, we offer our customers and the general public world-class accommodation here in Ghana. We are here to develop long lasting and prosperous relationships with our customers.
          </p>

          <h4 className="large">
            Our Mission
          </h4>

          <p>
            At Hammah Green our mission with Winneba Estates, and its premium area Waterview Estates is to build high quality homes in neighborhoods that feature inclusion and balance. We believe that with the right planning and resources we can provide luxurious, sustainable homes that are powered by the sun with personal gardens, and a respect for balance between nature and infrastructure
          </p> */}

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
            className="img-fluid w100"
            src="assets/images/about/modern-home-img.png"
            alt="1.jpg"
          />
          <PopupVideo />
        </div>
      </div>
    </>
  );
};

export default OurMission;
