import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const TableData = ({ Listings }) => {
  const [deleting, setDeleting] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setDeleting("true");
    const id = e.target.id.value;
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
      setDeleting("false");
      window.location.reload();
    } else {
      setDeleting("error");
    }

    console.log(result);
  };

  let theadConent = [
    "Listing",
    "Description & Other Details",
    "Date published",
    "Sale Tag",
    "Posted By",
    "Actions",
  ];

  console.log(Listings);

  let tbodyContent = Listings?.slice(0, 20)
    .reverse()
    .map((item) => (
      <>
        <tr key={item.id}>
          <td scope="row">
            <div className="feat_property list favorite_page style2">
              <div style={{ marginTop: "20px" }} className="thumb">
                <img
                  className="img-whp cover"
                  src={item.mainImage}
                  alt="fp1.jpg"
                />
                {/* <div className="thmb_cntnt">
              <ul className="tag mb0">
                <li className="list-inline-item">
                  <a href="#">{item.saleTag}</a>
                </li>
              </ul>
            </div> */}
              </div>
              <div className="details">
                <div className="tc_content">
                  <h4>
                    {item.title}
                    <br />
                    <span style={{ fontSize: "11px" }}>{item.type}</span>
                  </h4>

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
            <p
              className="pr30"
              style={{
                textAlign: "justify",
                fontSize: "13px",
                color: "#000",
                lineHeight: "normal",
              }}
            >
              {item.description.slice(0, 300) + "..."}
            </p>

            {/* {item.imgList.map((i) => {
            <Image
              className="rounded-3 p10"
              src={i}
              width={50}
              height={50}
              alt="property media"
            />;
          })} */}

            {item.imgList.length !== 0 && (
              <>
                <Image
                  className="rounded-3"
                  src={item.imgList[0]}
                  width={50}
                  height={50}
                />
                &nbsp;
                <Image
                  className="rounded-3"
                  src={item.imgList[1]}
                  width={50}
                  height={50}
                />
                &nbsp;
                <Image
                  className="rounded-3"
                  src={item.imgList[2]}
                  width={50}
                  height={50}
                />
                &nbsp;
                <Image
                  className="rounded-3"
                  src={item.imgList[3]}
                  width={50}
                  height={50}
                />
              </>
            )}
          </td>
          {/* End td */}

          <td style={{ lineHeight: "normal" }}>
            <span style={{ fontSize: "12px" }}>
              <b>Bedrooms</b> • {item.bedrooms}
            </span>
            <br />
            <span style={{ fontSize: "12px" }}>
              <b>Baths</b> • {item.baths}
            </span>
            <br />
            <span style={{ fontSize: "12px" }}>
              <b>Garages</b> • {item.garages}
            </span>
            <br />
            <span style={{ fontSize: "12px" }}>
              <b>Sqft</b> • {item.sqft}
            </span>
            <br />
            <span style={{ fontSize: "12px" }}>
              <b>Amenities</b> • {item.amenities.join(', ')}
            </span>
            <br />
            <span style={{ fontSize: "12px" }}>
              <b>Built</b> • {item.built}
            </span>
            <br />
            <span style={{ fontSize: "12px" }}>
              <b>Featured</b> • {item.featured}
            </span>
            <br />
            <span style={{ fontSize: "12px" }}>
              <b>Homepage Header</b> • {item.homepageheader}
            </span>
          </td>

          <td style={{ lineHeight: "normal" }}>
            <span style={{ fontSize: "14px" }}>{item.posted}</span>
          </td>
          {/* End td */}

          <td>
            <span className="status_tag badge">{item.saleTag}</span>
          </td>
          {/* End td */}

          <td style={{ lineHeight: "normal" }}>
            <span>{item.posterName}</span>
          </td>
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

            <Link href={`/edit-listing/${item._id}`}>
              <button
                style={{
                  border: "none",
                  padding: "5px 15px",
                  marginRight: "5px",
                  marginBottom: "5px",
                  borderRadius: "5px",
                  color: "red",
                }}
                type="submit"
                title="Edit this property listing"
              >
                <span className="flaticon-edit"></span>
              </button>
            </Link>
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
                title="Delete this property listing"
              >
                <span className="flaticon-garbage"></span>
              </button>
            </form>
          </td>
          {/* End td */}
        </tr>
      </>
    ));

  return (
    <>
      <table className="table">
        <thead className="thead-light">
          <tr>
            {theadConent.map((value, i) => (
              <th style={{ lineHeight: "normal" }} scope="col" key={i}>
                {value}
              </th>
            ))}
          </tr>
        </thead>
        {/* End theaad */}

        <tbody>{tbodyContent}</tbody>
      </table>

      {/* Deleting Process Toast */}
      <div
        class="toast position-fixed bottom-0 end-0 mb10 mr20 text-bg-secondary-emphasis border-0"
        role="alert"
        style={{ display: deleting === "true" ? "block" : "none" }}
      >
        <div class="d-flex">
          <div class="toast-body">
            <span className="spinner-border spinner-border-sm text-danger mr20"></span>
            <span className="text-danger">Deleting Listing...</span>
          </div>
          {/* <button
            type="button"
            class="btn-close btn-close me-2 m-auto"
          ></button> */}
        </div>
      </div>
      {/* Deleting Process Toast */}

      {/* Deleted Successfully Toast */}
      <div
        class="toast position-fixed bottom-0 end-0 mb10 mr20 text-bg-secondary-emphasis border-0"
        role="alert"
        style={{ display: deleting === "false" ? "block" : "none" }}
      >
        <div class="d-flex">
          <div class="toast-body">
            <span className="flaticon-tick mr10 text-success mr20"></span>
            <span className="text-success">Deleted successfully.</span>
          </div>
          {/* <button
            type="button"
            class="btn-close btn-close text-success me-2 m-auto"
          ></button> */}
        </div>
      </div>
      {/* Deleted Successfully Toast */}

      {/* Error Toast */}
      <div
        class="toast position-fixed bottom-0 end-0 mb10 mr20 text-bg-secondary-emphasis border-0"
        role="alert"
        style={{ display: deleting === "error" ? "block" : "none" }}
        // style={{ display: "block" }}
      >
        <div class="d-flex">
          <div class="toast-body">
            <span className="fa fa-exclamation-triangle mr10 text-danger mr20"></span>
            <span>Something went wrong.</span>
          </div>
          <button
            type="button"
            class="btn-close btn-close text-success me-2 m-auto"
            onClick={() => {
              setDeleting("none");
            }}
          ></button>
        </div>
      </div>
      {/* Error Toast */}
    </>
  );
};

export default TableData;
