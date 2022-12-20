import React, { useEffect, useState } from "react";
import "../../../css/MainPage.css";
import { NavLink } from "react-router-dom";
import { MainPageAllPrdAxios } from "../../common/api";

export default function AllProduct() {
  const [itemList, setItemList] = useState([]);
  const [sortType, setSortType] = useState("recommend");

  const sortTypeArr = [
    { type: "recommend", title: "판매자추천순" },
    { type: "popular", title: "인기도순" },
    { type: "review_score", title: "평점높은순" },
    { type: "recent", title: "최신등록순" },
  ];

  const saleCalc = (price1, price2) => {
    const cal = price2 - price1;
    const cal2 = cal / (price2 / 100);
    return parseInt(cal2);
  };

  useEffect(() => {
    MainPageAllPrdAxios(sortType).then((res) => {
      setItemList(res.data.item_list);
    });
  }, [sortType]);

  return (
    <div>
      <h4 className="allprd_title">
        <span className="title_inner">상품전체</span>
      </h4>
      <div className="allprd_sort">
        <ul className="allprd_sort_ul">
          {sortTypeArr.map((arr, idx) => {
            return (
              <li
                key={idx.toString()}
                className="allprd_sort_li"
                onClick={() => {
                  setSortType(arr.type);
                }}
              >
                <a
                  href="#sort"
                  className={
                    sortType === arr.type
                      ? "allprd_sort_focus"
                      : "allprd_sort_atag"
                  }
                >
                  {sortType === arr.type && <span>V</span>}
                  {arr.title}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <div className="allprd_list">
          <ul className="allprd_list_ul">
            {itemList.map((arr, idx) => {
              return (
                <li key={idx} className="allprd_list_li">
                  <NavLink
                    to={"/Products/" + arr.id}
                    className="allprd_list_atag"
                  >
                    <div className="allprd_list_thumbnail">
                      <img src={arr.thumb_image} alt="img" />
                    </div>
                    <strong className="allprd_list_title">{arr.name}</strong>
                    <div className="allprd_list_price_area">
                      <strong className="allprd_list_price">
                        <span className="price_num">{arr.price}</span>
                        <span className="price_text">원</span>
                        {arr.original_price && (
                          <>
                            <strong className="itme_original_priceB">
                              {arr.original_price}원
                            </strong>
                            <strong className="itme_saleB">
                              {`${saleCalc(arr.price, arr.original_price)}%`}
                            </strong>
                          </>
                        )}
                      </strong>
                    </div>
                    {arr.text && arr.text}
                    <div className="area_flag">
                      {arr.is_new && <div className="flag flag_new">NEW</div>}
                      {arr.is_best && (
                        <div className="flag flag_best">BEST</div>
                      )}
                    </div>
                    {arr.review_count > 0 && (
                      <div className="allprd_list_estimation">
                        <span className="allprd_list_estimation_text">
                          리뷰
                        </span>
                        <span className="allprd_list_estimation_text2">
                          {arr.review_count}
                        </span>
                        <span className="allprd_list_estimation_text">
                          평점
                        </span>
                        <span className="allprd_list_estimation_text2">
                          {arr.review_score}
                          <span className="slash">/</span>5
                        </span>
                      </div>
                    )}
                    {arr.sold_out && (
                      <div className="soldout_area">
                        <div className="soldout">SOLDOUT</div>
                      </div>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
