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
      tip: "Click the 'Create User' tab on the Sidebarmenu to navigate to this page and scroll down to view users. You can delete a user and notify client users on there.",
    },
    {
      id: 3,
      icon: "flaticon-plus",
      title: "Creating A Property Listing",
      tip: "Click the 'Create Listing' tab on the Sidebarmenu to navigate to this page and create a listing. Or just click on the button at the far right of the Top navigation bar.",
    },
    {
      id: 4,
      icon: "flaticon-edit",
      title: "Editing A Property Listing",
      tip: "Click the 'Properties' tab on the Sidebarmenu, then click 'All Property Listings' to navigate to that page. Then click on the edit action of the property you want to edit.",
    },
    {
      id: 5,
      icon: "flaticon-edit",
      title: "Editing A Property Listing Image",
      tip: "To edit a Listing Image click 'Upload Image', select an image file, click the green button that says 'Update listing image' and finally wait for a response.",
    },
    {
      id: 6,
      icon: "flaticon-edit",
      title: "Editing A Property Listing's Details",
      tip: "To edit a Listing's details make the neccessary changes in the field(s) of choice and then click 'Update'",
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
