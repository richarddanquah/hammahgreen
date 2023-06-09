import Header from "../../common/header/dashboard/Header";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu";
import MobileMenu from "../../common/header/MobileMenu";
import Activities from "./Activities";
import AllStatistics from "./AllStatistics";
import StatisticsChart from "./StatisticsChart";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Index = ({user, propertyListings, waterviewsListings, sorokroListings }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header user={user} />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      <div className="dashboard_sidebar_menu">
        <div
          className="offcanvas offcanvas-dashboard offcanvas-start"
          tabIndex="-1"
          id="DashboardOffcanvasMenu"
          data-bs-scroll="true"
        >
          <SidebarMenu />
        </div>
      </div>
      {/* End sidebar_menu */}

      {/* <!-- Our Dashbord --> */}
      <section className="our-dashbord dashbord bgc-f7 pb50">
        <div className="container-fluid ovh">
          <div className="row">
            <div className="col-lg-12 maxw100flex-992">
              <div className="row">
                {/* Start Dashboard Navigation */}
                <div className="col-lg-12">
                  <div className="dashboard_navigationbar dn db-1024">
                    <div className="dropdown">
                      <button
                        className="dropbtn"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#DashboardOffcanvasMenu"
                        aria-controls="DashboardOffcanvasMenu"
                      >
                        <i className="fa fa-bars pr10"></i> Dashboard Navigation
                      </button>
                    </div>
                  </div>
                </div>
                {/* End Dashboard Navigation */}

                {session && (
                  <div className="col-lg-12 mb10">
                    <div className="breadcrumb_content style2">
                      <h2 className="breadcrumb_title">
                        Welcome, {session.user.name}
                      </h2>
                      <p>We are glad to see you again!</p>
                    </div>
                  </div>
                )}
              </div>
              {/* End .row */}

              <div className="row">
                <AllStatistics
                  propertyListings={propertyListings}
                  waterviewsListings={waterviewsListings}
                  sorokroListings={sorokroListings}
                />
              </div>
              {/* End .row Dashboard top statistics */}

              <div className="row">
                <div className="col-xl-7">
                  <div className="application_statics border border-secondary-emphasis rounded-4">
                    <h4 className="mb-4">View Statistics</h4>
                    <StatisticsChart />
                  </div>
                </div>
                {/* End statistics chart */}

                <div className="col-xl-5">
                  <div className="recent_job_activity border border-secondary-emphasis rounded-4">
                    <h4 className="title mb-4">Dashboard Tips</h4>
                    <Activities />
                  </div>
                </div>
              </div>
              {/* End .row  */}

              <div className="row mt50">
                <div className="col-lg-12">
                  <div className="copyright-widget text-center">
                    <p>
                      © {new Date().getFullYear()} HammahGreen. All rights
                      reserved.
                    </p>
                  </div>
                </div>
              </div>
              {/* End .row */}
            </div>
            {/* End .col */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
