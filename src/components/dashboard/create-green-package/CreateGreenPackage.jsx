import { useState } from "react";
import { useSession } from "next-auth/react";

const CreateGreenPackage = () => {
  const [adding, setAdding] = useState("");
  const [addedPackageToast, setAddedPackageToast] = useState("none");
  const [failedToast, setFailedToast] = useState("none");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setAdding("true");

    const data = {
      title: event.target.title.value,
      price: event.target.price.value,
      features: [
        event.target.feature1.value,
        event.target.feature2.value,
        event.target.feature3.value,
        event.target.feature4.value,
      ],
    };

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data);

    // API endpoint where we send form data.
    const endpoint = "/api/addPackage";

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

    if (result.createdPackage) {
      setAddedPackageToast("block");
      setAdding("");
      // event.target.reset();
      window.location.reload();
    } else if (result.error) {
      setFailedToast("block");
      setAdding("");
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="p20 border-0 rounded-2 shadow-sm bg-white"
      >
        <div className="row">
          <div className="col-lg-9">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="Title">Package Title</label>
              <input
                type="text"
                className="form-control"
                id="Title"
                name="title"
                required
              />
            </div>
          </div>
          <div className="col-lg-3 col-xl-3">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="formGroupExamplePrice">Price</label>
              <input
                type="number"
                min="10000"
                className="form-control"
                id="formGroupExamplePrice"
                name="price"
                required
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6">
            <div className="my_profile_setting_textarea">
              <label htmlFor="propertyDescription">Feature(s)</label>
              <textarea
                className="form-control"
                id="propertyDescription"
                rows="2"
                name="feature1"
              ></textarea>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="my_profile_setting_textarea">
              <label>Feature(s)</label>
              <textarea
                className="form-control"
                rows="2"
                name="feature2"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6">
            <div className="my_profile_setting_textarea">
              <label>Feature(s)</label>
              <textarea
                className="form-control"
                rows="2"
                name="feature3"
              ></textarea>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="my_profile_setting_textarea">
              <label>Feature(s)</label>
              <textarea
                className="form-control"
                id="propertyDescription"
                rows="2"
                name="feature4"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-12">
            <div className="my_profile_setting_input">
              {adding === "" && (
                <button type="submit" className="btn btn2 float-end rounded-5">
                  <span className="flaticon-plus"></span>
                  &nbsp; Add
                </button>
              )}

              {adding === "true" && (
                <button
                  type="button"
                  className="btn btn2 float-end rounded-5"
                  disabled
                >
                  <span
                    className="spinner-border spinner-border-sm text-light"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  &nbsp; Adding...
                </button>
              )}
            </div>
          </div>
        </div>
      </form>

      {/* Successfully created user toast */}
      <div
        class="toast position-fixed bottom-0 end-0 mb20 mr20 text-bg-secondary-emphasis border-0"
        role="alert"
        style={{ display: addedPackageToast }}
        // style={{ display: "block" }}
      >
        <div class="d-flex">
          <div class="toast-body">
            <span className="flaticon-tick mr10 text-success mr20"></span>
            <span className="text-success">Package added successfully.</span>
          </div>
          <button
            type="button"
            class="btn-close btn-close text-success me-2 m-auto"
            onClick={() => {
              setAddedPackageToast("none");
            }}
          ></button>
        </div>
      </div>
      {/* Successfully created user toast */}

      {/* Failed to create user toast */}
      <div
        class="toast position-fixed bottom-0 end-0 mb10 mr20 text-bg-secondary-emphasis border-0"
        role="alert"
        style={{ display: failedToast }}
        // style={{ display: "block" }}
      >
        <div class="d-flex">
          <div class="toast-body">
            <span className="fa fa-times-circle mr10 text-danger mr20"></span>
            <span className="text-danger">Failed to add package.</span>
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
      {/* Failed to create user toast */}
    </>
  );
};

export default CreateGreenPackage;
