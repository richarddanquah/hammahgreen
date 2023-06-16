import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { uploadToS3 } from "../../../lib/s3Utils";
import Link from "next/link";
import { v1 } from "uuid";

const EditListing = ({ theListing }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const UUIDv1 = v1();
  const [mainImg, setMainImg] = useState(null);

  const [updatingText, setUpdatingText] = useState("");
  const [successToast, setSuccessToast] = useState("none");
  const [errorToast, setErrorToast] = useState("none");

  const [updatingImg, setUpdatingImg] = useState("");
  const [imgUpdatedToast, setImgUpdatedToast] = useState("none");
  const [failedImgUpdatedToast, setfailedImgUpdatedToast] = useState("none");

  // console.log(theListing);

  // upload main Image
  const uploadMainImg = (e) => {
    setMainImg(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setUpdatingText("true");
    const data = {
      id: event.target.propertyid.value,
      title: event.target.title.value,
      description: event.target.description.value,
      saletag: event.target.saletag.value,
      price: event.target.price.value,
      type: event.target.type.value,
      location: event.target.location.value,
      bedrooms: event.target.bedrooms.value,
      baths: event.target.baths.value,
      sqft: event.target.sqft.value,
      amenities: event.target.amenities.value,
      built: event.target.built.value,
      featured: event.target.featured.value,
      garages: event.target.garages.value,
      postername: event.target.postername.value,
      posted: event.target.posted.value,
    };

    // console.log(data);

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data);

    // API endpoint where we send form data.
    const endpoint = "/api/editListing";

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

    const returnedData = result.updatedListing;
    const returnedError = result.error;
    console.log(returnedError);
    console.log(returnedData);

    if (returnedData) {
      setSuccessToast("block");
      setUpdatingText("");
      // alert(`${returnedData.title} listing updated successfully.`);
      // window.location.replace("/my-properties");
    } else if (returnedError) {
      setErrorToast("block");
      setUpdatingText("");
      // alert('The "title" of your listing already exists.');
    }
  };

  const handleUpload = async function (e) {
    e.preventDefault();
    setUpdatingImg("true");
    // Get selected file
    const file = mainImg;
    // console.log(file);

    if (!file) {
      alert("Please select an image file.");
      return;
    }

    const ID = e.target.propertyid.value;
    // console.log(ID);

    const url = await uploadToS3(UUIDv1 + file.name, file);
    console.log(url);
    
    const uploadData = {
      propertyId: ID,
      imgUrl: url,
    };

    console.log(uploadData);

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(uploadData);

    // API endpoint where we send form data.
    const endpoint = "/api/editListingImg";

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
      window.location.replace("/my-properties");
      // alert(`Listing Image updated successfully`);
    } else {
      setUpdatingImg("");
      setfailedImgUpdatedToast("block");
      // alert("Something went wrong. Try again.");
    }
  };

  return (
    <>
      <form
        onSubmit={handleUpload}
        className="mb50 rounded-4 shadow-sm p20 bg-white border"
      >
        <div
          style={{ display: "none" }}
          className="form-group form-check custom-checkbox mb-3"
        >
          <input
            className="form-check-input"
            type="radio"
            id="Id"
            value={router.query.index}
            required
            name="propertyid"
            checked
            disabled
          />
          <label
            className="form-check-label form-check-label float-start"
            htmlFor="Id"
          >
            Property Listing ID {router.query.index}
          </label>
        </div>

        <div className="col-lg-12">
          <div className="wrap-custom-file2">
            <input
              type="file"
              id="mainImg"
              accept="image/*"
              onChange={uploadMainImg}
            />
            <label
              style={
                mainImg
                  ? {
                      backgroundImage: `url(${URL.createObjectURL(mainImg)})`,
                    }
                  : undefined
              }
              htmlFor="mainImg"
            >
              <span>
                <i className="flaticon-download-arrow"></i> Upload Image{" "}
              </span>
            </label>
          </div>
        </div>

        {mainImg && (
          <>
            <div className="text-center mt10">
              {updatingImg === "" && (
                <button
                  type="submit"
                  className="btn btn-success btn-sm w-50 rounded-5"
                >
                  Update listing image
                </button>
              )}

              {updatingImg === "true" && (
                <button
                  type="button"
                  className="btn btn-success btn-sm w-50 rounded-5"
                  disabled
                >
                  <span
                    className="spinner-border spinner-border-sm text-light"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  &nbsp; Updating...
                </button>
              )}
            </div>
          </>
        )}
      </form>

      <form
        onSubmit={handleSubmit}
        className="rounded shadow-sm p20 bg-white border"
      >
        <div
          style={{ display: "none" }}
          className="form-group form-check custom-checkbox mb-3"
        >
          <input
            className="form-check-input"
            type="radio"
            id="Id"
            value={router.query.index}
            required
            name="propertyid"
            checked
            disabled
          />
          <label
            className="form-check-label form-check-label float-start"
            htmlFor="Id"
          >
            Property Listing ID {router.query.index}
          </label>
        </div>

        <div className="col-lg-12">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="propertyTitle">Property Title</label>
            <input
              type="text"
              className="form-control"
              id="propertyTitle"
              name="title"
              defaultValue={theListing.title}
              required
            />
          </div>
        </div>
        {/* End .col */}

        <div className="col-lg-12">
          <div className="my_profile_setting_textarea">
            <label htmlFor="propertyDescription">Description</label>
            <textarea
              className="form-control"
              id="propertyDescription"
              rows="3"
              name="description"
              defaultValue={theListing.description}
              required
            ></textarea>
          </div>
        </div>
        {/* End .col */}

        <div className="row">
          <div className="col-lg-3 col-xl-3">
            <div className="my_profile_setting_input ui_kit_select_search form-group">
              <label>Sale Tag</label>
              <select
                className="selectpicker form-select"
                data-live-search="true"
                data-width="100%"
                name="saletag"
                required
              >
                <option selected data-tokens={theListing.saleTag}>
                  {theListing.saleTag}
                </option>
                <option data-tokens="For sale">For sale</option>
                <option data-tokens="For rent">For rent</option>
                <option data-tokens="Sold">Sold</option>
              </select>
            </div>
          </div>
          {/* End .col */}

          <div className="col-lg-3 col-xl-3">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="formGroupExamplePrice">Price</label>
              <input
                type="number"
                min="10000"
                className="form-control"
                id="formGroupExamplePrice"
                name="price"
                defaultValue={theListing.price}
                required
              />
            </div>
          </div>
          {/* End .col */}

          <div className="col-lg-3 col-xl-3">
            <div className="my_profile_setting_input ui_kit_select_search form-group">
              <label>Property Type</label>
              <select
                className="selectpicker form-select"
                data-live-search="true"
                data-width="100%"
                name="type"
                required
              >
                <option selected data-tokens={theListing.type}>
                  {theListing.type}
                </option>
                <option data-tokens="House">House</option>
                <option data-tokens="Land">Land</option>
                <option data-tokens="Condo">Condo</option>
                <option data-tokens="Apartment">Apartment</option>
                <option data-tokens="Bungalow">Bungalow</option>
              </select>
            </div>
          </div>
          {/* End .col */}

          <div className="col-lg-3 col-xl-3">
            <div className="my_profile_setting_input ui_kit_select_search form-group">
              <label>Location</label>
              <select
                className="selectpicker form-select"
                data-live-search="true"
                data-width="100%"
                name="location"
                required
              >
                <option data-tokens={theListing.location}>
                  {theListing.location}
                </option>
                <option data-tokens="Waterviews">Waterviews</option>
                <option data-tokens="Winneba Estates">Winneba Estates</option>
                <option data-tokens="Soro Kro">Soro Kro</option>
              </select>
            </div>
          </div>
          {/* End .col */}
        </div>

        <div className="row">
          <div className="col-lg-3 col-xl-3">
            <div className="my_profile_setting_input ui_kit_select_search form-group">
              <label>Bedrooms</label>
              <select
                className="selectpicker form-select"
                data-live-search="true"
                data-width="100%"
                name="bedrooms"
                required
              >
                <option data-tokens={theListing.bedrooms}>
                  {theListing.bedrooms}
                </option>
                <option data-tokens="n/a">n/a</option>
                <option data-tokens="1">1</option>
                <option data-tokens="2">2</option>
                <option data-tokens="3">3</option>
                <option data-tokens="4">4</option>
                <option data-tokens="5">5</option>
                <option data-tokens="6">6</option>
                <option data-tokens="7">7</option>
                <option data-tokens="8">8</option>
              </select>
            </div>
          </div>
          {/* End .col */}

          <div className="col-lg-3 col-xl-3">
            <div className="my_profile_setting_input ui_kit_select_search form-group">
              <label>Baths</label>
              <select
                className="selectpicker form-select"
                data-live-search="true"
                data-width="100%"
                name="baths"
                required
              >
                <option data-tokens={theListing.baths}>
                  {theListing.baths}
                </option>
                <option data-tokens="n/a">n/a</option>
                <option data-tokens="1">1</option>
                <option data-tokens="2">2</option>
                <option data-tokens="3">3</option>
                <option data-tokens="4">4</option>
                <option data-tokens="5">5</option>
                <option data-tokens="6">6</option>
                <option data-tokens="7">7</option>
                <option data-tokens="8">8</option>
              </select>
            </div>
          </div>
          {/* End .col */}

          <div className="col-lg-3 col-xl-3">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="formGroupExamplePrice">SqFt</label>
              <input
                type="number"
                min="1"
                className="form-control"
                id="formGroupExamplePrice"
                name="sqft"
                defaultValue={theListing.sqft}
                required
              />
            </div>
          </div>
          {/* End .col */}

          <div className="col-lg-3 col-xl-3">
            <div className="my_profile_setting_input ui_kit_select_search form-group">
              <label>Garages</label>
              <select
                className="selectpicker form-select"
                data-live-search="true"
                data-width="100%"
                name="garages"
                required
              >
                <option data-tokens={theListing.garages}>
                  {theListing.garages}
                </option>
                <option data-tokens="Yes">Yes</option>
                <option data-tokens="No">No</option>
              </select>
            </div>
          </div>
          {/* End .col */}
        </div>

        <div className="row">
          <div className="col-lg-3 col-xl-3">
            <div className="my_profile_setting_input ui_kit_select_search form-group">
              <label>Amenities</label>
              <select
                className="selectpicker form-select"
                data-live-search="true"
                data-width="100%"
                name="amenities"
                required
              >
                <option data-tokens={theListing.amenities}>
                  {theListing.amenities}
                </option>
                <option data-tokens="Air-conditioning">Air-conditioning</option>
                <option data-tokens="Barbeque">Barbeque</option>
                <option data-tokens="Gym">Gym</option>
                <option data-tokens="Tv-cable">Tv-cable</option>
                <option data-tokens="Lawn">Lawn</option>
                <option data-tokens="Swimming-pool">Swimming-pool</option>
                <option data-tokens="n/a">n/a</option>
              </select>
            </div>
          </div>
          {/* End .col */}

          <div className="col-lg-3 col-xl-3">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="formGroupExamplePrice">Built</label>
              <input
                type="number"
                name="built"
                min="2018"
                defaultValue={theListing.built}
                className="form-control"
                id="formGroupExamplePrice"
                required
              />
            </div>
          </div>

          <div className="col-lg-3 col-xl-3">
            <div className="my_profile_setting_input ui_kit_select_search form-group">
              <i
                style={{ fontSize: "13px" }}
                className="fa fa-info-circle"
                title="Select 'Yes' to show as a Featured Property listing"
              ></i>
              &nbsp;
              <label>Featured</label>
              <select
                className="selectpicker form-select"
                data-live-search="true"
                data-width="100%"
                name="featured"
                required
              >
                <option data-tokens={theListing.featured}>
                  {theListing.featured}
                </option>
                <option data-tokens="Yes">Yes</option>
                <option data-tokens="No">No</option>
              </select>
            </div>
          </div>
          {/* End .col */}
        </div>

        <div className="row">
          <div className="col-lg-6">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="posted">Date Posted</label>
              <input
                type="text"
                className="form-control"
                id="posted"
                name="posted"
                value={new Date().toDateString()}
                required
                disabled
              />
            </div>
          </div>
          {/* End .col */}

          <div className="col-lg-6">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="posterName">Poster Name</label>
              <input
                type="text"
                className="form-control"
                id="posterName"
                name="postername"
                value={session.user.name}
                required
                disabled
              />
            </div>
          </div>
          {/* End .col */}
        </div>

        <div className="row">
          <div className="col-xl-12">
            <div className="my_profile_setting_input">
              {/* <button type="reset" className="btn btn1 float-start">
                Clear
              </button> */}

              {updatingText === "" && (
                <button type="submit" className="btn btn2 float-end rounded-5">
                  <span className="flaticon-edit"></span>
                  &nbsp; Update
                </button>
              )}

              {updatingText === "true" && (
                <button type="submit" className="btn btn2 float-end rounded-5" disabled>
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
        </div>
      </form>

      {/* Success Toast*/}
      <div class="toast-container position-fixed bottom-0 end-0 pb10 pr10">
        <div id="liveToast" class="toast" style={{ display: successToast }}>
          <div class="toast-body rounded-2">
            <span className="flaticon-tick mr10 text-success"></span>
            Listing updated successfully
            <div class="mt-2">
              <Link href="/my-properties">
                <button
                  type="button"
                  class="btn btn-secondary-emphasis btn-sm rounded-5"
                >
                  View all listings
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
            <span className="flaticon-tick mr10 text-success mr20"></span>
            <span className="text-success">
              Listing image updated successfully.
            </span>
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
              setfailedImgUpdatedToast("none")
            }}
          ></button>
        </div>
      </div>
      {/* Error on Image update Toast */}
    </>
  );
};

export default EditListing;
