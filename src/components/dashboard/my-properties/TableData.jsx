

const handleSubmit = async (e) => {
  e.preventDefault();
  const id = e.target.id.value;
  console.log(id);

  const data = { id };

  // Send the data to the server in JSON format.
  const JSONdata = JSON.stringify(data);

  // API endpoint where we send form data.
  const endpoint = "/api/delListing";

  // Form the request for sending data to the server.
  const options = {
    // The method is POST because we are sending data.
    method: "POST",
    // Tell the server we're sending JSON.
    headers: {
      "Content-Type": "application/json",
    },
    // Body of the request is the JSON data we created above.
    body: JSONdata,
  };

  // Send the form data to our forms API and get a response.
  const response = await fetch(endpoint, options);

  // Get the response data from server as JSON.
  // If server returns the name submitted, that means the form works.
  const result = await response.json();

  const deletedListing = result.deletedListing;

  if (deletedListing) {
    alert(`Listing ${deletedListing.title} was successfully deleted.`);
    window.location.reload();
  }

  console.log(result);
};

const TableData = ({ Listings }) => {
  let theadConent = [
    "Listing Title",
    "Date published",
    "Property Type",
    "Posted By",
    "Action",
  ];
  let tbodyContent = Listings?.slice(0, 4)?.map((item) => (
    <tr key={item.id}>
      <td scope="row">
        <div className="feat_property list favorite_page style2">
          {/* <div className="thumb">
            <img className="img-whp cover" src={item.img} alt="fp1.jpg" />
            <div className="thmb_cntnt">
              <ul className="tag mb0">
                <li className="list-inline-item">
                  <a href="#">{item.saleTag}</a>
                </li>
              </ul>
            </div>
          </div> */}
          <div className="details">
            <div className="tc_content">
              <h4>{item.title}</h4>
              <p>
                <span className="flaticon-placeholder"></span>
                {item.location}
              </p>
              <a className="fp_price text-thm" href="#">
                {item.price}
                {/* <small>/mo</small> */}
              </a>
            </div>
          </div>
        </div>
      </td>
      {/* End td */}

      <td>{item.posted.slice(0, 10)}</td>
      {/* End td */}

      <td>
        <span className="status_tag badge">{item.type}</span>
      </td>
      {/* End td */}

      <td>{item.posterName}</td>
      {/* End td */}

      <td>
        {/* <ul className="view_edit_delete_list mb0">
          <li
            className="list-inline-item"
            data-toggle="tooltip"
            data-placement="top"
            title="Edit"
          >
            <a href="#">
              <span className="flaticon-edit"></span>
            </a>
          </li>
          End li
        </ul> */}

        {/* <button
          style={{
            border: "none",
            padding: "5px 15px",
            marginRight: "5px",
            borderRadius: "5px",
            color: "red",
          }}
          type="submit"
        >
          <span className="flaticon-edit"></span>
        </button> */}
        {/* End edit button */}

        <form onSubmit={handleSubmit} style={{ display: "inline-block" }}>
          <input
            style={{ display: "none" }}
            className="form-check-input"
            type="checkbox"
            value={item._id}
            required
            name="id"
            checked
          />
          <button
            style={{
              border: "none",
              padding: "5px 15px",
              borderRadius: "5px",
              color: "red",
            }}
            type="submit"
          >
            <span className="flaticon-garbage"></span>
          </button>
        </form>
      </td>
      {/* End td */}
    </tr>
  ));

  return (
    <>
      <table className="table">
        <thead className="thead-light">
          <tr>
            {theadConent.map((value, i) => (
              <th scope="col" key={i}>
                {value}
              </th>
            ))}
          </tr>
        </thead>
        {/* End theaad */}

        <tbody>{tbodyContent}</tbody>
      </table>
    </>
  );
};

export default TableData;
