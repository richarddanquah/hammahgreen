import Header from "../dashboard-header/Header";
import MobileMenu from "../../common/header/MobileMenu";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Index = ({theUser}) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    // signIn();
    router.push("/login");
  }

  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu theUser={theUser} />

      <section className="container-md mt100">
        <div className="row">
          <div className="col-lg-3">
            <div>
              <img
                className="rounded-circle"
                src="/assets/images/testimonial/1.png"
                alt="e1.png"
                width={60}
              />
              <br />
              <br />
              <h2>Profile Information</h2>
              <br />
              <h4>{session.user.name}</h4>
              <p>{session.user.email}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
