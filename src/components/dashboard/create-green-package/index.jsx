import Header from "../../common/header/dashboard/Header";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu";
import MobileMenu from "../../common/header/MobileMenu";
import CreateGreenPackage from "./CreateGreenPackage";
import PackagesTable from "./GreenPackagesTable";

const Index = ({greenpackages}) => {
  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

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

                <div className="col-lg-12 mb10">
                  <div className="breadcrumb_content style2">
                    <h2 className="breadcrumb_title">Create A Green Package</h2>
                    {/* <p>Basically add a new property</p> */}
                  </div>
                </div>
                {/* End .col */}

                <div className="col-lg-12">
                  <div className="my_dashboard_review rounded-5 shadow-sm">
                    <div className="row">
                    <CreateGreenPackage />
                    </div>
                  </div>
                </div>

                {greenpackages && (<>
                  <div className="col-lg-12 mt20">
                  <div className="my_dashboard_review rounded-5 shadow-sm">
                    <div className="row">
                    <PackagesTable greenpackages={greenpackages} />
                    </div>
                  </div>
                </div>
                </>)}

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
        </div>
      </section>
    </>
  );
};

export default Index;
