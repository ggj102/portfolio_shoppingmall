import React from "react";

export default function ProductCount({
  productCount,
  onClickDecrease,
  onClickIncrease,
}) {
  return (
    <div className="countInput displayFlex flexEnd">
      <button type="button" onClick={onClickDecrease}>
        -
      </button>
      <input type="number" min={1} value={productCount} />
      <button type="button" onClick={onClickIncrease}>
        +
      </button>
    </div>
  );
}
