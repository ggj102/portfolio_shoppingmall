import React from "react";
import ProductCount from "../ProductCount";

export default function PurchaseList({
  isNoOption,
  productCount,
  productPrice,
  selectedOptionProduct,
  selectedAddProduct,
  setProductCount,
  setSelectedOptionProduct,
  setSelectedAddProduct,
}) {
  const onClickOptionProductCount = (idx, type) => {
    const copyData = [...selectedOptionProduct];
    if (type === "+") copyData[idx].count += 1;
    else if (copyData[idx].count > 1) copyData[idx].count -= 1;

    setSelectedOptionProduct(copyData);
  };

  const onClickAddProductCount = (idx, type) => {
    const copyData = [...selectedAddProduct];
    if (type === "+") copyData[idx].count += 1;
    else if (copyData[idx].count > 1) copyData[idx].count -= 1;

    setSelectedAddProduct(copyData);
  };

  const onClickCount = (type) => {
    if (type === "+") productCount += 1;
    else if (productCount > 1) productCount -= 1;

    setProductCount(productCount);
  };

  const onClickRemoveOptionProduct = (idx) => {
    const copyData = [...selectedOptionProduct];
    const filter = copyData.filter((val, index) => idx !== index);

    setSelectedOptionProduct(filter);
  };
  const onClickRemoveAddProduct = (idx) => {
    const copyData = [...selectedAddProduct];
    const filter = copyData.filter((val, index) => idx !== index);

    setSelectedAddProduct(filter);
  };

  return (
    <ul className="purchaseList">
      {selectedOptionProduct.map((val, idx) => {
        const addPrice = val.add_price || 0;
        const price = productPrice + addPrice;

        return (
          <li key={`${val.name}${val.id}`}>
            <span>{val.name}</span>
            <div>
              <ProductCount
                productCount={val.count}
                onClickIncrease={() => onClickOptionProductCount(idx, "+")}
                onClickDecrease={() => onClickOptionProductCount(idx)}
              />
              <div>
                <span>{price * val.count}</span>
                <button onClick={() => onClickRemoveOptionProduct(idx)}>
                  X
                </button>
              </div>
            </div>
          </li>
        );
      })}
      {selectedAddProduct.map((val, idx) => {
        return (
          <li key={`${val.name}${val.id}`}>
            <span>{val.name}</span>
            <div>
              <ProductCount
                productCount={val.count}
                onClickIncrease={() => onClickAddProductCount(idx, "+")}
                onClickDecrease={() => onClickAddProductCount(idx)}
              />
              <div>
                <span>{val.price * val.count}</span>
                <button onClick={() => onClickRemoveAddProduct(idx)}>X</button>
              </div>
            </div>
          </li>
        );
      })}
      {isNoOption && (
        <li className="defaultProduct">
          <div>
            <ProductCount
              productCount={productCount}
              onClickIncrease={() => onClickCount("+")}
              onClickDecrease={onClickCount}
            />
          </div>
        </li>
      )}
    </ul>
  );
}
