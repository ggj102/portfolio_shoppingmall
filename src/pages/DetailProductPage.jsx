import React from "react";
import DetailProduct from "../component/detailProduct";

export default function DetailProductPage({ match, history }) {
  return <DetailProduct match={match} history={history} />;
}
