import React, { Fragment, useEffect, useState } from "react";
// import "../../../css/Products.css";
import "../../../css/DetailProduct.css";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import {
  gCartCountIncrease,
  gNowPage,
} from "../../../store/modules/GlobalData.js";
import { ProductsCartAddAxios } from "../../common/api.js";
import Installment from "./Installment";
import SelectBox from "../../common/SelectBox";
import PurchaseList from "./PurchaseList";
import ProductOption from "./ProductOption";

function PurchaseSettings({
  data,
  match,
  history,
  gCartCountIncrease,
  loginState,
  nowPage,
}) {
  const [currentShowImg, setCurrentShowImg] = useState(0);
  const [productCount, setProductCount] = useState(1);
  const [optionProductData, setOptionProductData] = useState([]);
  const [addProductData, setAddProductData] = useState([]);
  const [currnetDeliveryMethod, setCurrnetDeliveryMethod] = useState("1");
  const [selectedOptionProduct, setSelectedOptionProduct] = useState([]);
  const [selectedAddProduct, setSelectedAddProduct] = useState([]);
  const [isInstallmentModal, setIsInstallmentModal] = useState(false);

  const [totalProduct, setTotalProduct] = useState({ price: 0, count: 0 });
  const [totalAddProduct, setTotalAddProduct] = useState({
    price: 0,
    count: 0,
  });
  const [totalOptionProduct, setTotalOptionProduct] = useState({
    price: 0,
    count: 0,
  });

  const onClickInstallmentModal = () => {
    setIsInstallmentModal(!isInstallmentModal);
  };

  const productCalc = (dataArr, state, setState) => {
    const reduce = dataArr.reduce(
      (acc, val) => {
        const addPrice = val.add_price || 0;
        const price = val.price ? val.price : data.product_price;

        acc.price += val.count * (price + addPrice);
        acc.count += val.count;

        return acc;
      },
      { price: 0, count: 0 }
    );
    const { price, count } = reduce;

    setState({ ...state, price, count });
  };

  const onClickAddCart = () => {
    if (selectedOptionProduct.length === 0 && optionProductData.length !== 0) {
      alert("옵션을 선택하지 않으셨습니다. 옵션을 선택해 주세요.");
    } else if (!loginState) {
      const loginConfirm = window.confirm(
        "로그인이 필요한 서비스입니다. 로그인 하시겠습니까?"
      );
      if (loginConfirm) history.push("/LogIn");
    } else {
      let optionProduct = [[null, null, productCount]];

      const addProduct = selectedAddProduct.map((arr) => {
        return [arr.data_id, arr.id, arr.count];
      });

      if (optionProductData.length !== 0) {
        optionProduct = selectedOptionProduct.map((arr) => {
          return [arr.data_id, arr.id, arr.count];
        });
      }

      ProductsCartAddAxios(
        match.params.id,
        optionProduct,
        addProduct,
        currnetDeliveryMethod
      ).then(() => {
        gCartCountIncrease(1);
        const cartPageConfirm = window.confirm(
          "장바구니에 상품을 담았습니다.\n장바구니로 이동하시겠습니까?"
        );
        if (cartPageConfirm) {
          nowPage("cart");
          history.push("/Cart");
        }
      });
    }
  };

  useEffect(() => {
    if (data) {
      console.log(data, "데이터");
      if (data.option) setOptionProductData(data.option);
      setAddProductData(data.add_product);
    }
  }, [data]);

  useEffect(() => {
    productCalc(
      selectedOptionProduct,
      totalOptionProduct,
      setTotalOptionProduct
    );
  }, [selectedOptionProduct]);

  useEffect(() => {
    productCalc(selectedAddProduct, totalAddProduct, setTotalAddProduct);
  }, [selectedAddProduct]);

  useEffect(() => {
    const isNoOption = optionProductData.length === 0;
    const price = isNoOption ? data.product_price : totalOptionProduct.price;
    const conut = isNoOption ? productCount : totalOptionProduct.count;
    const totalPrice = productCount * price + totalAddProduct.price;
    const totalCount = conut + totalAddProduct.count;

    setTotalProduct({ ...totalProduct, price: totalPrice, count: totalCount });
  }, [productCount, optionProductData, totalOptionProduct, totalAddProduct]);

  return (
    <div className="purchaseSettingsWrapper">
      <div className="categoryList">
        <NavLink to="/">홈</NavLink>
        <span className="bar">{">"}</span>
        {data.category_list.map((val, idx) => {
          const { id, name, num } = val;
          return (
            <span key={`category${idx}`}>
              <NavLink to={"/CategoryProductsList/" + id}>
                {name}
                {data.category_list.length === idx + 1 && `(총${num}개)`}
              </NavLink>
              {data.category_list.length !== idx + 1 && (
                <span className="bar">{">"}</span>
              )}
            </span>
          );
        })}
      </div>
      <div className="purchaseSettingsContent">
        <div className="productImage">
          <div className="showImage">
            <img src={data.product_image[currentShowImg].url} alt="img" />
          </div>
          <div className="productImageList displayFlex">
            {data.product_image.length > 1 &&
              data.product_image.map((val, idx) => {
                return (
                  <div
                    key={`ImageList${idx}`}
                    onMouseOver={() => setCurrentShowImg(idx)}
                  >
                    <img src={val.url} alt="img" />
                  </div>
                );
              })}
          </div>
        </div>
        <div className="purchaseSettings">
          <div className="saleInfo settingsContent">
            <p className="productNum explan">{`상품번호 : ${data.product_code}`}</p>
            <p className="productName">{data.product_name}</p>
            <div
              className="salePrice displayFlex"
              style={{ justifyContent: !data.sale_info && "flex-end" }}
            >
              {data.sale_info && (
                <div className="discount displayFlex">
                  <span>{data.sale_info.discount_percent}</span>
                  <span>{`${data.sale_info.original_price}원`}</span>
                </div>
              )}
              <span>{`${data.product_price}원`}</span>
            </div>

            <div className="displayFlex Installment">
              <p>무이자할부</p>
              <div>
                <button onClick={onClickInstallmentModal}>자세히보기</button>
                {isInstallmentModal ? (
                  <Installment onClose={onClickInstallmentModal} />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="settingsContent">
            <div className="displayFlex">
              <p>배송방법</p>
              <div>
                {data.delivery_method.length === 1 ? (
                  <p className="text_delivery">택배</p>
                ) : (
                  <SelectBox
                    option={data.delivery_method}
                    onChange={(e) => {
                      console.log(e.target.value, "메소드");
                      setCurrnetDeliveryMethod(e.target.value);
                    }}
                  />
                )}
              </div>
            </div>
            {currnetDeliveryMethod === "1" && (
              <div className="displayFlex">
                <p>배송비</p>
                <div>
                  <p>
                    {data.delivery_method[0].price === 0
                      ? "무료"
                      : `${data.delivery_method[0].price}원`}
                  </p>
                  <p className="explan">
                    {data.delivery_method[0].additional_description}
                  </p>
                </div>
              </div>
            )}
          </div>
          {(optionProductData.length !== 0 || addProductData.length !== 0) && (
            <div className="settingsContent productOption">
              <ProductOption
                optionProductData={optionProductData}
                selectedOptionProduct={selectedOptionProduct}
                addProductData={addProductData}
                selectedAddProduct={selectedAddProduct}
                setSelectedOptionProduct={setSelectedOptionProduct}
                setSelectedAddProduct={setSelectedAddProduct}
              />
            </div>
          )}
          <div className="settingsContent">
            <PurchaseList
              isNoOption={optionProductData.length === 0}
              productCount={productCount}
              productPrice={data.product_price}
              selectedOptionProduct={selectedOptionProduct}
              selectedAddProduct={selectedAddProduct}
              setProductCount={setProductCount}
              setSelectedOptionProduct={setSelectedOptionProduct}
              setSelectedAddProduct={setSelectedAddProduct}
            />
          </div>
          <div className="settingsContent">
            <div className="totalPrice displayFlex flexEnd">
              <span>{`총 수량 ${totalProduct.count}개`}</span>
              <span>총 상품금액</span>
              <span>{`${totalProduct.price}원`}</span>
            </div>
            <div className="purchaseCartBtn displayFlex flexEnd">
              <button onClick={() => alert("구현되지 않은 기능입니다.")}>
                구매하기
              </button>
              <button onClick={onClickAddCart}>장바구니</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  loginState: state.GlobalData.glogin,
});

const mapDispatchToProps = (dispatch) => ({
  gCartCountIncrease: (count) => dispatch(gCartCountIncrease(count)),
  nowPage: (page) => dispatch(gNowPage(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseSettings);
