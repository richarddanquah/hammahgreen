const Attachments = ({ property }) => {
  return (
    <>
      {/* <div className="icon_box_area style2">
        <div className="score">
          <span className="flaticon-document text-thm fz30"></span>
        </div>
        <div className="details">
          <h5>
            <span className="flaticon-download text-thm pr10"></span> Demo Word
            Document
          </h5>
        </div>
      </div> */}
      {/* End .icon_box_area */}

      <div className="icon_box_area style2">
        <div className="score">
          <span className="flaticon-pdf text-thm fz30"></span>
        </div>
        <div className="details">
          <h5>
            <a href={property.attachmenturl} download>
              <button className="btn btn-dark rounded-5 px-4">
                <span className="flaticon-download pr10"></span>
                Download Property Document
              </button>
            </a>
          </h5>
        </div>
      </div>
    </>
  );
};

export default Attachments;
