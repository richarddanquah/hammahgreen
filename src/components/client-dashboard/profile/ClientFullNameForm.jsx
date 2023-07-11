export default function ClientFullNameForm({ theUser }) {
  return (
    <>
      <form className="border border-secondary-subtle p-3 mb-3 rounded-4 shadow-sm">
        <h4 className="mb-3">Your Name</h4>
        {/* Name Section */}
        <div className="row g-1 pb-4">
          <div className="col-sm-6">
            <input
              type="text"
              className="form-control rounded-5"
              placeholder="First name"
              name="fname"
              defaultValue={theUser.fname}
              autoComplete="off"
              required
            />
          </div>
          <div className="col-sm-6">
            <input
              type="text"
              className="form-control rounded-5"
              placeholder="Last name"
              name="lname"
              defaultValue={theUser.lname}
              autoComplete="off"
              required
            />
          </div>
        </div>

        <button className="btn btn-secondary rounded-5" type="submit" disabled>
          <span style={{ fontSize: "12px" }} className="fa fa-save me-2"></span>
          Save
        </button>

        {/* Name Section */}
      </form>
    </>
  );
}
