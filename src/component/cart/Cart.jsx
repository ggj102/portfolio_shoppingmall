import React, { useEffect, useState } from "react";
import "../../css/Cart.css";
import { NavLink } from "react-router-dom";
import { CartDataAxios, CartListDeleteAxios } from "../common/api.js";
import { connect } from "react-redux";

function Cart({ loginState, history }) {
  const [cartData, setCartData] = useState({});
  const [cartList, setCartList] = useState([]);
  const [prdTotal, setPrdTotal] = useState(0);
  const [checkItem, setCheckItem] = useState([]);
  const [checkCount, setChcekCount] = useState(0);
  const [deliveryprice, setDeliveryprice] = useState(0);

  const cartDataGet = () => {
    CartDataAxios().then((response) => {
      console.log(response.data, "데이터");
      console.log(response.product_list, "리스트");
      setCartData(response.data);
      setCartList(response.data.product_list);
    });
  };

  // checkItem에 있는 상품들의 가격 및 배송비를 계산하는 기능
  const totalCal = () => {
    const copylist = [...checkItem];
    let min = 0;

    if (copylist.length > 0) {
      min = copylist[0].delivery_price;
      for (let i = 1; i < copylist.length; i++) {
        if (min > copylist[i].delivery_price) {
          min = copylist[i].delivery_price;
        }
      }
    }

    const totalprice = copylist.reduce((acc, value) => {
      return acc + value.price;
    }, 0);

    setDeliveryprice(min);
    setPrdTotal(totalprice);
  };

  // 체크박스 all check 기능
  const onAllCheck = () => {
    if (checkCount !== cartList.length) {
      setChcekCount(cartList.length);
      setCheckItem(cartList);
    } else {
      setChcekCount(0);
      setCheckItem([]);
    }
  };

  const prdDelBtn = (cartId) => {
    const deleteConfirm = window.confirm(
      "해당 상품을 장바구니에서 삭제하시겠습니까?"
    );
    const idArr = [cartId];

    if (deleteConfirm) {
      CartListDeleteAxios(idArr).then(() => {
        setCheckItem([]);
        setChcekCount(0);
        cartDataGet();
      });
    }
    return;
  };

  // 체크한 상품을 삭제하는 기능
  const checkPrdDel = () => {
    const deleteConfirm = window.confirm(
      "선택하신 " +
        checkItem.length +
        "개 상품을 장바구니에서 삭제하시겠습니까?"
    );

    if (deleteConfirm) {
      const removeId = checkItem.map((arr) => {
        return arr.cart_id;
      });

      CartListDeleteAxios(removeId).then(() => {
        setCheckItem([]);
        setChcekCount(0);
        cartDataGet();
      });
    }
    return;
  };

  // 상품 체크박스를 체크하면 checkItem로 set하여 보관하며
  // checkItem에 있을 경우 삭제
  const checklist = (cartId) => {
    const list = [...cartList];

    const checkFind = list.find((arr) => {
      return arr.cart_id === cartId;
    });

    const unCheckFind = checkItem.find((arr) => {
      return arr.cart_id === checkFind.cart_id;
    });

    if (!unCheckFind) {
      setCheckItem([...checkItem, checkFind]);
      setChcekCount(checkCount + 1);
    } else {
      const removeFilter = checkItem.filter((arr) => {
        return arr.cart_id !== unCheckFind.cart_id;
      });
      setCheckItem(removeFilter);
      setChcekCount(checkCount - 1);
    }
  };

  useEffect(() => {
    cartDataGet();
  }, []);

  useEffect(totalCal, [checkItem]);

  if (!loginState) {
    history.push("/");
    return null;
  }

  return (
    <div className="cartWrapper">
      {cartList.length > 0 ? (
        <div>
          <table className="cart_table">
            <thead>
              <tr className="table_title">
                <th scope="col" className="table_title_part">
                  <input
                    type="checkbox"
                    onChange={onAllCheck}
                    checked={checkCount === cartList.length}
                  />
                </th>
                <th scope="col" className="table_title_part">
                  상품정보
                </th>
                <th scope="col" className="table_title_part">
                  옵션
                </th>
                <th scope="col" className="table_title_part">
                  상품금액
                </th>
                <th scope="col" className="table_title_part">
                  배송비
                </th>
              </tr>
            </thead>
            <tbody>
              {cartList.map((arr, index) => {
                return (
                  <tr key={index}>
                    <td className="cart_item_cell">
                      <input
                        type="checkbox"
                        onChange={() => checklist(arr.cart_id)}
                        checked={checkItem.find((findarr) => {
                          return findarr.cart_id === arr.cart_id;
                        })}
                      />
                    </td>
                    <td className="cart_item_cell">
                      <div className="prd_desc">
                        <div className="prd_description">
                          <span className="prd_thumb">
                            <img src={arr.thumb} alt="img" />
                          </span>
                          <span className="cart_Prd_name">{arr.title}</span>
                          <span className="prd_price_area">
                            <div className="prd_price_sale">
                              {arr.price}
                              <span className="price_text">원</span>
                            </div>
                          </span>
                        </div>
                      </div>
                      <div className="prd_btn_area">
                        <button onClick={() => prdDelBtn(arr.cart_id)}>
                          X
                        </button>
                      </div>
                    </td>
                    <td className="cart_item_cell valign_top">
                      <div className="prd_option_area">
                        <div className="prd_option_wrap">
                          <div className="prd_option_text">
                            {arr.option.map((opArr) => {
                              return <div>{opArr}</div>;
                            })}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="cart_item_cell">
                      <div className="item_prd_price">
                        <em className="item_prd_price_em">
                          {arr.price}
                          <span>원</span>
                        </em>
                        <span className="item_prd_delivery_text">
                          (배송비{" "}
                          {arr.delivery_price
                            ? arr.delivery_price + "원"
                            : "무료"}
                          )
                        </span>
                        <div className="item_prd_button_box">
                          <button>주문하기</button>
                        </div>
                      </div>
                    </td>
                    {index === 0 && (
                      <td rowSpan={cartList.length} className="cart_item_cell">
                        <div className="delivery_free">
                          <div className="delivery_free_price">
                            <span className="delivery_free_price_text">
                              {cartData.total_delivery_price === 0
                                ? "무료"
                                : cartData.total_delivery_price + "원"}
                            </span>
                            <div className="delivery_free_blank"></div>
                          </div>
                          <div className="delivery_free_text_area">
                            <span className="icon_today">오늘출발</span>
                            <span className="delivery_free_text">
                              15:00까지 결제 시<em>오늘 바로 발송</em>
                            </span>
                          </div>
                          <div className="delivery_comment">
                            판매자 설정에 따라
                            <br />
                            상품별 배송비가 개별
                            <br />
                            발생됩니다.
                          </div>
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="prd_check_btn_area">
            <div className="checkbox_input">
              <input
                type="checkbox"
                onChange={onAllCheck}
                checked={checkCount === cartList.length}
              />
            </div>
            <button onClick={checkPrdDel}>선택상품 삭제</button>
          </div>
          <div className="order_calculator">
            <div className="prd_price_detail">
              <dl className="prd_price_detail_text_area">
                <dt>총 상품금액</dt>
                <dd>
                  <span className="prd_price_detail_text1">{prdTotal}</span>원
                </dd>
              </dl>
              <span className="order_calculator_mark">+</span>
              <dl className="prd_price_detail_text_area">
                <dt>배송비</dt>
                <dd>
                  <span className="prd_price_detail_text1">
                    {deliveryprice}
                  </span>
                  원
                </dd>
              </dl>
              <span className="order_calculator_mark">-</span>
              <dl className="prd_price_detail_text_area">
                <dt>할인예상금액</dt>
                <dd className="discount_text">
                  <span className="prd_price_detail_text1">0</span>원
                </dd>
              </dl>
            </div>
            <div className="prd_price_total">
              <span className="prd_price_total_text">총 주문금액</span>
              <span className="prd_price_total_num">
                <span className="prd_price_total_num_text">
                  {prdTotal + deliveryprice}
                </span>
                원
              </span>
            </div>
          </div>
          <div className="cart_button_box">
            <NavLink to="/" className="link_home">
              쇼핑 계속하기
            </NavLink>
            <button>주문하기</button>
          </div>
        </div>
      ) : (
        <div className="cart_empty">
          <p className="cart_empty_text1">장바구니에 담긴 상품이 없습니다.</p>
          <p className="cart_empty_text2">
            원하는 상품을 장바구니에 담아보세요.
          </p>
          <NavLink to="/" className="link_home">
            쇼핑 계속하기
          </NavLink>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  loginState: state.GlobalData.glogin,
});

export default connect(mapStateToProps)(Cart);
