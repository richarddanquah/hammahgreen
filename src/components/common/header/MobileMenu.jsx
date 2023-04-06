import Link from "next/link";
import MobileMenuContent from "./MobileMenuContent";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const MobileMenu = () => {
  const { data: session, status } = useSession();
  const route = useRouter();

  return (
    // <!-- Main Header Nav For Mobile -->
    <div className="stylehome1 h0 mega-menu-wrapper">
      <div className="mobile-menu">
        <div className="header stylehome1">
          <div className="main_logo_home2 text-center">
            <Link href="/">
              <img
                className="nav_logo_img img-fluid mt20"
                src="/assets/images/hg-logo2.png"
                alt="header-logo2.png"
                width={260}
              />
            </Link>
            {/* <span style={{color: "#C5A45E"}} className="mt20">HammahGreen</span> */}
          </div>
          {/* main_logo_home2 */}

          <ul className="menu_bar_home2">
            {session && (
              <li className="list-inline-item list_s">
                <a
                  onClick={async () => {
                    const data = await signOut({
                      redirect: false,
                      callbackUrl: "/login",
                    });
                    route.push(data.url);
                  }}
                >
                  <span className="flaticon-logout"></span>
                </a>
              </li>
            )}
            {!session && (
              <li className="list-inline-item list_s">
                <Link href="/login">
                  <a>
                    <span
                      style={{ color: "#175543" }}
                      className="flaticon-user"
                    ></span>
                  </a>
                </Link>
              </li>
            )}
            <li
              className="list-inline-item"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasMenu"
              aria-controls="offcanvasMenu"
            >
              <a>
                <span></span>
              </a>
            </li>
          </ul>
          {/* menu_bar_home2 */}
        </div>
      </div>
      {/* <!-- /.mobile-menu --> */}

      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasMenu"
        aria-labelledby="offcanvasMenuLabel"
        data-bs-scroll="true"
      >
        <MobileMenuContent />
      </div>
    </div>
  );
};

export default MobileMenu;
