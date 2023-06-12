import { useState } from "react";
import { useSession } from "next-auth/react";
import { v1 } from "uuid";
import { uploadToS3 } from "../../../lib/s3Utils";
import Link from "next/link";

const CreateList = () => {
  const [mainImg, setMainImg] = useState(null);
  const [uploading, setUploading] = useState("");
  const [successToast, setSuccessToast] = useState("none");
  const [errorToast, setErrorToast] = useState("none");
  const { data: session } = useSession();
  const UUIDv1 = v1();

  // upload main Image
  const uploadMainImg = (e) => {
    setMainImg(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setUploading("true");
    

    // Get selected file
    const file = mainImg;
    console.log(UUIDv1 + file.name);

    if (!file) {
      alert("Please select an image file.");
      return;
    }

    const url = await uploadToS3(UUIDv1 + file.name, file);
    console.log(url);

    const allData = {
      mainImg: url,
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

    console.log(allData);

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(allData);

    // API endpoint where we send form data.
    const endpoint = "/api/addListing";

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

    const returnedData = result.listingCreated;
    const returnedError = result.error;
    console.log(returnedError);
    console.log(returnedData);

    if (returnedData) {
      setSuccessToast("block");
      setUploading("");
      event.target.reset();
      // window.location.replace("/my-properties");
      // window.location.reload();
    } else if (returnedError) {
      setErrorToast("block");
      setUploading("");
      // alert('The "title" of your listing already exists.');
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="p20 border rounded-2 shadow-sm"
      >
        <div className="col-lg-12">
          <div className="wrap-custom-file2">
            <input
              type="file"
              id="main_Img"
              name="main_Image"
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
              htmlFor="main_Img"
            >
              <span>
                <i className="flaticon-download"></i> Upload Main Image{" "}
              </span>
            </label>
          </div>
          <p style={{ fontSize: "11px" }}>*minimum 752 x 450</p>
        </div>

        <br />

        <div className="col-lg-12">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="propertyTitle">Property Title</label>
            <input
              type="text"
              className="form-control"
              id="propertyTitle"
              name="title"
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
                min="50000"
                className="form-control"
                id="formGroupExamplePrice"
                name="price"
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
                <option data-tokens="Waterviews">Waterviews</option>
                <option data-tokens="Winneba Estates">Winneba Estates</option>
                <option data-tokens="The Heights">The Heights</option>
              </select>
            </div>
          </div>
          {/* End .col */}
        </div>

        {/* <div className="col-lg-4 col-xl-4">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleArea">Location</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleArea"
            name="location"
            required
          />
        </div>
      </div> */}
        {/* End .col */}

        {/* <div className="col-lg-3 col-xl-3">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>Bedrooms</label>
          <select
            className="selectpicker form-select"
            data-live-search="true"
            data-width="100%"
          >
            <option data-tokens="Status1">Status1</option>
            <option data-tokens="Status2">Status2</option>
            <option data-tokens="Status3">Status3</option>
            <option data-tokens="Status4">Status4</option>
            <option data-tokens="Status5">Status5</option>
          </select>
        </div>
      </div> */}
        {/* End .col */}

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
                <option data-tokens="Yes">Yes</option>
                <option data-tokens="No">No</option>
              </select>
            </div>
          </div>
        </div>
        {/* End .col */}

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

              {uploading === "" && (
                <button type="submit" className="btn btn2 float-end rounded-5">
                  <span className="flaticon-plus"></span>
                  &nbsp; Create
                </button>
              )}

              {uploading === "true" && (
                <button type="button" className="btn btn2 float-end rounded-5" disabled>
                  <span
                    className="spinner-border spinner-border-sm text-light"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  &nbsp; Creating...
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
            Listing created successfully
            <div class="mt-2">
              <Link href="/my-properties">
                <button type="button" class="btn btn-secondary-emphasis btn-sm rounded-5">
                  View all Listings
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
    </>
  );
};

export default CreateList;
