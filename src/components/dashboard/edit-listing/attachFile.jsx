import { useState } from "react";
import { useRouter } from "next/router";
import { uploadToS3 } from "../../../lib/s3Utils";
import { v1 } from "uuid";

export default function AttachFile() {
  const [file, setFile] = useState(null);
  const [uploadFile, setUploadFile] = useState("");
  const [successToast, setSuccessToast] = useState("none");
  const [errorToast, setErrorToast] = useState("none");
  const [nofileToast, setNofileToast] = useState("none");
  const router = useRouter();
  const UUIDv1 = v1();

  const getFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploadFile("true");
    const iD = e.target.propertyid.value;

    if (!file) {
      setUploadFile("");
      setNofileToast("block");
    }

    if (file) {
      const url = await uploadToS3(UUIDv1 + file.name, file);

      const data = {
        iD,
        url,
      };

      // Send the data to the server in JSON format.
      const JSONdata = JSON.stringify(data);

      // API endpoint where we send form data.
      const endpoint = "/api/attachFile";

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

      if (result.addAttachment) {
        setUploadFile("");
        setSuccessToast("block");
        e.target.reset();
      } else {
        setUploadFile("");
        setErrorToast("block");
      }
    }
  };

  return (
    <>
      <span 
      // style={{fontSize: "11px"}} 
      class="badge text-bg-success mb-2 rounded-5">
        <i class="fa fa-check-circle"></i>
        &nbsp;
        New
      </span>
      <h3>Add a PDF Attachment</h3>
      <div className="col-sm-12">
        <div className="resume_uploader">
          <form onSubmit={handleSubmit}>
            <input
              style={{ display: "none" }}
              className="form-check-input"
              type="radio"
              id="Id"
              value={router.query.index}
              required
              name="propertyid"
              checked
              disabled
            />
            {/* <span>{router.query.index}</span> */}
            <input
              className="form-control border border-white mb-2 d-inline"
              type="file"
              id="formFile"
              onChange={getFile}
              accept=".pdf"
            />

            {file !== null && (
              <button
                type="reset"
                className="btn btn-danger rounded-5 px-2 me-1"
              >
                <i className="fa fa-times"></i>
              </button>
            )}

            {uploadFile === "" && (
              <button type="submit" className="btn btn-dark rounded-5 px-4">
                Add File &nbsp; <i className="fa fa-file"></i>
              </button>
            )}

            {uploadFile === "true" && (
              <button type="submit" className="btn btn-dark rounded-5 px-4">
                Adding... &nbsp;
                <span
                  className="spinner-border spinner-border-sm text-light"
                  role="status"
                  aria-hidden="true"
                ></span>
              </button>
            )}
          </form>
        </div>
      </div>
      {/* No File Toast */}
      <div
        className="toast position-fixed bottom-0 end-0 mb70 mr20 text-bg-secondary-emphasis border-0"
        role="alert"
        style={{ display: nofileToast }}
        // style={{ display: "block" }}
      >
        <div className="d-flex">
          <div className="toast-body">
            <span className="fa fa-exclamation mr10 text-danger"></span>
            <span>No file added</span>
          </div>
          <button
            type="button"
            class="btn-close btn-close text-success me-2 m-auto"
            onClick={() => {
              setNofileToast("none");
            }}
          ></button>
        </div>
      </div>
      {/* No File Toast */}

      {/* Success Toast*/}
      <div
        className="toast position-fixed bottom-0 end-0 mb70 mr20 text-bg-secondary-emphasis border-0"
        role="alert"
        style={{ display: successToast }}
        // style={{ display: "block" }}
      >
        <div className="d-flex">
          <div className="toast-body">
            <span className="flaticon-tick text-success mr20"></span>
            <span className="text-success">
              File added successfully
              <br />
            </span>
            {/* <span className="fa fa-exclamation-circle text-secondary mr20"></span>
            <span>PS: Sign out for changes to take effect.</span> */}
          </div>
          <button
            type="button"
            className="btn-close btn-close text-success me-2 m-auto"
            onClick={() => {
              setSuccessToast("none");
            }}
          ></button>
        </div>
      </div>
      {/* End of Success Toast*/}

      {/* Error on Image update Toast */}
      <div
        className="toast position-fixed bottom-0 end-0 mb70 mr20 text-bg-secondary-emphasis border-0"
        role="alert"
        style={{ display: errorToast }}
        // style={{ display: "block" }}
      >
        <div className="d-flex">
          <div className="toast-body">
            <span className="fa fa-exclamation-triangle mr10 text-danger"></span>
            <span>Something went wrong.</span>
          </div>
          <button
            type="button"
            className="btn-close btn-close text-success me-2 m-auto"
            onClick={() => {
              setErrorToast("none");
            }}
          ></button>
        </div>
      </div>
      {/* Error on Image update Toast */}
    </>
  );
}
