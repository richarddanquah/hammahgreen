import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Form = () => {
  const { data: session, status } = useSession();
  const route = useRouter();

  if (status === "authenticated") {
    route.push("/my-dashboard");
  }

  return (
    <>
      <div className="heading text-center">
        <h3>Administrator</h3>
      </div>
      {/* End .heading */}

      {status === "unauthenticated" && (
        <div className="col-lg-12">
          <button
            type="button"
            className="btn btn1 bgc-git color-white mb10 w-100"
            onClick={() => {
              signIn();
            }}
          >
            <i className="fa fa-sign-in float-end mt5"></i>
            Sign in with your Credentials
          </button>
        </div>
      )}

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
    </>
  );
};

export default Form;
