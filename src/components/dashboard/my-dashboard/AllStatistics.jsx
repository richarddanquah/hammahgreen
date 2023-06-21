const AllStatistics = ({ propertyListings, waterviewsListings, sorokroListings }) => {
  const allListings = propertyListings;
  const WaterviewsListings = waterviewsListings;
  const sorokrolistings = sorokroListings;
  console.log(sorokroListings);

  const allStatistics = [
    {
      id: 1,
      blockStyle: "",
      icon: "flaticon-house-2",
      timer: allListings.length,
      name: "All Listings",
      alert: "Coming soon",
    },
    // {
    //   id: 2,
    //   blockStyle: "",
    //   icon: "flaticon-house-2",
    //   timer: WaterviewsListings.length,
    //   name: WaterviewsListings[0].location,
    // },
    // {
    //   id: 3,
    //   blockStyle: "",
    //   icon: "flaticon-house-2",
    //   timer: sorokroListings.length,
    //   name: sorokroListings[0].location,
    // },
  ];

  return (
    <>
      {allStatistics.map((item) => (
        <div className="col-sm-6 col-md-6 col-lg-6 col-xl-3" key={item.id}>
          <div
            className={`ff_one ${item.blockStyle} rounded-5 shadow-sm border border-secondary-emphasis`}
          >
            <div className="detais">
              <div className="timer">{item.timer}</div>
              <p>{item.name}</p>
            </div>
            <div className="icon">
              <span className={item.icon}></span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default AllStatistics;
