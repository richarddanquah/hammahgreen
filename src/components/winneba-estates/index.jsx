import CallToAction from "../common/CallToAction";
import CopyrightFooter from "../common/footer/CopyrightFooter";
import Footer from "../common/footer/Footer";
import Header from "../common/header/DefaultHeader";
import MobileMenu from "../common/header/MobileMenu";
import PopupSignInUp from "../common/PopupSignInUp";
import BreadCrumbBanner from "./BreadCrumbBanner";

const index = () => {
  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      {/* <!-- Modal --> */}
      <PopupSignInUp />

      {/* <!-- Inner Page Breadcrumb --> */}
      <BreadCrumbBanner />

      {/* <!-- About Text Content --> */}
      <section className="about-section">
        <div className="container">
          {/* <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center">
                <h2 className="mt0">Hammah Green</h2>
              </div>
            </div>
          </div> */}
          {/* End .row */}

          <div className="row">
            <div className="col-lg-8 col-xl-7">
              <div className="about_content">
                <h4 className="large">Why Winneba Estates ?</h4>

                <p>
                  Winneba is a beautiful, well developed, quiet town that is
                  geographically very well placed between Accra and Cape Coast,
                  and we have sourced one of the most beautiful locations to
                  start and build our neighborhood! Many high-value housing
                  markets possess homes in coveted locations that feature
                  privacy, security, and gorgeous views. From New York to
                  Toronto, to London, by the time these hot spots become
                  globally known markets their prices make them unattainable for
                  all but the ultra-wealthy. With our project, buyers not only
                  get to own beautiful modern, designer homes in a picturesque
                  setting, but they wisely buy an asset that is sure to
                  appreciate quickly! Waterviews Estates is the coveted,
                  exclusive area within Winneba Estates that features one
                  entrance only via gated access through the Command and Staff
                  Training School of Ghana Police compound (one of the most
                  picturesque drives with the view of the ocean). The location
                  of these homes offers breathtaking views after which this area
                  is named. One side enjoys the calm part of the Atlantic Ocean
                  that meets the Central Ghana coastline that does not suffer
                  natural disasters and has not for centuries of recorded
                  history. The other enchanting view is of a saltwater lake
                  flanked on one side by a gorgeous mountain. Throughout the day
                  you can watch large fishing ships in the distance on the ocean
                  or traditional fishermen line fishing by hand in the lake.
                  Calm and serenity are met with modern design and technology.
                  Every home is solar powered and features from the tap
                  filtered, drinkable water within it. With landscaping that
                  includes space for gardens to grow desired fruits and
                  vegetables on your lot, sidewalks and park benches, public
                  restrooms for the public beach, an onsite postal office,
                  scheduled garbage and recycling pickup, digital and
                  traditional addresses with prominent signage, and so much
                  more! Within Waterviews Estates we want your beachfront home
                  to be your peace, allowing you to escape stress in a home
                  designed to do all the work for you.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-xl-5">
              <div className="about_thumb">
                {/* <img
                  className="img-fluid w100"
                  src="assets/images/about/modern-home-img.png"
                  alt="1.jpg"
                /> */}
              </div>
            </div>
          </div>
          {/* End .row */}
        </div>
      </section>

      {/* <!-- Start Call to Action --> */}
      {/* <section className="start-partners bgc-thm pt50 pb50">
        <div className="container">
          <CallToAction />
        </div>
      </section> */}

      {/* <!-- Our Footer --> */}
      <section className="footer_one">
        <div className="container">
          <div className="row">
            <Footer />
          </div>
        </div>
      </section>

      {/* <!-- Our Footer Bottom Area --> */}
      <section className="footer_middle_area pt40 pb40">
        <div className="container">
          <CopyrightFooter />
        </div>
      </section>
    </>
  );
};

export default index;
