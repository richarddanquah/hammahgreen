import { useState } from "react";

export default function ClientFullNameForm({ theUser }) {
  const [update, setUpdate] = useState("");
  const [updateSuccessToast, setUpdateSuccessToast] = useState("none");
  const [updateErrorToast, setUpdateErrorToast] = useState("none");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdate("true");

    const clientId = e.target.clientid.value;

    let fname = e.target.fname.value;
    let lname = e.target.lname.value;

    const fnFirstLetter = fname.slice(0, 1).toUpperCase();
    const fnLowercaseLetters = fname.slice(1).toLowerCase();
    fname = fnFirstLetter + fnLowercaseLetters;

    const lnFirstLetter = lname.slice(0, 1).toUpperCase();
    const lnLowercaseLetters = lname.slice(1).toLowerCase();
    lname = lnFirstLetter + lnLowercaseLetters;

    const phone = e.target.phone.value;
    const address = e.target.address.value;


    const data = {
      clientId,
      fname,
      lname,
      phone,
      address,
    };

    console.log(data);

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data);

    // API endpoint where we send form data.
    const endpoint = "/api/updateclientdetails";

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

    const result = await response.json();
    console.log(result);

    if (result.updatedDetails) {
      setUpdate("");
      setUpdateSuccessToast("block");
    } else if (result.error) {
      setUpdate("");
      setUpdateErrorToast("block");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="border border-secondary-subtle p-3 mb-3 rounded-4 shadow-sm"
      >
        <h4 className="mb-3">Your Details</h4>
        <div className="form-check pb-4 d-none">
          <input
            className="form-check-input"
            type="checkbox"
            name="clientid"
            value={theUser._id}
            defaultChecked
            required
          />
          <label className="form-check-label">{theUser._id}</label>
        </div>

        {/* Name Section */}
        <div className="row g-1 pb-4">
          <div className="col-sm-6">
            <input
              type="text"
              className="form-control rounded-5"
              placeholder="First name"
              name="fname"
              defaultValue={theUser.fname}
              autoComplete="off"
              required
              // disabled
            />
          </div>
          <div className="col-sm-6">
            <input
              type="text"
              className="form-control rounded-5"
              placeholder="Last name"
              name="lname"
              defaultValue={theUser.lname}
              autoComplete="off"
              required
              // disabled
            />
          </div>
        </div>

        <div className="row g-1 pb-4">
          <div className="col-sm-4">
            <input
              type="number"
              className="form-control rounded-5"
              placeholder="Phone"
              name="phone"
              defaultValue={theUser.mobile}
              autoComplete="off"
              required
              // disabled
            />
          </div>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control rounded-5"
              placeholder="Your address"
              name="address"
              defaultValue={theUser.address}
              autoComplete="off"
              // required
              // disabled
            />
          </div>
        </div>


        {update === "" && (
          <button className="btn btn-secondary rounded-5" type="submit">
            <span
              style={{ fontSize: "12px" }}
              className="fa fa-save me-2"
            ></span>
            Save
          </button>
        )}

        {update === "true" && (
          <button className="btn btn-secondary rounded-5" type="submit">
            <span
              className="spinner-border spinner-border-sm text-light"
              role="status"
              aria-hidden="true"
            ></span>
            &nbsp; Saving...
          </button>
        )}

        {/* Name Section */}
      </form>

      {/* Success Update Toast  */}
      <div
        className="toast text-bg-light rounded-5 border border-success position-fixed bottom-0 start-50 translate-middle-x mb-5"
        role="alert"
        style={{ display: updateSuccessToast }}
        // style={{ display: "block" }}
      >
        <div className="d-flex">
          <div className="toast-body text-success">
            <span
              style={{ fontSize: "12px" }}
              className="fa fa-check-circle me-2"
            ></span>
            Details Updated
          </div>
          <button
            type="button"
            className="btn-close btn-close-dark me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
            onClick={() => {
              setUpdateSuccessToast("none");
            }}
          ></button>
        </div>
      </div>
      {/* Success Update Toast  */}

      {/* Error Toast  */}
      <div
        className="toast text-bg-light rounded-5 border border-danger position-fixed bottom-0 start-50 translate-middle-x mb-5"
        role="alert"
        style={{ display: updateErrorToast }}
        // style={{ display: "block" }}
      >
        <div className="d-flex">
          <div className="toast-body text-danger">
            <span
              style={{ fontSize: "12px" }}
              className="fa fa-exclamation me-2"
            ></span>
            Something went wrong.
          </div>
          <button
            type="button"
            className="btn-close btn-close-dark me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
            onClick={() => {
              setUpdateErrorToast("none");
            }}
          ></button>
        </div>
      </div>
      {/* Error Toast  */}
    </>
  );
}
