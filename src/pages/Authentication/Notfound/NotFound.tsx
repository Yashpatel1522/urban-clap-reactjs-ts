import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <div
        className="row"
        style={{
          height: "100dvh",
        }}
      >
        <div className="col-12">
          <div
            className="text-center"
            style={{ fontSize: "40dvh", color: "darkslategray" }}
          >
            404
          </div>
          <div className="mb-5 text-center fs-3">
            Oops! The page you were looking for dosen't exist
          </div>
          <div className="div text-center">
            <Link
              to="/signin"
              className="button text-center link-offset-2 link-underline link-underline-opacity-0"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
