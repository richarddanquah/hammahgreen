import CopyrightFooter from "../common/footer/CopyrightFooter";
import Footer from "../common/footer/Footer";
import Header from "../common/header/DefaultHeader";
import MobileMenu from "../common/header/MobileMenu";
import PopupSignInUp from "../common/PopupSignInUp";
import BreadCrumbBanner from "./BreadCrumbBanner";
import Form from "./Form";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

const Index = ({theUser}) => {
  const { data: session, status } = useSession();
  const route = useRouter();

  if (status === "authenticated") {
    route.push("/");
  }

  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header theUser={theUser} />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      {/* <!-- Modal --> */}
      <PopupSignInUp />

      {/* <!-- Inner Page Breadcrumb --> */}
      <BreadCrumbBanner />

      {/* <!-- Our LogIn Register --> */}
      <section className="our-log bgc-fa">
        <div className="container">
          <div className="row  ">
            <div className="col-sm-12 col-lg-6 offset-lg-3 text-center">
              {status === "loading" && (
                <>
                  <div className="pt100 pb100">
                    <h4>Checking authentication...</h4>
                  </div>
                </>
              )}
              {/* {status === "authenticated" &&
                setTimeout(() => {
                  route.push("/");
                }, 4000) } */}
              {status === "authenticated" && (
                <>
                  <div className="pt100 pb100">
                    {/* <img
                      className="rounded-circle"
                      src={session.user.image}
                      alt="Profile Image"
                      width={60}
                      height={60}
                    />
                    <br />
                    <br /> */}
                    <h4>You are signed in as {session.user.email}</h4>
                    {/* <Link href="/my-dashboard">
                      <button type="button" className="btn btn-green btn-thm">
                        Go to dashboard
                      </button>
                    </Link>
                    &nbsp; &nbsp; */}
                    <button
                      onClick={async () => {
                        signOut({
                          redirect: false,
                        });
                      }}
                      type="button"
                      className="btn btn-white btn-thm"
                    >
                      <span className="flaticon-logout"></span>
                      &nbsp; Sign out
                    </button>
                  </div>
                </>
              )}
              {status === "unauthenticated" && (
                <div className="login_form  inner_page pt500 pb500">
                  <Form />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

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

export default Index;
