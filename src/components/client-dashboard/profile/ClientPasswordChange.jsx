import { useState } from "react";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

export default function ClientPasswordChange({ theUser }) {
  const route = useRouter();

  const [changePass, setChangePass] = useState("");
  const [updateSuccessToast, setUpdateSuccessToast] = useState("none");
  const [passwordErrorToast, setPasswordErrorToast] = useState({
    errclass: "",
    toast: "none",
  });

  const [currentpassworderror, setCurrentpassworderror] = useState({
    errclass: "",
    text: "hidden",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const clientId = e.target.clientid.value;
    const currentpassword = e.target.currentpassword.value;
    const newpassword = e.target.newpassword.value;
    const confirmnewpassword = e.target.confirmnewpassword.value;

    if (newpassword === confirmnewpassword) {
      setChangePass("true");
      const data = {
        clientId,
        currentpassword,
        confirmnewpassword,
      };

      // console.log(data);

      // Send the data to the server in JSON format.
      const JSONdata = JSON.stringify(data);

      // API endpoint where we send form data.
      const endpoint = "/api/updateuserpassword";

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

      if (result.currentpassworderror) {
        setChangePass("");
        setCurrentpassworderror({
          errclass: "is-invalid",
          text: "visible",
        });
      } else if (result.updatedpsw) {
        setChangePass("");
        setUpdateSuccessToast("block");
        // e.target.reset();
        const data = await signOut({
          redirect: false,
          callbackUrl: "/login",
        });
        route.push(data.url);
      }
    } else {
      setChangePass("");
      setPasswordErrorToast({
        errclass: "is-invalid",
        toast: "block",
      });
    }
  };

  return (
    <>
      <form
        className="border border-secondary-subtle p-3 mb-3 rounded-4 shadow-sm"
        onSubmit={handleSubmit}
      >
        <div className="form-text text-dark mb-4">
          <h4>Change your password</h4>
          <span className="d-block">
            First verify it's you. Enter your current password, then enter your
            new password and confirm it.
          </span>
          <span className="d-block">
            Use 8 or more characters with a mix of letters, numbers & symbols
          </span>
        </div>

        <div className="form-check pb-4 d-none">
          <input
            className="form-check-input"
            type="checkbox"
            name="clientid"
            value={theUser._id}
            defaultChecked
          />
          <label className="form-check-label">{theUser._id}</label>
        </div>

        <div className="row g-2 pb-3">
          <div className="col-sm-12 col-lg-4">
            <input
              type="password"
              id="floatingInput"
              className={`form-control ${currentpassworderror.errclass} rounded-5`}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              placeholder="Current password"
              name="currentpassword"
              required
              onClick={() => {
                setCurrentpassworderror({
                  errclass: "",
                  text: "hidden",
                });
              }}
            />
            <span
              style={{
                fontSize: "13px",
                visibility: currentpassworderror.text,
              }}
              className="ms-3 text-danger fw-bold"
            >
              <span className="fa fa-exclamation-circle mt-2 me-2"></span>
              Incorrect password
            </span>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4">
            <input
              type="password"
              className={`form-control form-control-sm rounded-5 ${passwordErrorToast.errclass}`}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              placeholder="New password"
              name="newpassword"
              required
              onClick={() => {
                setPasswordErrorToast({
                  errclass: "",
                  toast: "none",
                });
              }}
            />
          </div>
          <div className="col-sm-12 col-md-6 col-lg-4">
            <input
              type="password"
              className={`form-control form-control-sm rounded-5 ${passwordErrorToast.errclass}`}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              placeholder="Confirm password"
              name="confirmnewpassword"
              required
              onClick={() => {
                setPasswordErrorToast({
                  errclass: "",
                  toast: "none",
                });
              }}
            />
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          {changePass === "" && (
            <button className="btn btn-secondary rounded-5" type="submit">
              Change password
            </button>
          )}

          {changePass === "true" && (
            <button
              className="btn btn-secondary rounded-5"
              type="button"
              disabled
            >
              <span
                className="spinner-border spinner-border-sm text-light"
                role="status"
                aria-hidden="true"
              ></span>
              &nbsp; Changing...
            </button>
          )}
        </div>
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
            Change successful
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

      {/* Password Error Toast  */}
      <div
        className="toast text-bg-light rounded-5 border border-danger position-fixed bottom-0 start-50 translate-middle-x mb-5"
        role="alert"
        style={{ display: passwordErrorToast.toast }}
        // style={{ display: "block" }}
      >
        <div className="d-flex">
          <div className="toast-body text-danger">
            <span
              style={{ fontSize: "12px" }}
              className="fa fa-exclamation me-2"
            ></span>
            Passwords don't match.
          </div>
          <button
            type="button"
            className="btn-close btn-close-dark me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
            onClick={() => {
              setPasswordErrorToast({
                errclass: "",
                toast: "none",
              });
            }}
          ></button>
        </div>
      </div>
      {/* Password Error Toast  */}
    </>
  );
}
