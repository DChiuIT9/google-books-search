import React from "react";

function Jumbotron({ children }) {
  return (
    <div
      style={{ padding: 20, clear: "both", textAlign: "center" }}
      className="jumbotron"
    >
      {children}
    </div>
  );
}

export default Jumbotron;
