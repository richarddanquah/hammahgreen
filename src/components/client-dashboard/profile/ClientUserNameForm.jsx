export default function ClientUserNameForm({ theUser }) {
  return (
    <>
      <form className="border border-secondary-subtle p-3 mb-3 rounded-4 shadow-sm">
        <h4 className="mb-3">Your Username</h4>
        <div className="col-sm-12 pb-4">
          <input
            type="email"
            placeholder="Email"
            className="form-control rounded-5"
            name="email"
            defaultValue={theUser.email}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$"
            autoComplete="off"
            required
            disabled
          />
        </div>

        <button className="btn btn-secondary rounded-5" type="submit" disabled>
          <span style={{ fontSize: "12px" }} className="fa fa-save me-2"></span>
          Save
        </button>
      </form>
    </>
  );
}
