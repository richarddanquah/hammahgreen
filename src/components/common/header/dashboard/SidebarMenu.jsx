import Link from "next/link";
import { useRouter } from "next/router";
import {
  isParentPageActive,
  isSinglePageActive,
} from "../../../../utils/daynamicNavigation";
import { signIn, signOut, useSession } from "next-auth/react";

const SidebarMenu = () => {
  const route = useRouter();
  const { data: session, status } = useSession();

  const myProperties = [
    { id: 1, name: "All Property Listings", route: "/my-properties" },
    // { id: 2, name: "Advanced Elements", route: "/my-properties" },
    // { id: 3, name: "Editors", route: "/my-properties" },
  ];
  const reviews = [
    { id: 1, name: "My Reviews", route: "/my-review" },
    { id: 2, name: "Visitor Reviews", route: "/my-review" },
  ];
  const manageAccount = [
    // {
    //   id: 1,
    //   name: "My Package",
    //   route: "/my-package",
    //   icon: "flaticon-box",
    // },
    {
      id: 2,
      name: "My Profile",
      route: "/my-profile",
      icon: "flaticon-user",
    },
    // { id: 3, name: "Logout", route: "/login", icon: "flaticon-logout" },
  ];

  return (
    <>
      <ul className="sidebar-menu">
        <li className="sidebar_header header">
          <Link href="/">
            <a>
              <img
                className="logo1 img-fluid"
                src="/assets/images/hg-logo2.png"
                alt="hg-logo.png"
                width={250}
              />
              {/* <span style={{ color: "#C5A45E" }}>HammahGreen</span> */}
            </a>
          </Link>
        </li>
        {/* End header */}

        <li className="title">
          <span>Main</span>
          <ul>
            <li
              className={`treeview ${
                isSinglePageActive("/my-dashboard", route.pathname)
                  ? "active"
                  : ""
              }`}
            >
              <Link href="/my-dashboard">
                <a>
                  <i className="flaticon-layers"></i>
                  <span> Dashboard</span>
                </a>
              </Link>
            </li>
            <li
              className={`treeview ${
                isSinglePageActive("/create-listing", route.pathname)
                  ? "active"
                  : ""
              }`}
            >
              <Link href="/create-listing">
                <a>
                  <i className="flaticon-plus"></i>
                  <span> Create Listing</span>
                </a>
              </Link>
            </li>
            <li
              className={`treeview ${
                isSinglePageActive("/create-user", route.pathname)
                  ? "active"
                  : ""
              }`}
            >
              <Link href="/create-user">
                <a>
                  <i className="flaticon-user-1"></i>
                  <span> Create User</span>
                </a>
              </Link>
            </li>
            <li
              className={`treeview ${
                isSinglePageActive("/create-green-package", route.pathname)
                  ? "active"
                  : ""
              }`}
            >
              <Link href="/create-green-package">
                <a>
                  <i className="flaticon-box"></i>
                  <span> Create a Green Package</span>
                </a>
              </Link>
            </li>
            {/* <li
              className={`treeview ${
                isSinglePageActive("/my-message", route.pathname)
                  ? "active"
                  : ""
              }`}
            >
              <Link href="/my-message">
                <a>
                  <i className="flaticon-envelope"></i>
                  <span> Message</span>
                </a>
              </Link>
            </li> */}
          </ul>
        </li>
        {/* End Main */}

        <li className="title">
          <span>Manage Listings</span>
          <ul>
            <li
              className={`treeview ${
                isParentPageActive(myProperties, route.pathname) ? "active" : ""
              }`}
            >
              <a data-bs-toggle="collapse" href="#my-property">
                <i className="flaticon-home"></i> <span>Properties</span>
                <i className="fa fa-angle-down pull-right"></i>
              </a>
              <ul className="treeview-menu collapse" id="my-property">
                {myProperties.map((item) => (
                  <li key={item.id}>
                    <Link href={item.route}>
                      <a>
                        <i className="fa fa-circle"></i> {item.name}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            {/* end properties */}

            {/* <li
              className={`treeview ${
                isParentPageActive(reviews, route.pathname) ? "active" : ""
              }`}
            >
              <a data-bs-toggle="collapse" href="#review">
                <i className="flaticon-chat"></i>
                <span>Reviews</span>
                <i className="fa fa-angle-down pull-right"></i>
              </a>
              <ul className="treeview-menu collapse" id="review">
                {reviews.map((item) => (
                  <li key={item.id}>
                    <Link href={item.route}>
                      <a>
                        <i className="fa fa-circle"></i> {item.name}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </li> */}
            {/* End Review */}

            {/* <li
              className={`treeview ${
                isSinglePageActive("/my-favourites", route.pathname)
                  ? "active"
                  : ""
              }`}
            >
              <Link href="/my-favourites">
                <a>
                  <i className="flaticon-magnifying-glass"></i>
                  <span> My Favorites</span>
                </a>
              </Link>
            </li>
            <li
              className={`treeview ${
                isSinglePageActive("/my-saved-search", route.pathname)
                  ? "active"
                  : ""
              }`}
            >
              <Link href="/my-saved-search">
                <a>
                  <i className="flaticon-magnifying-glass"></i>
                  <span> Saved Search</span>
                </a>
              </Link>
            </li> */}
          </ul>
        </li>
        {/* End manage listing */}

        <li className="title">
          <span>Manage Account</span>
          <ul>
            {manageAccount.map((item) => (
              <li
                className={
                  isSinglePageActive(item.route, route.pathname) ? "active" : ""
                }
                key={item.id}
              >
                <Link href={item.route}>
                  <a>
                    <i className={item.icon}></i> <span>{item.name}</span>
                  </a>
                </Link>
              </li>
            ))}
            <li>
              <a
                href="#"
                onClick={async () => {
                  const data = await signOut({
                    redirect: false,
                    callbackUrl: "/login",
                  });
                  route.push(data.url);
                }}
              >
                <i className="flaticon-logout"></i> <span>Sign out</span>
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </>
  );
};

export default SidebarMenu;
