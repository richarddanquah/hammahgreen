const Activities = () => {
  const dashboardtips = [
    {
      id: 1,
      icon: "flaticon-user",
      title: "Creating A User",
      tip: "Click the 'Create User' tab on the Sidebarmenu to navigate to this page and create a user.",
    },
    {
      id: 2,
      icon: "flaticon-user-1",
      title: "Viewing Users",
      tip: "Click the 'Create User' tab on the Sidebarmenu to navigate to this page and scroll down to view users. You can delete a user and notify client users there.",
    },
    {
      id: 3,
      icon: "flaticon-plus",
      title: "Creating A Property Listing",
      tip: "Click the 'Create Listing' tab on the Sidebarmenu to navigate to this page and create a listing",
    },
    {
      id: 4,
      icon: "flaticon-edit",
      title: "Editing A Property Listing",
      tip: "Click the 'Properties' tab on the Sidebarmenu, then click 'All Property Listings' to navigate to that page. ",
    },

  ];

  return (
    <>
      {dashboardtips.map((item) => (
        <div key={item.id} className="grid">
          <ul>
            <li className="list-inline-item">
              <div style={{backgroundColor: "white"}} className="icon">
                <span className={item.icon}></span>
              </div>
            </li>

            <li className="list-inline-item">
              <h6 style={{margin: "0", marginTop: "7px"}}>{item.title}</h6>
              <p>{item.tip}</p>
            </li>
          </ul>
        </div>
      ))}

      {/* <div className="grid">
          <ul>
            <li className="list-inline-item">
              <div className="icon">
                <i className="flaticon-plus"></i>
              </div>
            </li>

            <li className="list-inline-item">
              <h6 style={{margin: "0", marginTop: "7px"}}>Title</h6>
              <p>Tip</p>
            </li>
          </ul>
        </div> */}
    </>
  );
};

export default Activities;
