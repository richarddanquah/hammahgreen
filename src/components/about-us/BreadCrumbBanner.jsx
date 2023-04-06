import BreadCrumb from "../common/BreadCrumb";

const BreadCrumbBanner = () => {
  return (
    <section className="inner_page_breadcrumb"
    style={{"backgroundImage" : "url(../../assets/images/background/Eloquence-Estate.jpeg)"}}
    >
      <div className="container">
        <div className="row">
          <div className="col-xl-6">
            <div className="breadcrumb_content">
              <BreadCrumb title="about us" />
              <h4 className="breadcrumb_title">About Us</h4>
            </div>
          </div>
          {/* End .col */}
        </div>
      </div>
    </section>
  );
};

export default BreadCrumbBanner;
