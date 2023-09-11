import { useState } from "react";

const SubscribeForm = () => {
  const [subscribingUser, setSubscribingUser] = useState("");
  const [succesToast, setSuccesToast] = useState("none");
  const [failedToast, setFailedToast] = useState("none");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubscribingUser("true");

    const fname = event.target.fname.value;
    const lname = event.target.lname.value;
    const email = event.target.email.value;

    const data = {
      fname,
      lname,
      email,
    };

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data);

    // API endpoint where we send form data.
    const endpoint = "/api/addtoemaillist";

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

    // console.log(result);

    if (result.hashed_email_id) {
      setSubscribingUser("");
      setSuccesToast("block");
      event.target.reset();
    } else if (result.error) {
      setSubscribingUser("");
      setFailedToast("block");
      event.target.reset();
    }
  };

  return (
    <>
      <form className="footer_mailchimp_form" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-lg-12 mb-2">
            <input
              type="text"
              className="form-control rounded-5 border-0 shadow-sm"
              placeholder="First Name"
              name="fname"
              required
            />
          </div>
          <div className="col-sm-12 mb-2">
            <input
              type="text"
              className="form-control rounded-5 border-0 shadow-sm"
              placeholder="Last Name"
              name="lname"
              required
            />
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <div className="col-auto">
            <input
              type="email"
              className="form-control mb-2 p-3 border-0 shadow-sm"
              placeholder="Your email"
              name="email"
              required
              // pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$"
            />
          </div>

          <div className="col-auto ms-2">
            {subscribingUser === "" && (
              <>
                <button type="submit" className="btn btn-primary shadow-sm">
                  <i className="fa fa-send"></i>
                </button>
              </>
            )}

            {subscribingUser === "true" && (
              <>
                <button type="button" className="btn btn-primary" disabled>
                  <div
                    class="spinner-grow spinner-grow-sm text-light"
                    role="status"
                  >
                    <span class="visually-hidden">Subscribing...</span>
                  </div>
                </button>
              </>
            )}
          </div>
        </div>
      </form>

      {/* Success Toast */}
      <div
        class="toast position-fixed bottom-0 start-50 translate-middle-x mb90 text-bg-secondary-emphasis border-0 rounded-5"
        role="alert"
        style={{ display: succesToast }}
        // style={{ display: "block" }}
      >
        <div class="d-flex">
          <div class="toast-body">
            <span className="fa fa-check-circle mr10 text-success mr20"></span>
              
            {/* <span className="flaticon-tick mr10 text-success mr20"></span> */}
            <span className="text-success">Your subscribtion is successful.</span>
          </div>
          <button
            type="button"
            class="btn-close btn-close text-success me-2 m-auto"
            onClick={() => {
              setSuccesToast("none");
            }}
          ></button>
        </div>
      </div>
      {/* Success Toast */}

      {/* Error Toast */}
      <div
        class="toast position-fixed bottom-0 start-50 translate-middle-x mb90 text-bg-secondary-emphasis border-0 rounded-5"
        role="alert"
        style={{ display: failedToast }}
        // style={{ display: "block" }}
      >
        <div class="d-flex">
          <div class="toast-body">
            <span className="fa fa-exclamation-circle mr10 text-danger mr20"></span>
            <span className="text-danger">
              Something went haywire. Try again.
            </span>
          </div>
          <button
            type="button"
            class="btn-close btn-close text-success me-2 m-auto"
            onClick={() => {
              setFailedToast("none");
            }}
          ></button>
        </div>
      </div>
      {/* Error Toast */}
    </>
  );
};

export default SubscribeForm;
