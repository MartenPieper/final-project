import React from "react";
import { Link } from "react-router-dom";

// All JSX must be contained in one "HTML" tag
export default function Logo() {
  return (
      <div className="logo-container">

        <img className="logo" src="./logo.png" />

      </div>
  );
}
