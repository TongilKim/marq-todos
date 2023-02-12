/**
 * WRITTEN DATE: 2023/02/12
 * AUTHOR: TONGIL KIM
 * PURPOSE:  Loading circle
 */
import "./Loader.scss";
import React from "react";

export default function Loader() {
  return (
    <div className="wrapper">
      <div className="center">
        <div className="ring"></div>
        <span className="loading_text">Loading...</span>
      </div>
    </div>
  );
}
