import Link from "next/link";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Form = () => {
  const { data: session, status } = useSession();
  const route = useRouter();

  if (status === "authenticated") {
    route.push("/");
  }

  const handleSubmit = async function (e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    const firstname = e.target.fname.value;
    const lastname = e.target.lname.value;
    const email = e.target.email.value;
    const role = e.target.role.value;
    const password = e.target.password.value;
    const repassword = e.target.repeatpassword.value;

    const fnFirstLetter = firstname.slice(0, 1).toUpperCase();
    const fnLowercaseLetters = firstname.slice(1).toLowerCase();
    firstname = fnFirstLetter + fnLowercaseLetters;

    const lnFirstLetter = lastname.slice(0, 1).toUpperCase();
    const lnLowercaseLetters = lastname.slice(1).toLowerCase();
    lastname = lnFirstLetter + lnLowercaseLetters;
    email = email.toLowerCase();

    // console.log(firstname, lastname, email, role, password, repassword);

    if (password === repassword) {
      const data = {
        fname: firstname,
        lname: lastname,
        email: email,
        role: role,
        password: password,
      };

      console.log(data);

      // Send the data to the server in JSON format.
      const JSONdata = JSON.stringify(data);

      // API endpoint where we send form data.
      const endpoint = "/api/addUser";

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

      const userCreated = result.userCreated;
      const error = result.error;

      if (userCreated) {
        alert(
          `User ${userCreated.fname} ${userCreated.lname} successfully registered.`
        );
        // window.location.replace("/login");
        route.push("/login")
      } else if (error) {
        // const emerror = document.querySelector("#emailerror");
        // emerror.innerHTML =
        //   "! " + "That email already exists. Try a different email.";
        alert("Something went wrong. Try again...")
      }

    } else {
      const error = document.querySelector("#passworderror");
      error.innerHTML = "! " + "Those passwords do not match." + " Try again.";
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="heading text-center">
          <h3>Register</h3>
          <p className="text-center">
            Already have an account?{" "}
            <Link href="/login">
              <a className="text-thm">Login</a>
            </Link>
          </p>
        </div>
        {/* End .heading */}

        <div className="row">
          <div className="col-lg-6">
            <div className="form-group input-group">
              <input
                type="text"
                className="form-control"
                placeholder="First name"
                name="fname"
                required
                minlength="3"
                maxlength="30"
              />
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <i className="flaticon-user"></i>
                </div>
              </div>
            </div>
            {/* End .form-group */}
          </div>

          <div className="col-lg-6">
            <div className="form-group input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Last name"
                name="lname"
                required
                minlength="3"
                maxlength="30"
              />
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <i className="flaticon-user"></i>
                </div>
              </div>
            </div>
            {/* End .form-group */}
          </div>
        </div>

        <span
          className="float-start"
          style={{ fontSize: "13px", color: "red" }}
          id="emailerror"
        ></span>
        <div className="form-group input-group">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            name="email"
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$"
          />
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fa fa-at"></i>
            </div>
          </div>
        </div>

        {/* End .form-group */}

        <div className="form-group form-check custom-checkbox mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="role"
            value="User"
            required
            name="role"
            checked
          />
          <label
            className="form-check-label form-check-label float-start"
            htmlFor="role"
          >
            User
          </label>
        </div>
        {/* End .form-group */}

        <div className="form-group input-group">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            required
          />
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="flaticon-password"></i>
            </div>
          </div>
        </div>
        {/* End .form-group */}

        <div className="form-group input-group  ">
          <input
            type="password"
            className="form-control"
            placeholder="Confirm password"
            name="repeatpassword"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            required
          />
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="flaticon-password"></i>
            </div>
          </div>
        </div>

        <div className="mb20 text-center">
          <span style={{ fontSize: "13px", color: "grey" }}>
            Use 8 or more characters with a mix of letters, numbers & symbols
          </span>
          <br />
          <span
            style={{ fontSize: "13px", color: "red" }}
            id="passworderror"
          ></span>
        </div>
        {/* End .form-group */}

        {/* <div className="form-group form-check custom-checkbox mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            value="on"
            required
            id="terms"
            name="termscheckbox"
          />
          <label className="form-check-label form-check-label float-start" htmlFor="terms">
            I have read and accept the Terms and Privacy Policy?
          </label>
        </div> */}
        {/* End .form-group */}

        <button type="submit" className="btn btn-log w-100 btn-thm">
          Register
        </button>
        {/* login button */}

        <div className="divide">
          <span className="lf_divider">Or</span>
          <hr />
        </div>
        {/* divider */}
      </form>

      {/* Sign in with google fb */}

      <div className="row">
        <div className="col-lg-6">
          <button
            type="button"
            className="btn btn-block color-white bgc-fb mb0 w-100"
            onClick={() => {
              signIn("facebook");
            }}
          >
            <i className="fa fa-facebook float-start mt5"></i> facebook
          </button>
        </div>
        {/* End .col */}

        <div className="col-lg-6">
          <button
            type="button"
            className="btn btn2 btn-block color-white bgc-gogle mb0 w-100"
            onClick={() => {
              signIn("google");
            }}
          >
            <i className="fa fa-google float-start mt5"></i> Google
          </button>
        </div>
        {/* End .col */}
      </div>

      {/* more signin options */}
    </>
  );
};

export default Form;
