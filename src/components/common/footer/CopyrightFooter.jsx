import Link from "next/link";
import { useRouter } from "next/router";

const CopyrightFooter = () => {
  const route = useRouter();
  
  const menuItems = [
    { id: 1, name: "Home", routeLink: "/" },
    { id: 2, name: "About Us", routeLink: "/about-us" },
    { id: 3, name: "Contact", routeLink: "/contact" },
    // { id: 4, name: "Waterviews", routeLink: "/listing-grid-v5" },
    // { id: 5, name: "Winneba Estates", routeLink: "/winneba-estates" },
    // { id: 6, name: "Heights", routeLink: "/comingsoon" },
    // { id: 7, name: "Blog", routeLink: "/blog-list-3" },
    // { id: 8 name: "Property", routeLink: "/listing-grid-v4" },
  ];

  return (
    <div className="row">
      <div className="col-lg-6 col-xl-6">
        <div className="footer_menu_widget">
          <ul>
            {menuItems.map((item) => (
              <li className="list-inline-item" key={item.id}>
                <Link href={item.routeLink}>
                  <a
                    className={route.pathname === item.routeLink ? "ui-active" : undefined}
                  >{item.name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="copyright-widget text-end">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            {/* <a
              href="/"
              target="_blank"
              rel="noreferrer"
            > */}
              HammahGreen
            {/* </a> */}
            . All rights reserved.
          </p>
        </div>
      </div>
      {/* End .col */}
    </div>
  );
};

export default CopyrightFooter;
