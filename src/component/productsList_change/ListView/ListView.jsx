import React from "react";
import { NavLink } from "react-router-dom";
import "../../../css/ListView.css";

function ListView({ value }) {
  const {
    id,
    thumb_image,
    is_best,
    is_new,
    name,
    price,
    original_price,
    review_count,
    review_score,
    sold_out,
  } = value;

  return (
    <li>
      <NavLink to={"/DetailProduct/" + id}>
        <div className="listItemImage">
          <img src={thumb_image ? thumb_image : ""} alt="img" />
          <div className="flagWrapper">
            {is_best && <div className="flag flagBest">BEST</div>}
            {is_new && <div className="flag flagNew">NEW</div>}
          </div>
        </div>
        <div className="listItemInfo">
          <div className="itemTitle">{name}</div>
          <div>
            <div className="itemPrice">
              <span>{`${price}원`}</span>
              {original_price && (
                <>
                  <span>{`${original_price}원`}</span>
                  <span className="itme_saleB">
                    {`${parseInt(
                      (original_price - price) / (original_price / 100)
                    )}%`}
                  </span>
                </>
              )}
            </div>
            <div className="itemExplan">
              친구들 다 같이 모여봐요 동물의 숲이에요^^ 즐거운 시간을 보내세요
            </div>
          </div>
        </div>
      </NavLink>
      <div className="listItemReview">
        {review_count > 0 && (
          <>
            <div className="review">
              <span>리뷰</span>
              <span>{review_count}</span>
            </div>
            <div className="score">
              <span>평점</span>
              <span>{review_score}</span>
              <span>/</span>
              <span>5</span>
            </div>
          </>
        )}
      </div>
      {/* {sold_out && (
        <div className="soldoutB">
          <div className="soldout_boxB">SOLDOUT</div>
        </div>
      )} */}
    </li>
  );
}

export default ListView;
