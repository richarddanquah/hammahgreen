import Header from "../dashboard-header/Header";
import MobileMenu from "../../common/header/MobileMenu";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Index = ({ theUser, userNotifications }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  let noNotifications;

  if (userNotifications.length === 0) {
    noNotifications = (
      <div class="card">
        <div class="card-body">No notifications at the moment</div>
      </div>
    );
  }

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

      <section className="container-md mt80">
        <h3 className="text-center mb50">Notifications</h3>
        <div className="row justify-content-center">
          <div className="col-md-6">
            {userNotifications.length === 0 && (
              <div class="card border border-light-subtle rounded-4 shadow-sm mb-4">
                <div class="card-body">
                  You have no notifications at the moment
                </div>
              </div>
            )}

            {userNotifications.map((item) => (
              <div
                key={item._id}
                class="card shadow-sm bg-light text-bg-light border-light rounded-4 mb-4"
              >
                <img
                  src={item.image}
                  class="img-fluid rounded-4"
                  alt="Contextual Image"
                />
                <div class="card-body">
                  <h4 class="card-title">{item.subject}</h4>
                  <p class="card-text">{item.message}</p>
                  {/* <a href="#" class="card-link">
                    View Details
                  </a> */}
                </div>
                <div style={{ fontSize: "13px" }} class="card-footer rounded-4">
                  <span>Sent: </span>
                  {item.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
