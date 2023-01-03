import React, { useState, useEffect } from "react";
import "../../css/Products.css";

import PurchaseSettings from "./PurchaseSettings";
import ProductInfo from "./ProductInfo";
import { ProductsDataAxios } from "../common/api";

export default function DetailProduct({ match, history }) {
  const [detailProductData, setDetailProductData] = useState();

  useEffect(() => {
    ProductsDataAxios(match.params.id).then((res) => {
      setDetailProductData(res.data);
    });
  }, []);

  if (!detailProductData) return <div>로딩 중</div>;

  return (
    <div className="DetailProductPageWrapper">
      <PurchaseSettings
        match={match}
        history={history}
        data={detailProductData}
      />
      <ProductInfo data={detailProductData} />
    </div>
  );
}
