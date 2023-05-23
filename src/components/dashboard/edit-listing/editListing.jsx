import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const EditListing = ({ theListing }) => {
  const [mainImg, setMainImg] = useState(null);
  const { data: session } = useSession();
  const router = useRouter();
  // console.log(theListing);

  // upload main Image
  const uploadMainImg = (e) => {
    setMainImg(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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

    console.log(data);

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
      alert(`${returnedData.title} listing updated successfully.`);
      window.location.replace("/my-properties");
    } else if (returnedError) {
      alert('The "title" of your listing already exists.');
    }
  };

  const handleUpload = async function (e) {
    e.preventDefault();

    // Get selected file
    const file = mainImg;
    // console.log(file);

    if (!file) {
      alert("Please select an image file.");
      return;
    }

    const ID = e.target.propertyid.value;
    // console.log(ID);

    // create a new FileReader object
    const reader = new FileReader();

    // read the file as a data URL
    reader.readAsDataURL(file);

    // when the file is loaded, send it to the server
    reader.onload = () => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/api/uploadPropertyImg");
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(
        JSON.stringify({
          filename: file.name,
          data: reader.result,
          propertyId: ID,
        })
      );

      xhr.onreadystatechange = async () => {
        if (xhr.readyState === 4) {
          const result = await xhr.response;
          console.log(result);
          if (result === "Body exceeded 1mb limit") {
            alert("The image exceeds the 1mb limit");
          } else {
            alert("Listing image updated successfully");
            window.location.replace("/my-properties");
          }
        }
      };
    };
  };

  return (
    <>
      <form onSubmit={handleUpload} className="mb50 rounded-4 shadow-sm p20 bg-white border">
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
              <button type="submit" className="btn btn-success btn-sm w-50 rounded-5">
                 Update listing image {/* &nbsp; <i className="fa fa-save"></i> */}
              </button>
            </div>
          </>
        )}
      </form>

      <form onSubmit={handleSubmit} className="rounded shadow-sm p20 bg-white border">
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
                <option data-tokens="The heights">The heights</option>
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
                <option data-tokens={theListing.amenities}>{theListing.amenities}</option>
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
                style={{fontSize: "13px"}}
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
                <option data-tokens={theListing.featured}>{theListing.featured}</option>
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
              <button type="reset" className="btn btn1 float-start">
                Clear
              </button>
              <button type="submit" className="btn btn2 float-end">
                Update
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditListing;
