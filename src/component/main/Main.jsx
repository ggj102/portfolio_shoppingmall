import React from "react";
import "../../css/MainPage.css";

import BestReviewProduct from "./BestReviewProduct";
import AllProduct from "./AllProduct";

export default function Main() {
  return (
    <div className="main_content">
      <BestReviewProduct />
      <AllProduct />
    </div>
  );
}
