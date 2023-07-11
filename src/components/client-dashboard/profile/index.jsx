import Header from "../dashboard-header/Header";
import MobileMenu from "../../common/header/MobileMenu";
import { useSession } from "next-auth/react";
import ClientFullNameForm from "./ClientFullNameForm";
import ClientUserNameForm from "./ClientUserNameForm";
import ClientPasswordChange from "./ClientPasswordChange";

const Index = ({ theUser }) => {
  const { data: session, status } = useSession();
  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu theUser={theUser} />

      <section className="container-md mt100">
        <div className="row">
          <div className="col-sm-12 col-lg-4">
            <div>
              {/* <img
                className="rounded-circle"
                src="/assets/images/testimonial/1.png"
                alt="e1.png"
                width={60}
              /> */}
              {/* <h2 className="mb-5">Profile Information</h2> */}
              <h4 className="m-0">{session.user.name}</h4>
              <p>{session.user.email}</p>
            </div>
          </div>
          <div className="col-sm-12 col-lg-8">
            <ClientFullNameForm theUser={theUser} />
            <ClientUserNameForm theUser={theUser} />
            <ClientPasswordChange theUser={theUser} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
