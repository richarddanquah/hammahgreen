import Social from "../common/footer/Social";

const AddressSidebar = () => {
  return (
    <div className="contact_localtion">
      <h4>Contact Us</h4>
      <p>
        We are your best bet to owning an affordable and serene real estate. Are you ready to get your dream home? We are poised to get you just that.
      </p>
      <div className="content_list">
        <h5>Address</h5>
        <p>
          HammahGreen Street, <br />
          WI 53711
        </p>
      </div>
      <div className="content_list">
        <h5>Phone</h5>
        <p>(315) 905-2321</p>
      </div>
      <div className="content_list">
        <h5>Mail</h5>
        <p>info@hammahgreen.com</p>
      </div>
      <div className="content_list">
        <h5>Skype</h5>
        <p>hammahgreen.com</p>
      </div>
      <h5>Follow Us</h5>
      <ul className="contact_form_social_area">
        <Social />
      </ul>
    </div>
  );
};

export default AddressSidebar;
