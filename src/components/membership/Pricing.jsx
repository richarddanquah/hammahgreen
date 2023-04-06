const Pricing = () => {
  const pricingContent = [
    {
      id: 1,
      price: "86,000",
      title: "Yellow package",
      features: [
        "Base green power homes",
        "A basic 5kw system to power lights, fans & TVs",
        "Incorporated into all the homes automatically",
        "5kw costs Ghs 100,000",
      ],
    },
    {
      id: 2,
      price: "160,000",
      title: "Green Package",
      features: [
        "Semi-autonomous green power homes",
        "10kw system to power lights, fans, TVs, fridges & 1 Ac",
        "10kw costs Ghs 200,000",
      ],
    },
    {
      id: 3,
      price: "317,000",
      title: "Gold package",
      features: [
        "Maximum autonomous, green power homes",
        "With a 20kW system to power lights, fans, TVs, fridges, freezers & 3 Ac",
        "20kw costs Ghs 300,000",
      ],
    },
  ];
  return (
    <>
      {pricingContent.map((item) => (
        <div className="col-sm-6 col-md-6 col-lg-4" key={item.id}>
          <div className="pricing_table">
            <div className="pricing_header">
              <div className="price">GHS {item.price}</div>
              <h4>{item.title}</h4>
            </div>
            <div className="pricing_content">
              <ul className="mb0">
                {item.features.map((val, i) => (
                  <li key={i}>{val}</li>
                ))}
              </ul>
            </div>
            <div className="pricing_footer">
              <a className="btn pricing_btn btn-block" href="#">
                Select Package
              </a>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Pricing;
