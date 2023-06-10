import Link from "next/link";
import { useState } from "react";

const TableData = ({ Users }) => {
  const [deleting, setDeleting] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setDeleting("true");
    const id = e.target.id.value;
    console.log(id);

    const data = { id };

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data);

    // API endpoint where we send form data.
    const endpoint = "/api/delUser";

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

    const deletedUser = result.deletedUser;
    console.log(deletedUser);
    
    if (deletedUser) {
      setDeleting("false");
      window.location.reload();
    } else {
      setDeleting("error");
    }

    console.log(result);
  };

  let theadConent = ["User Details", "Role", "Action"];
  let tbodyContent = Users?.slice(0, 20)?.map((item) => (
    <tr key={item._id}>
      <td scope="row">
        <div className="feat_property list favorite_page style2">
          <div className="details">
            <div className="tc_content">
              <p style={{ fontSize: "10px" }}>{item._id}</p>
              <span className="flaticon-user"></span>
              <h4>{item.email}</h4>
              <p>
                {item.fname} {item.lname}
              </p>
            </div>
          </div>
        </div>
      </td>
      {/* End td */}

      <td>{item.role}</td>
      {/* End td */}

      {/* <td>
        <span className="status_tag badge">Pending</span>
      </td> */}
      {/* End td */}

      <td>
        {/* <button
          style={{
            border: "none",
            padding: "10px 15px",
            marginRight: "5px",
            borderRadius: "5px",
            color: "red",
          }}
          type="submit"
          title="Edit user"
        >
          <span className="fa fa-pencil"></span>
        </button> */}
        {item.role === "User" && (
          <Link href={`/notifyuser/${item.email}`}>
            <button
              style={{
                border: "none",
                padding: "10px 15px",
                marginRight: "5px",
                borderRadius: "5px",
                color: "red",
              }}
              type="submit"
              title="Send a notification"
            >
              <span className="flaticon-envelope"></span>
            </button>
          </Link>
        )}

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
              padding: "10px 15px",
              borderRadius: "5px",
              color: "red",
            }}
            title="Delete User"
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

      {/* Deleting Process Toast */}
      <div
        class="toast position-fixed bottom-0 end-0 mb10 mr20 text-bg-secondary-emphasis border-0"
        role="alert"
        // style={{ display: deleting === "true" ? "block" : "none" }}
      >
        <div class="d-flex">
          <div class="toast-body">
            <span className="spinner-border spinner-border-sm text-danger mr20"></span>
            <span className="text-danger">Deleting user...</span>
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
            <span className="text-success">Deleted user successfully.</span>
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
            <span className="fa fa-exclamation-circle mr10 text-danger mr20"></span>
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
