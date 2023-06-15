import { useState } from "react";
import { uploadToS3 } from "../../../lib/s3Utils";
import { v1 } from "uuid";
import Link from "next/link";
import { useSession } from "next-auth/react";

const ProfileInfo = ({ theUser }) => {
  const [profile, setProfile] = useState(null);
  const UUIDv1 = v1();
  const [updatingText, setUpdatingText] = useState("");
  const [successToast, setSuccessToast] = useState("none");
  const [errorToast, setErrorToast] = useState("none");

  const [updatingImg, setUpdatingImg] = useState("");
  const [imgUpdatedToast, setImgUpdatedToast] = useState("none");
  const [failedImgUpdatedToast, setfailedImgUpdatedToast] = useState("none");

  const { data: session, status } = useSession();

  // upload profile
  const uploadProfile = (e) => {
    setProfile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleSubmit = async function (e) {
    // Prevent the browser from reloading the page
    e.preventDefault();
    setUpdatingText("true");

    const userId = e.target.userId.value;
    const firstname = e.target.fname.value;
    const lastname = e.target.lname.value;
    const email = e.target.email.value;
    const position = e.target.position.value;
    const license = e.target.license.value;
    const mobile = e.target.mobile.value;
    const company = e.target.company.value;
    const address = e.target.address.value;
    const about = e.target.about.value;

    const data = {
      userId,
      firstname,
      lastname,
      email,
      position,
      license,
      mobile,
      company,
      address,
      about,
    };

    // console.log(data);

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data);

    // API endpoint where we send form data.
    const endpoint = "/api/updateUserProfile";

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

    const returnedData = result.updateUser;
    const returnedError = result.error;

    if (returnedData) {
      setSuccessToast("block");
      setUpdatingText("");
      window.location.reload();
    } else if (returnedError) {
      setErrorToast("block");
      setUpdatingText("");
      window.location.reload();
    }
  };

  const handleUpload = async function (e) {
    e.preventDefault();
    setUpdatingImg("true");

    // Get selected file
    const file = profile;
    // console.log(file);

    if (!file) {
      alert("Please select an image file.");
      return;
    }

    const ID = e.target.userId.value;

    const url = await uploadToS3(UUIDv1 + file.name, file);
    console.log(url);
    
    const uploadData = {
      userId: ID,
      userImgUrl: url,
    };

    console.log(uploadData);

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(uploadData);

    // API endpoint where we send form data.
    const endpoint = "/api/uploadProfileImg";

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

    console.log(response);

    if (response.status === 200) {
      setUpdatingImg("");
      setImgUpdatedToast("block");
      window.location.reload();
    } else {
      setUpdatingImg("");
      setfailedImgUpdatedToast("block");
    }
  };

  return (
    <>
      <form
        onSubmit={handleUpload}
        style={{ display: "inline-block" }}
        className="mb50 text-center rounded-4 border shadow-sm p20 bg-white"
      >
        <div
          style={{ display: "none" }}
          className="form-group form-check custom-checkbox mb-3"
        >
          <input
            className="form-check-input"
            type="radio"
            id="Id"
            required
            name="userId"
            value={theUser._id}
            checked
            disabled
          />
          <label
            className="form-check-label form-check-label float-start"
            htmlFor="Id"
          >
            User ID {theUser._id}
          </label>
        </div>

        <div className="wrap-custom-file">
          <input
            type="file"
            id="userImage"
            accept="image/png, image/gif, image/jpeg"
            onChange={uploadProfile}
          />

          {session && (
            <>
              <label
                style={
                  profile === null
                    ? {
                        backgroundImage: `url(${
                          session.user.image
                            ? session.user.image
                            : "/assets/images/profileImgs/avatar.png"
                        })`,
                      }
                    : profile
                    ? {
                        backgroundImage: `url(${URL.createObjectURL(profile)})`,
                      }
                    : {
                        backgroundImage: `url(${
                          session.user.image
                            ? session.user.image
                            : "/assets/images/profileImgs/avatar.png"
                        })`,
                      }
                }
                htmlFor="userImage"
              >
                <span>
                  <i className="flaticon-edit"></i> Change
                </span>
              </label>
            </>
          )}
        </div>

        {/* <p style={{fontSize: "10px"}}>*minimum 260px x 260px</p> */}

        {profile && (
          <>
            <br />
            <br />

            {updatingImg === "" && (
              <button
                type="submit"
                className="shadow-sm btn w-100 rounded-5 border border-secondary-emphasis"
              >
                <span className="flaticon-edit"></span>
                &nbsp; Save as profile photo
              </button>
            )}

            {updatingImg === "true" && (
              <button
                type="submit"
                className="shadow-sm btn w-100 rounded-5 border border-secondary-emphasis"
                disabled
              >
                <span
                  className="spinner-border spinner-border-sm text-success"
                  role="status"
                  aria-hidden="true"
                ></span>
                &nbsp; Saving...
              </button>
            )}
          </>
        )}
      </form>

      <form
        onSubmit={handleSubmit}
        className="rounded-3 shadow-sm p20 bg-white border"
      >
        <div
          style={{ display: "none" }}
          className="form-group form-check custom-checkbox mb-3"
        >
          <input
            className="form-check-input"
            type="radio"
            id="Id"
            required
            name="userId"
            value={theUser._id}
            checked
            disabled
          />
          <label
            className="form-check-label form-check-label float-start"
            htmlFor="Id"
          >
            User ID {theUser._id}
          </label>
        </div>

        <div className="row">
          {/* <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="formGroupExampleInput1">Username</label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput1"
              placeholder="alitfn"
            />
          </div>
        </div> */}
          {/* End .col */}

          <div className="col-lg-6 col-xl-6">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="formGroupExampleInput3">First Name</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput3"
                name="fname"
                defaultValue={theUser.fname}
              />
            </div>
          </div>
          {/* End .col */}

          <div className="col-lg-6 col-xl-6">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="formGroupExampleInput4">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput4"
                name="lname"
                defaultValue={theUser.lname}
              />
            </div>
          </div>
          {/* End .col */}

          <div className="col-lg-6 col-xl-6">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="formGroupExampleEmail">Email</label>
              <input
                type="email"
                className="form-control"
                id="formGroupExampleEmail"
                name="email"
                defaultValue={theUser.email}
              />
            </div>
          </div>
          {/* End .col */}

          <div className="col-lg-6 col-xl-6">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="formGroupExampleInput5">Position</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput5"
                name="position"
                defaultValue={theUser.position}
              />
            </div>
          </div>
          {/* End .col */}

          <div className="col-lg-6 col-xl-6">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="formGroupExampleInput6">License</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput6"
                name="license"
                defaultValue={theUser.license}
              />
            </div>
          </div>
          {/* End .col */}

          {/* <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="formGroupExampleInput7">Tax Number</label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput7"
            />
          </div>
        </div> */}
          {/* End .col */}

          {/* <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="formGroupExampleInput8">Phone</label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput8"
            />
          </div>
        </div> */}
          {/* End .col */}

          {/* <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleInput9">Fax Number</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput9"
          />
        </div>
        </div> */}
          {/* End .col */}

          <div className="col-lg-6 col-xl-6">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="formGroupExampleInput10">Mobile</label>
              <input
                type="number"
                className="form-control"
                id="formGroupExampleInput10"
                name="mobile"
                defaultValue={theUser.mobile}
              />
            </div>
          </div>
          {/* End .col */}

          {/* <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="formGroupExampleInput11">Language</label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput11"
            />
          </div>
        </div> */}
          {/* End .col */}

          <div className="col-lg-6 col-xl-6">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="formGroupExampleInput12">Company Name</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput12"
                name="company"
                defaultValue={theUser.company}
              />
            </div>
          </div>
          {/* End .col */}

          <div className="col-lg-6 col-xl-6">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="formGroupExampleInput13">Address</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput13"
                name="address"
                defaultValue={theUser.address}
              />
            </div>
          </div>
          {/* End .col */}

          <div className="col-xl-12">
            <div className="my_profile_setting_textarea">
              <label htmlFor="exampleFormControlTextarea1">About me</label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="7"
                name="about"
                defaultValue={theUser.about}
              ></textarea>
            </div>
          </div>
          {/* End .col */}

          <div className="col-xl-12">
            <div className="my_profile_setting_input">
              {updatingText === "" && (
                <button type="submit" className="btn btn2 rounded-5">
                  <span className="flaticon-edit"></span>
                  &nbsp; Update
                </button>
              )}

              {updatingText === "true" && (
                <button type="submit" className="btn btn2 rounded-5" disabled>
                  <span
                    className="spinner-border spinner-border-sm text-light"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  &nbsp; Updating...
                </button>
              )}
            </div>
          </div>
          {/* End .col */}
        </div>
      </form>

      {/* Success Toast*/}
      <div class="toast-container position-fixed bottom-0 end-0 pb10 pr10">
        <div id="liveToast" class="toast" style={{ display: successToast }}>
          <div class="toast-body rounded-2">
            <span className="flaticon-tick mr10 text-success"></span>
            Profile info updated successfully
            <div class="mt-2">
              <Link href="/my-dashboard">
                <button
                  type="button"
                  class="btn btn-secondary-emphasis btn-sm rounded-5"
                >
                  Go to Dashboard
                </button>
              </Link>
              &nbsp;
              <button
                type="button"
                class="btn btn-danger btn-sm rounded-5"
                onClick={() => {
                  setSuccessToast("none");
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End of Success Toast*/}

      {/* Error Toast*/}
      <div class="toast-container position-fixed bottom-0 end-0 pb10 pr10">
        <div id="liveToast" class="toast" style={{ display: errorToast }}>
          <div class="toast-body rounded-2">
            <span className="fa fa-exclamation-triangle mr10 text-danger"></span>
            Something went wrong. Try again.
            <div class="mt-2">
              <button
                type="button"
                class="btn btn-danger btn-sm rounded-5"
                onClick={() => {
                  setErrorToast("none");
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End of Error Toast*/}

      {/* Successfully Image update Toast */}
      <div
        class="toast position-fixed bottom-0 end-0 mb10 mr20 text-bg-secondary-emphasis border-0"
        role="alert"
        style={{ display: imgUpdatedToast }}
        // style={{ display: "block" }}
      >
        <div class="d-flex">
          <div class="toast-body">
            <span className="flaticon-tick text-success mr20"></span>
            <span className="text-success">
              Profile photo updated successfully. <br />
            </span>
            <span className="fa fa-exclamation-circle text-secondary mr20"></span>
            <span>PS: Sign out for changes to take effect.</span>
          </div>
          <button
            type="button"
            class="btn-close btn-close text-success me-2 m-auto"
            onClick={() => {
              setImgUpdatedToast("none");
            }}
          ></button>
        </div>
      </div>
      {/* Successfully Image update Toast */}

      {/* Error on Image update Toast */}
      <div
        class="toast position-fixed bottom-0 end-0 mb10 mr20 text-bg-secondary-emphasis border-0"
        role="alert"
        style={{ display: failedImgUpdatedToast }}
        // style={{ display: "block" }}
      >
        <div class="d-flex">
          <div class="toast-body">
            <span className="fa fa-exclamation-triangle mr10 text-danger"></span>
            <span>Something went wrong.</span>
          </div>
          <button
            type="button"
            class="btn-close btn-close text-success me-2 m-auto"
            onClick={() => {
              setfailedImgUpdatedToast("none");
            }}
          ></button>
        </div>
      </div>
      {/* Error on Image update Toast */}
    </>
  );
};

export default ProfileInfo;
