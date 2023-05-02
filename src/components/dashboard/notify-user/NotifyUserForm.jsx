import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Form = () => {
  const [mainImg, setMainImg] = useState(null);
  const { data: session } = useSession();
  const route = useRouter();

  // upload main Image
  const uploadMainImg = (e) => {
    setMainImg(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get selected file
    const file = mainImg;
    // console.log(file);

    if (!file) {
      alert("Please select an image file.");
      return;
    }

    // create a new FileReader object
    const reader = new FileReader();

    // read the file as a data URL
    reader.readAsDataURL(file);

    // when the file is loaded, send it to the server
    reader.onload = () => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/api/uploadNotificationImg");
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(
        JSON.stringify({
          filename: file.name,
          data: reader.result,
        })
      );
      console.log(reader);
    };

    const receiverid = e.target.receiverid.value;
    const date = e.target.date.value;
    const subject = e.target.subject.value;
    const message = e.target.message.value;
    const sendername = e.target.sendername.value;
    // console.log(date, subject, message, sendername);

    const data = {
      receiverid,
      date,
      subject,
      image: `/assets/images/notifications/${file.name}`,
      message,
      sendername,
    };

    console.log(data);

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data);

    // API endpoint where we send form data.
    const endpoint = "/api/sendNotification";

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
    console.log(result);

    if (result.sentNotification) {
      alert(`✉ Notification sent to ${result.sentNotification.to} successfully.`)
    }
  };

  return (
    <>
      <h3 className="mb30">
        <i className="fa fa-bell"></i> Notify {route.query.index}
      </h3>
      <form onSubmit={handleSubmit}>
        <div
          style={{ display: "none" }}
          className="form-group form-check custom-checkbox mb-3"
        >
          <input
            className="form-check-input"
            type="radio"
            id="receiverId"
            value={route.query.index}
            required
            name="receiverid"
            checked
            disabled
          />
          <label
            className="form-check-label form-check-label float-start"
            htmlFor="receiverId"
          >
            {route.query.index}
          </label>
        </div>
        {/* End .form-group */}

        <div className="row">
          <div className="col-lg-4">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="date">Date</label>
              <input
                type="text"
                className="form-control"
                id="date"
                name="date"
                value={new Date().toUTCString()}
                required
                disabled
              />
            </div>
          </div>
          {/* End .col */}

          <div className="col-lg-8">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                className="form-control"
                id="subject"
                name="subject"
                required
              />
            </div>
          </div>
        </div>

        <div className="col-lg-12">
          <div className="wrap-custom-file2">
            <input
              type="file"
              id="main_Img"
              name="main_Image"
              accept=".png, .jpg, .jpeg"
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
          <p>*minimum 752 x 450</p>
        </div>

        <br />

        <div className="col-lg-12">
          <div className="my_profile_setting_textarea">
            <label htmlFor="NotificationText">Message</label>
            <textarea
              className="form-control"
              id="NotificationText"
              rows="2"
              name="message"
              required
            ></textarea>
          </div>
        </div>
        {/* End .col */}

        <div className="row">
          <div className="col-lg-4">
            <div className="my_profile_setting_input form-group">
              <label htmlFor="senderName">By</label>
              <input
                type="text"
                className="form-control"
                id="senderName"
                name="sendername"
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
                Send <i className="fa fa-send"></i>
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Form;
