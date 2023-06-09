import Link from "next/link";
import { useEffect, useState } from "react";
import HeaderMenuContent from "../common/header/HeaderMenuContent";

const Header = ({ theUser }) => {
  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 95) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
  }, []);

  return (
    <header
      className={`header-nav menu_style_home_one style2  home10 navbar-scrolltofixed stricky main-menu  ${
        navbar ? "stricky-fixed " : ""
      }`}
    >
      <div className="container p0">
        {/* <!-- Ace Responsive Menu --> */}

        <Link href="/">
          <a className="navbar_brand float-start dn-smd">
            <img
              className="logo1 img-fluid"
              src="assets/images/hg-logo2.png"
              alt="hg-logo.png"
              width={300}
            />
            <img
              className="logo2 img-fluid"
              src="assets/images/hg-logo2.png"
              alt="hg-logo.png"
              width={280}
            />
            {/* <span style={{color: "#C5A45E"}}>HammahGreen</span> */}
          </a>
        </Link>
        {/* site logo brand */}

        <nav>
          <HeaderMenuContent theUser={theUser} />
        </nav>
        {/* End .navbar */}
      </div>
    </header>
    // {/* <!-- /.theme-main-menu --> */}
  );
};

export default Header;
