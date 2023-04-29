import Link from "next/link";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const Form = () => {
  const { data: session, status } = useSession();

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
        window.location.reload();
      } else if (error) {
        // const emerror = document.querySelector("#emailerror");
        // emerror.innerHTML =
        //   "! " + "That email already exists. Try a different email.";
        alert("Something went wrong. Try again.");
        console.log(error);
      }
    } else {
      const error = document.querySelector("#passworderror");
      error.innerHTML = "! " + "Those passwords do not match." + " Try again.";
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="row mb20">
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
            </div>
            {/* End .form-group */}
          </div>
        </div>

        <div className="row mb10">
          <div className="col-lg-8">
            <div className="form-group input-group">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                name="email"
                required
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$"
              />
            </div>
            <span
              className="float-start"
              style={{ fontSize: "13px", color: "red" }}
              id="emailerror"
            ></span>
          </div>

          <div className="col-lg-4">
            <div className="my_profile_setting_input ui_kit_select_search form-group">
              <select
                className="selectpicker form-select"
                data-live-search="true"
                data-width="100%"
                name="role"
                required
              >
                <option data-tokens="User">User</option>
                <option data-tokens="Admin">Admin</option>
              </select>
            </div>
          </div>
        </div>

        {/* End .form-group */}

        <div className="row">
          <div className="col-lg-6">
            <div className="form-group input-group mb20">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                required
              />
            </div>
          </div>
          {/* End .form-group */}

          <div className="col-lg-6">
            <div className="form-group input-group mb20">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm password"
                name="repeatpassword"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                required
              />
            </div>
          </div>
        </div>

        <div className="mb20 text-center">
          <span
            className="float-start"
            style={{ fontSize: "13px", color: "grey" }}
          >
            Use 8 or more characters with a mix of letters, numbers & symbols
          </span>
          <br />
          <span
            className="float-start"
            style={{ fontSize: "13px", color: "red" }}
            id="passworderror"
          ></span>
        </div>
        {/* End .form-group */}

        <div className="col-xl-12">
          <div className="my_profile_setting_input">
            {/* <button className="btn btn1 float-start">Back</button> */}
            <button type="submit" className="btn btn2 float-end">
              Create
            </button>

            {/* <button type="reset" className="btn btn3 float-end">
              Clear
            </button> */}
          </div>
        </div>
        {/* login button */}
      </form>

      {/* Sign in with google fb */}
    </>
  );
};

export default Form;