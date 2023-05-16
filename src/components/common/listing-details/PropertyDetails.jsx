const PropertyDetails = ({ property }) => {
  return (
    <>
      <div className="col-md-6 col-lg-6 col-xl-4">
        <ul className="list-inline-item">
          <li>
            <p>
              Property Name : <span>{property?.title}</span>
            </p>
          </li>
          <li>
            <p>
              Price : <span>{property?.price}</span>
            </p>
          </li>
          <li>
            <p>
              Location : <span>{property?.location}</span>
            </p>
          </li>
          <li>
            <p>
              Property Size : <span>{property?.sqft} Sq Ft</span>
            </p>
          </li>
        </ul>
      </div>
      {/* End .col */}

      <div className="col-md-6 col-lg-6 col-xl-4">
        <ul className="list-inline-item">
          <li>
            <p>
              Bedrooms : <span>{property?.bedrooms}</span>
            </p>
          </li>
          <li>
            <p>
              Bathrooms : <span>{property?.baths}</span>
            </p>
          </li>
          <li>
            <p>
              Garage : <span>{property?.garages}</span>
            </p>
          </li>
          {/* <li>
            <p>
              Garage Size : <span>200 SqFt</span>
            </p>
          </li> */}
        </ul>
      </div>
      {/* End .col */}

      <div className="col-md-6 col-lg-6 col-xl-4">
        <ul className="list-inline-item">
          <li>
            <p>
              Property Type : <span>{property?.type}</span>
            </p>
          </li>
          <li>
            <p>
              Property Status : <span>{property?.saleTag}</span>
            </p>
          </li>
          <li>
            <p>
              Listed by : <span>{property?.posterName}</span>
            </p>
          </li>
        </ul>
      </div>
    </>
  );
};

export default PropertyDetails;
