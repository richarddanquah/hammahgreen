import Link from "next/link";
import { useState } from "react";

const TableData = ({ Users }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
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

    if (deletedUser) {
      alert(`User ${deletedUser.email} was successfully deleted.`);
      window.location.reload();
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
    </>
  );
};

export default TableData;
