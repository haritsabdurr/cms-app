import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  let navigate = useNavigate();
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Page not Found ...</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => {
                navigate("/");
              }}
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
