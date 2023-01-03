import React from "react";
import SelectBox from "../../../common/SelectBox";

export default function ProductOption({
  optionProductData,
  selectedOptionProduct,
  addProductData,
  selectedAddProduct,
  setSelectedOptionProduct,
  setSelectedAddProduct,
}) {
  const productOption = (product, list) => {
    const option = [{ name: product.name, id: 0 }];
    const optionReduce = list.reduce((acc, val) => {
      const optionName = `${val.name}`;
      const addPrice = val.add_price ? ` (${val.add_price}원)추가` : "";
      const price = val.price ? ` ${val.price}원` : "";
      const soldout = val.soldout ? " (품절)" : "";
      const name = `${optionName}${addPrice || price || ""}${soldout}`;

      acc.push({ name, id: val.id });

      return acc;
    }, []);

    return option.concat(optionReduce);
  };

  const selectedData = (e, listId, listArr, selectedArr) => {
    const { value } = e.target;
    console.log(value, "리스트");

    const valueId = parseInt(value);
    const duplicationCheck = selectedArr.find(
      (val) => val.id === valueId && val.data_id === listId
    );

    if (duplicationCheck || value === "0") {
      alert("이미 선택한 상품입니다.");
      e.target.value = "0";
      return selectedArr;
    }

    const findValue = listArr.find((arr) => arr.id === valueId);
    const copyArr = [...selectedArr];

    if (findValue.soldout) {
      e.target.value = "0";
      alert("품절된 옵션입니다.");
    } else copyArr.push({ ...findValue, count: 1, data_id: listId });

    return copyArr;
  };

  const onChangeSelectedOptionProduct = (e, listId) => {
    const listArr = optionProductData.find((val) => val.id === listId);
    const list = listArr.option_list;

    const data = selectedData(e, listId, list, selectedOptionProduct);
    setSelectedOptionProduct(data);
  };

  const onChangeSelectedAddProduct = (e, listId) => {
    const listArr = addProductData.find((val) => val.id === listId);
    const list = listArr.product_list;
    const data = selectedData(e, listId, list, selectedAddProduct);
    setSelectedAddProduct(data);
  };

  return (
    <>
      {optionProductData.length > 0 && (
        <div className="displayFlex">
          <p>옵션</p>
          <div>
            <ul>
              {optionProductData.map((val, idx) => {
                const option = productOption(val, val.option_list);
                return (
                  <li key={idx}>
                    <SelectBox
                      option={option}
                      onChange={(e) => onChangeSelectedOptionProduct(e, val.id)}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
      {addProductData.length > 0 && (
        <div className="displayFlex">
          <p>추가상품</p>
          <div>
            <ul>
              {addProductData.map((val, idx) => {
                const option = productOption(val, val.product_list);
                return (
                  <li key={`${val.name}${idx}`}>
                    <SelectBox
                      option={option}
                      onChange={(e) => onChangeSelectedAddProduct(e, val.id)}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
