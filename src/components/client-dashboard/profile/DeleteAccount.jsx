import { useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default function DeleteAccount({ theUser }) {
  const route = useRouter();
  const [passworderror, setPassworderror] = useState(null);
  const [updateErrorToast, setUpdateErrorToast] = useState("none");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const clientId = e.target.clientid.value;
    const password = e.target.password.value;

    const data = {
      clientId,
      password,
    };

    // console.log(data);

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data);

    // API endpoint where we send form data.
    const endpoint = "/api/deleteclient";

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

    if (result.passworderror) {
      setPassworderror("is-invalid");
    } else if (result.error) {
      setUpdateErrorToast("block");
    } else if (result.deletedClient) {
      const data = await signOut({
        redirect: false,
        callbackUrl: "/login",
      });
      route.push(data.url);
    }
  };
  return (
    <>
      <div className="border border-danger p-3 mb-3 rounded-4 shadow-sm">
        <div className="form-text mb-4">
          <h4>Delete Your Account</h4>
          <p>
            Irreversably delete your Personal Account and its data from this
            plateform, so please proceed with caution.
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <button
            className="btn btn-danger rounded-5"
            type="submit"
            data-bs-toggle="modal"
            data-bs-target="#deleteModal"
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* Delete Modal  */}
      <div
        class="modal fade"
        id="deleteModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content shadow-md border border-danger">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Delete Your Account
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div class="modal-body">
                <p>
                  You are about to irreversably delete your Personal Account.
                  Enter you password to proceed.
                </p>
                <div className="form-check d-none">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="clientid"
                    value={theUser._id}
                    defaultChecked
                  />
                  <label className="form-check-label">{theUser._id}</label>
                </div>

                <input
                  type="password"
                  className={`form-control ${passworderror} rounded-5`}
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  placeholder="Password"
                  name="password"
                  required
                  onClick={() => {
                    setPassworderror(null);
                  }}
                />
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-light-subtle rounded-5"
                  data-bs-dismiss="modal"
                >
                  <span
                    //   style={{ fontSize: "12px" }}
                    className="fa fa-times"
                  ></span>
                  {/* Close */}
                </button>
                <button type="submit" class="btn btn-danger rounded-5">
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

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
