import { useState } from "react";
const PackagesTable = ({ greenpackages }) => {
  const [deleting, setDeleting] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setDeleting("true");

    const data = {
      id: event.target.id.value,
    };

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data);

    // API endpoint where we send form data.
    const endpoint = "/api/delPackage";

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

    if (result.deleted) {
      setDeleting("false");
      window.location.reload();
    } else if (result.error) {
      setDeleting("error");
    }
  };
  return (
    <>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Package</th>
            <th>Price</th>
            <th>Details</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {greenpackages &&
            greenpackages.map((item) => (
              <>
                <tr key={item._id}>
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                  <td>
                    {item.features.map((item) => (
                      <>
                        <p key={item}>{item}</p>
                      </>
                    ))}
                  </td>
                  <td>
                    <form onSubmit={handleSubmit} className="d-inline">
                      <input
                        className="form-check-input d-none"
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
                        className="shadow-sm"
                        type="submit"
                        title="Delete this property listing"
                      >
                        <span className="flaticon-garbage"></span>
                      </button>
                    </form>
                  </td>
                </tr>
              </>
            ))}
        </tbody>
      </table>
      {/* Deleting Process Toast */}
      <div
        class="toast position-fixed bottom-0 end-0 mb20 mr20 text-bg-secondary-emphasis border-0"
        role="alert"
        style={{ display: deleting === "true" ? "block" : "none" }}
        // style={{ display: "block" }}
      >
        <div class="d-flex">
          <div class="toast-body">
            <span className="spinner-border spinner-border-sm text-danger mr20"></span>
            <span className="text-danger">Deleting Package...</span>
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
        // style={{ display: "block" }}
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
            <span className="fa fa-exclamation-circle mr10 text-danger mr20"></span>
            <span className="text-danger">Something went wrong.</span>
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

export default PackagesTable;
