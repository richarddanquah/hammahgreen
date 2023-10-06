import Header from "../dashboard-header/Header";
import MobileMenu from "../../common/header/MobileMenu";
import Image from "next/image";
import { useSession } from "next-auth/react";

const Index = ({ theUser, userNotifications }) => {
  const { data: session, status } = useSession();
  const subjecttext = "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups."
  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header theUser={theUser} />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu theUser={theUser} />

      <section className="container-md mt100">
        <div className="row">
          <div className="col-sm-12 col-lg-4">
            <div>
              <h1>
                <span className="fa fa-user-circle"></span>
              </h1>
              <h4 className="m-0">{session.user.name}</h4>
              <p>{session.user.email}</p>
            </div>
          </div>
          <div className="col-sm-12 col-lg-8">
            <div className="row">
              <div className="col-lg-6">
                <h4>Latest Notifications</h4>
                {userNotifications.length === 0 && (<>
                  No new notifications at the moment.
                </>)}
                {userNotifications && userNotifications.reverse().map((item)=> (<>
                  <h4 key={item._id}>
                  <span 
                  style={{backgroundColor:"#175543"}}
                   class="badge shadow-sm d-flex align-items-center p-0 rounded-3">
                    <Image
                      className="rounded-3"
                      width={40}
                      height={40}
                      src={item.image}
                      alt="Alternate"
                    />
                    &nbsp; &nbsp; 
                  {item.subject.slice(0,40)}
                  </span>
                </h4>
                </>))}
              </div>
            </div>
            <div className="copyright-widget mt50">
              <p>
                © {new Date().getFullYear()} HammahGreen. All rights reserved.
              </p>
            </div>

            {/* End .row */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
