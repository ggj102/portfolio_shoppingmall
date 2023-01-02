import React, { useEffect, useState } from "react";
import "../../css/ProductsList.css";
import { CategoryPrdListAxios, SearchPrdListAxios } from "../common/api";
import ListView from "./ListView";

export default function ProductsList({ match }) {
  const [listData, setListData] = useState({});
  const [listItemData, setListItemData] = useState([]);

  const [sortType, setSortType] = useState([]);

  const [nowPage, setNowPage] = useState(1);
  const [perPage] = useState(40);
  const [pagination, setPagination] = useState();

  const [currentSortTab, setCurrentSortTab] = useState("popular");
  const [currnetViewTab, setCurrnetViewTab] = useState("A");

  const categorySort = [
    { type: "popular", title: "인기도순" },
    { type: "total_sale", title: "누적판매순" },
    { type: "low_price", title: "낮은가격순" },
    { type: "recent", title: "최신등록순" },
    { type: "review_count", title: "리뷰많은순" },
    { type: "review_score", title: "평점높은순" },
  ];

  const searchSort = [
    { type: "popular", title: "정확도순" },
    { type: "low_price", title: "낮은가격순" },
    { type: "low_price", title: "높은가격순" },
    { type: "recent", title: "최신등록순" },
    { type: "review_count", title: "리뷰많은순" },
  ];

  useEffect(() => {
    console.log(match, "매치");
    const isCategroyType = match.path === "/CategoryProductsList/:id";
    const ListAxios = isCategroyType
      ? CategoryPrdListAxios
      : SearchPrdListAxios;

    ListAxios(match.params.id, currentSortTab, nowPage, perPage).then(
      (response) => {
        setListData(response.data);
        setListItemData(response.data.item_list);
        setSortType(isCategroyType ? categorySort : searchSort);
        setPagination(
          response.data.total_count < perPage
            ? 1
            : Math.ceil(response.data.total_count / perPage)
        );
      }
    );
  }, [currentSortTab, nowPage, perPage]);

  return (
    <div className="productListWrapper">
      <div className="productListHeader">
        <p>{listData.title}</p>
        <div className="category_route">
          {(match.path === "/CategoryProductsList/:id") === "category" && (
            <ul>
              <li>
                <a href="#route" className="route_text">
                  홈
                </a>
                <span className="arrow_mark">&gt;</span>
              </li>
              <li>
                <a href="#route" className="route_text2">
                  Nintendo Switch(29)
                </a>
                <span className="arrow_mark">&gt;</span>
              </li>
              <li>
                <a href="#route" className="route_text">
                  전체
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
      <div className="viewSortTabWrapper">
        <div className="productSortTab">
          <ul>
            {sortType.map((val, idx) => {
              const { type, title } = val;
              const isFocus = currentSortTab === type;

              return (
                <li key={idx.toString()}>
                  <a
                    href="#sort"
                    className={isFocus ? "sortTabFocus" : ""}
                    onClick={() => setCurrentSortTab(type)}
                  >
                    {title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="productViewTab">
          {/* <div className="sort_selectBox">
            <select value={perPage} onChange={onPerPage}>
              <option value="20">20개씩 보기</option>
              <option value="40">40개씩 보기</option>
              <option value="60">60개씩 보기</option>
              <option value="80">80개씩 보기</option>
            </select>
          </div> */}
          <button
            className={currnetViewTab === "A" ? "viewTabFocue" : ""}
            onClick={() => setCurrnetViewTab("A")}
          >
            A
          </button>
          <button
            className={currnetViewTab === "B" ? "viewTabFocue" : ""}
            onClick={() => setCurrnetViewTab("B")}
          >
            B
          </button>
          <button
            className={currnetViewTab === "C" ? "viewTabFocue" : ""}
            onClick={() => setCurrnetViewTab("C")}
          >
            C
          </button>
          <button
            className={currnetViewTab === "D" ? "viewTabFocue" : ""}
            onClick={() => setCurrnetViewTab("D")}
          >
            D
          </button>
        </div>
      </div>

      <div className="listWrapper">
        <ul className={`viewListWrapper viewType${currnetViewTab}`}>
          {listItemData.map((val, idx) => {
            return <ListView key={`${val.name}${idx}`} value={val} />;
          })}
        </ul>
        <div className="listPagination">
          <button>1</button>
        </div>
      </div>
    </div>
  );
}
