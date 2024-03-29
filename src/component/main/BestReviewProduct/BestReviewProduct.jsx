import React, { useEffect, useState } from "react";
import "../../../css/MainPage.css";
import { NavLink } from "react-router-dom";
import { MainPageBestPrdAxios } from "../../common/api.js";

function BestReviewProduct() {
  const [homeData, setHomeData] = useState([]);
  const [topData, setTopData] = useState([]);
  const [bottomData, setBottomData] = useState([]);

  useEffect(() => {
    MainPageBestPrdAxios().then((response) => {
      setHomeData(response.data.home_data[0]);
      setTopData(response.data.home_data[0].top_data);
      setBottomData(response.data.home_data[0].bottom_data);
    });
  }, []);

  return (
    <div className="bestreview_list">
      <h4>
        <span className="bestreview_title">{homeData.title}</span>
      </h4>
      <div className="bestreview_layout_inner">
        <ul className="bestview_list">
          {topData.map((arr, idx) => {
            return (
              <li key={idx}>
                <NavLink
                  to={"/DetailProduct/" + arr.product_id}
                  className="bestreview_atag"
                >
                  <div className="bestreview_thumbnail">
                    <img src={arr.thumb_image} alt="img" />
                  </div>
                  <div className="area_stylebox">
                    <div className="area_text">
                      <span>{arr.text}</span>
                    </div>
                    <div className="area_reviewinfo">
                      <span className="text_info">{arr.writer}</span>
                      <span className="text_info text_info2">{arr.date}</span>
                    </div>
                    <div className="product_name">
                      <span>{arr.product_name}</span>
                    </div>
                  </div>
                </NavLink>
              </li>
            );
          })}
        </ul>
        <div className="list_product_listview_circle">
          <ul className="listview_list">
            {bottomData.map((arr, idx) => {
              return (
                <li key={idx}>
                  <NavLink
                    to={"/DetailProduct/" + arr.product_id}
                    className="listview_atag"
                  >
                    <div className="bestreview_thumbnail">
                      <img src={arr.thumb_image} alt="img" />
                    </div>
                    <p className="bestreview_text">{arr.text}</p>
                    <div className="listview_product_name">
                      <span className="bestreview_text2">
                        {arr.product_name}
                      </span>
                    </div>
                    <div className="listview_area_reviewinfo">
                      <span className="text_info">{arr.writer}</span>
                      <span className="text_info text_info2">{arr.date}</span>
                    </div>
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

export default BestReviewProduct;
