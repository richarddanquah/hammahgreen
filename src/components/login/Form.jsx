import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

const Form = () => {
  const { data: session, status } = useSession();
  console.log(session);

  const [email, setEmail] = useState("");

  // function handleSubmit(e) {
  //   e.preventDefault();

  //   // Read the form data
  //   const form = e.target;
  //   const formData = new FormData(form);

  //   // You can pass formData as a fetch body directly:
  //   //  fetch('/some-api', { method: form.method, body: formData });

  //   // Or you can work with it as a plain object:
  //   const formJson = Object.fromEntries(formData.entries());
  //   console.log(formJson);
  // }

  function handleSubmit(e) {
    e.preventDefault();

    if (!email) {
      return false;
    }

    signIn("email", { email, redirect: false });
  }

  return (
    <>
      <div className="heading text-center">
        <h3>Login</h3>
        <p className="text-center">
          Dont have an account?{" "}
          <Link href="/register">
            <a>Sign Up!</a>
          </Link>
        </p>
      </div>
      {/* End .heading */}

      {/* <form className="pt20 pb20" method="post"> */}

      {/* <div className="input-group mb-2 mr-sm-2">
          <input
            type="text"
            className="form-control"
            required
            placeholder="User Name Or Email"
            name="username"
          />
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="flaticon-user"></i>
            </div>
          </div>
        </div> */}
      {/* End .input-group */}

      {/* <div className="input-group form-group">
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
        </div> */}
      {/* End .input-group */}

      {/* <div className="form-group form-check custom-checkbox mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            value="on"
            id="rememberMe"
            name="remembermeCheckbox"
          />
          <label
            className="form-check-label form-check-label float-start"
            htmlFor="rememberMe"
          >
            Remember me
          </label>

          <a className="btn-fpswd float-end" href="#">
            Forgot password?
          </a>
        </div> */}
      {/* End .form-group */}

      {/* <button type="submit" className="btn btn-green w-100 btn-thm">
          Log In
        </button> */}
      {/* login button */}

      {/* </form> */}

      {/* <div className="divide">
        <span className="lf_divider">Or</span>
        <hr />
      </div> */}
      {/* devider */}

      {/* Sign In with Email */}

      <form className="pt20 pb20" method="post" onSubmit={handleSubmit}>
        <div className="input-group mb-2 mr-sm-2">
          <input
            onChange={(e) => {
              e.preventDefault();
              setEmail(e.target.value);
            }}
            type="text"
            className="form-control"
            required
            placeholder="Enter Your Email"
            name="email"
            // value={email}
          />
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="flaticon-user"></i>
            </div>
          </div>
        </div>
        {/* End .input-group */}

        <button type="submit" className="btn btn-green w-100 btn-thm">
          Email Signin
        </button>
      </form>

      <div className="divide">
        <span className="lf_divider">Or</span>
        <hr />
      </div>
      {/* devider */}

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
