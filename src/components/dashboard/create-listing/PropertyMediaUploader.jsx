import { useState } from "react";
import selectedFiles from "../../../utils/selectedFiles";
import { useRouter } from "next/router";

const PropertyMediaUploader = () => {
  const router = useRouter();
  // console.log(router.query.index);

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

    //Get FileList
    const iD = e.target.propertyid.value;
    const fileList = Array.from(e.target.imageList.files);
    // console.log(fileList);
    // console.log(fileList.length);

    if (fileList.length === 0) {
      alert("Please select a maximum of 4 images.");
      return;
    }

    if (fileList.length < 4) {
      alert(
        `You have selected ${fileList.length} image file(s). Please select a maximum of 4 images.`
      );
      return;
    }

    if (fileList.length > 4) {
      alert(
        `You have selected ${fileList.length} image file(s). Please select a maximum of 4 images.`
      );
      // console.log(fileList);
    }

    if (fileList.length === 4) {

      // This code Uploads images to the file system
      fileList.map((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const xhr = new XMLHttpRequest();
          xhr.open("POST", "/api/uploadListingImgList");
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.send(
            JSON.stringify({
              filename: file.name,
              data: reader.result,
            })
          );

          xhr.onreadystatechange = async () => {
            if (xhr.readyState === 4) {
              const result = await xhr.response;
              console.log(result);
            }
          };
        };
      });
      // This code Uploads images to the file system
      


      // This code saves the file paths to MongoDB
      const data = {
        ID: iD,
        imagePaths: [
          `/assets/images/property/${fileList[0].name}`,
          `/assets/images/property/${fileList[1].name}`,
          `/assets/images/property/${fileList[2].name}`,
          `/assets/images/property/${fileList[3].name}`,
        ],
      };

      // console.log(data);

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
        alert(
          `${returnedData.title}'s Property Media have been added successfully.`
        );
        window.location.replace("/my-properties");
      } else if (returnedError) {
        alert("Something went wrong.");
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
          <span style={{fontSize: "12px", color: "#A78C33"}}><b>* Select exactly 4 images *</b></span>
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

        <div className="col-xl-12">
          <div
            className="my_profile_setting_input"
            style={{ textAlign: "right" }}
          >
            <button type="submit" className="btn btn2">
              Add Images
            </button>
          </div>
        </div>
        {/* End .col */}
      </form>
    </div>
  );
};

export default PropertyMediaUploader;
