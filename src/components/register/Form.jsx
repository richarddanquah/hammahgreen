import Link from "next/link";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const Form = () => {
  const { data: session, status } = useSession();
  const [username, setUsername] = useState("");

  //   function handleSubmit(e) {
  //     // Prevent the browser from reloading the page
  //     e.preventDefault();

  //     // Read the form data
  //     const form = e.target;
  //     const formData = new FormData(form);

  //     // You can pass formData as a fetch body directly:
  //     //  fetch('/some-api', { method: form.method, body: formData });

  //     // Or you can work with it as a plain object:
  //     const formJson = Object.fromEntries(formData.entries());
  //     console.log(formJson);
  //   }

  return (
    <>
      <form method="post" action="/api/register">
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

        <div className="form-group input-group">
          <input
            type="text"
            className="form-control"
            required
            placeholder="User Name"
            name="username"
          />
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="flaticon-user"></i>
            </div>
          </div>
        </div>
        {/* End .form-group */}

        <div className="form-group input-group">
          <input
            type="email"
            className="form-control"
            required
            placeholder="Email"
            name="email"
          />
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fa fa-envelope-o"></i>
            </div>
          </div>
        </div>
        {/* End .form-group */}

        <div className="form-group input-group  ">
          <input
            type="password"
            className="form-control"
            required
            placeholder="Password"
            name="password"
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
            required
            placeholder="Re-enter password"
            name="passwordagain"
          />
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="flaticon-password"></i>
            </div>
          </div>
        </div>
        {/* End .form-group */}

        <div className="form-group form-check custom-checkbox mb-3">
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
        </div>
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
