import React from "react";

const Login: React.FC = () => {
  return (
    <div
      className="card d-flex flex-column mx-5 my-5 text-white shadow-lg bg-transparent border-1 border-light border-opacity-25"
      style={{ width: "30rem" }}
    >
      <div className="card-body d-flex flex-column justify-content-center align-items-center px-3 py-2 w-100 h-100">
        <h5 className="card-title text-danger fw-bold fs-2 mb-5">Login form</h5>
        <form>
          <div className="mb-3">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label text-light d-flex justify-content-start"
            >
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text text-light small">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label d-flex justify-content-start text-light"
            >
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label
              className="form-check-label d-flex justify-content-start"
              htmlFor="exampleCheck1"
            >
              Check me out
            </label>
          </div>
          <button
            type="submit"
            className="d-flex btn btn-primary justify-content-center align-items-center w-100"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
