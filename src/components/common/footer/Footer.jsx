import Link from "next/link";
import Social from "./Social";
import SubscribeForm from "./SubscribeForm";
import Image from "next/image";

const Footer = () => {
  return (
    <>
      <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3 pr0 pl0">
        <div className="footer_about_widget">
          <Image 
          src="/assets/images/hg-logo2.png" 
          alt="Site Logo" 
            width={500}
            height={90}
          />
          <br />
          <br />
          <p>
            We are your best bet to owning an affordable and serene real estate.
            Are you ready to get your dream home? We are poised to get you just
            that.
          </p>
        </div>
      </div>
      {/* End .col */}

      <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3">
        <div className="footer_qlink_widget">
          <h4>Quick Links</h4>
          <ul className="list-unstyled">
            <li>
              <Link href="/about-us">
                <a>About Us</a>
              </Link>
            </li>
            {/* <li>
              <Link href="/">
                <a>Terms & Conditions</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>User’s Guide</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>Support Center</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>Press Info</a>
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
      {/* End .col */}

      <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3">
        <div className="footer_contact_widget">
          <h4>Contact Us</h4>
          <ul className="list-unstyled">
            <li>
              <a href="mailto:info@findhouse.com">info@hammahgreen.com</a>
            </li>
            <li>
              <a href="#">HammahGreen Street, WI 53711</a>
            </li>
            <li>
              <a href="tel:+4733378901">+1 246-345-0699</a>
            </li>
            <li>
              <a href="tel:+4733378901">+1 246-345-0695</a>
            </li>
          </ul>
        </div>
      </div>
      {/* End .col */}

      <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3">
        <div className="footer_social_widget">
          <h4>Follow us</h4>
          <ul className="mb30">
            <Social />
          </ul>
          <h4>Subscribe to our newsletter</h4>
          <SubscribeForm />
        </div>
      </div>
    </>
  );
};

export default Footer;
