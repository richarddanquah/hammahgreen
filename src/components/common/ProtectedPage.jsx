import Link from "next/link";
export default function ProtectedPage() {
  return (
    <>
      <div className="container my-5">
        <i className="fa fa-lock text-dark fs-2"></i>
        <br />
        <h3>Access Denied!</h3>
        <Link href="/" legacyBehavior>
          <a className="btn btn-outline btn-sm rounded-5 ">
            Go to Homepage &nbsp; <i className="fa fa-sign-in"></i>
          </a>
        </Link>
      </div>
    </>
  );
}
