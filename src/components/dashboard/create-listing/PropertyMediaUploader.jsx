import { useState } from "react";
import selectedFiles from "../../../utils/selectedFiles";
import { useRouter } from "next/router";
import { uploadToS3 } from "../../../lib/s3Utils";
import { v1 } from "uuid";

const PropertyMediaUploader = () => {
  const router = useRouter();
  // console.log(router.query.index);
  const [uploading, setUploading] = useState("");
  const [imgListUploaded, setImgListUploaded] = useState("none");
  const [failedToUploadImgs, setFailedToUploadImgs] = useState("none");
  const UUIDv1 = v1();

  const [propertySelectedImgs, setPropertySelectedImgs] = useState([]);

  // multiple image select
  const multipleImage = (e) => {
    // checking is same file matched with old stored array
    const isExist = propertySelectedImgs?.some((file1) =>
      selectedFiles(e)?.some((file2) => file1.name === file2.name)
    );

    if (!isExist) {
      setPropertySelectedImgs((old) => [...old, ...selectedFiles(e)]);
    } else {
      alert("You have selected one image already!");
    }
  };

  // delete image
  const deleteImage = (name) => {
    const deleted = propertySelectedImgs?.filter((file) => file.name !== name);
    setPropertySelectedImgs(deleted);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading("true");
    //Get FileList
    const iD = e.target.propertyid.value;
    const fileList = Array.from(e.target.imageList.files);
    // console.log(fileList);
    // console.log(fileList.length);

    if (fileList.length === 0) {
      setUploading("");
      alert("Please select a maximum of 4 images.");
      return;
    }

    if (fileList.length < 4) {
      setUploading("");
      alert(
        `You have selected ${fileList.length} image file(s). Please select a maximum of 4 images.`
      );
      return;
    }

    if (fileList.length > 4) {
      setUploading("");
      alert(
        `You have selected ${fileList.length} image file(s). Please select a maximum of 4 images.`
      );
      // console.log(fileList);
    }

    if (fileList.length === 4) {
      // This code Uploads images to the file system
      const urlArray = await Promise.all(
        fileList.map(async (file) => {
          const url = await uploadToS3(UUIDv1 + file.name, file);
          return url;
        })
      );
      
      // console.log(urlArray);
      
      // This code saves the file paths to MongoDB
      const data = {
        ID: iD,
        imagePaths: urlArray,
      };
      
      console.log(data);

      // Send the data to the server in JSON format.
      const JSONdata = JSON.stringify(data);

      // API endpoint where we send form data.
      const endpoint = "/api/saveImgListToDb";

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
      const returnedData = result.updateImgList;
      const returnedError = result.error;

      if (returnedData) {
        setUploading("");
        setImgListUploaded("block");
        // window.location.replace("/my-properties");
      } else if (returnedError) {
        setUploading("");
        setFailedToUploadImgs("block");
      }
      // This code saves the file paths to MongoDB
    }
  };

  // const handleImageList = (e) => {
  //   // console.log(e.target.files);
  //   const fileList = e.target.files;
  //   const alert = document.getElementById("alert");
  //   const thumbs = document.getElementById("thumbs");

  //   if (fileList.length !== 0) {
  //     alert.innerHTML = "";
  //     // list.classList.add("");
  //     const list = document.createElement("ul");
  //     thumbs.appendChild(list);

  //     for (let i = 0; i < fileList.length; i++) {

  //       const li = document.createElement("li");
  //       li.classList.add("list-inline-item");
  //       list.appendChild(li);

  //       const img = document.createElement("img");
  //       img.classList.add("portfolio_item")
  //       img.src = URL.createObjectURL(fileList[i]);
  //       img.width = "5%";
  //       img.onload = () => {
  //         URL.revokeObjectURL(img.src);
  //       };
  //       li.appendChild(img);
  //     }
  //   } else {
  //     alert.innerHTML = "No files selected!";
  //     thumbs.style.display="none"
  //   }
  // };

  return (
    <div className="row">
      <div className="col-lg-12">
        {/* <span id="alert">No files selected!</span>
        <div id="thumbs"></div> */}
        <ul className="mb-0">
          {propertySelectedImgs.length > 0
            ? propertySelectedImgs?.map((item, index) => (
                <li key={index} className="list-inline-item">
                  <div className="portfolio_item">
                    <img
                      className="img-fluid cover"
                      src={URL.createObjectURL(item)}
                      alt="fp1.jpg"
                    />
                    <div
                      className="edu_stats_list"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Delete"
                      data-original-title="Delete"
                    >
                      <a onClick={() => deleteImage(item.name)}>
                        <span className="flaticon-garbage"></span>
                      </a>
                    </div>
                  </div>
                </li>
              ))
            : undefined}
          {/* End li */}
        </ul>
      </div>
      {/* End .col */}

      <form onSubmit={handleSubmit}>
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

        <div className="row">
          <div className="col-lg-12">
            <div className="portfolio_upload shadow-sm rounded-5">
              <input
                type="file"
                onChange={multipleImage}
                name="imageList"
                multiple
                accept="image/png, image/gif, image/jpeg"
              />
              <div className="icon">
                <span className="flaticon-download"></span>
              </div>
              <p>Click here to select images or drag images here</p>
            </div>
            <span style={{ fontSize: "12px", color: "#A78C33" }}>
              <b>* Select exactly 4 images *</b>
            </span>
          </div>
        </div>

        {/* End .col */}

        {/* <div className="col-xl-6">
          <div className="resume_uploader mb30">
            <h3>Attachments</h3>
            <form className="form-inline d-flex flex-wrap wrap">
              <input className="upload-path" />
              <label className="upload">
                <input type="file" />
                Select Attachment
              </label>
            </form>
          </div>
        </div> */}
        {/* End .col */}

        <div className="row mt20">
          <div className="col-xl-12">
            <div className="my_profile_setting_input d-flex justify-content-center">
              {uploading === "" && (
                <button type="submit" className="btn btn2 w-50 rounded-5">
                  Add Images
                </button>
              )}

              {uploading === "true" && (
                <button
                  type="button"
                  className="btn btn2 w-50 rounded-5"
                  disabled
                >
                  <span
                    className="spinner-border spinner-border-sm text-light"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  &nbsp; Adding Images...
                </button>
              )}
            </div>
          </div>
          {/* End .col */}
        </div>
      </form>

      {/* Successfully Image update Toast */}
      <div
        class="toast position-fixed bottom-0 end-0 mb10 mr20 text-bg-secondary-emphasis border-0"
        role="alert"
        style={{ display: imgListUploaded }}
        // style={{ display: "block" }}
      >
        <div class="d-flex">
          <div class="toast-body">
            <span className="flaticon-tick mr10 text-success mr20"></span>
            <span className="text-success">Images uploaded successfully.</span>
          </div>
          <button
            type="button"
            class="btn-close btn-close text-success me-2 m-auto"
            onClick={() => {
              setImgListUploaded("none");
            }}
          ></button>
        </div>
      </div>
      {/* Successfully Image update Toast */}

      {/* Error on Image update Toast */}
      <div
        class="toast position-fixed bottom-0 end-0 mb10 mr20 text-bg-secondary-emphasis border-0"
        role="alert"
        style={{ display: failedToUploadImgs }}
        // style={{ display: "block" }}
      >
        <div class="d-flex">
          <div class="toast-body">
            <span className="fa fa-times mr10 text-danger"></span>
            <span>Something went wrong.</span>
          </div>
          <button
            type="button"
            class="btn-close btn-close text-success me-2 m-auto"
            onClick={() => {
              setFailedToUploadImgs("none");
            }}
          ></button>
        </div>
      </div>
      {/* Error on Image update Toast */}
    </div>
  );
};

export default PropertyMediaUploader;
