const PropertyItem = ({property}) => {
  return (
    <ul className="mb0">
      <li className="list-inline-item">
        <a href="#">{property?.type}</a>
      </li>
      <li className="list-inline-item">
        <a href="#">Beds: {property?.bedrooms}</a>
      </li>
      <li className="list-inline-item">
        <a href="#">Baths: {property?.baths}</a>
      </li>
      <li className="list-inline-item">
        <a href="#">Sq Ft: {property?.sqft}</a>
      </li>
    </ul>
  );
};

export default PropertyItem;
