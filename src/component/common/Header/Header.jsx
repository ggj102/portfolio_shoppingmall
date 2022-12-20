import React, { useEffect, useState } from "react";
import "../../../css/Common/Header.css";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  gMemberId,
  gMemberName,
  gCartCount,
  gDataReset,
  gNowPage,
} from "../../../store/modules/GlobalData.js";
import {
  MainPageHeaderCountAxios,
  MainPageHeaderLogoutAxios,
} from "../../common/api";
import CategoryTab from "./CategoryTab";

function Header({
  history,
  loginState,
  gName,
  gCount,
  gCartCount,
  gDataReset,
  nowPage,
  page,
}) {
  const [searchValue, setSearchValue] = useState("");

  // 장바구니 count값을 서버에서 가져오며 result가 -1 일때 재귀함수로 서버에 재요청 함
  const cartCountResponse = () => {
    MainPageHeaderCountAxios().then((response) => {
      if (response.data.result === 0) {
        gCartCount(response.data.count);
      } else if (response.data.result === -1) {
        cartCountResponse();
      }
    });
  };

  // 로그아웃 서버에 값을 요청하며 작업이 끝난 후 store의 글로벌 데이터 초기화
  const onClickLogOut = () => {
    MainPageHeaderLogoutAxios().then(() => {
      gDataReset();
      if (page === "cart") {
        history.push("/login");
      }
    });
  };

  const onClickSearch = () => {
    history.push("/SearchPrdList/" + searchValue);
  };

  const onKeyPressSearch = (e) => {
    if (e.key === "Enter") onClickSearch();
  };

  const onPageChange = () => {
    nowPage("cart");
  };

  useEffect(() => cartCountResponse(), []);

  return (
    <div className="headerWrapper">
      <div className="menuWrapper">
        <div className="menu">
          {!loginState ? (
            <>
              <div>
                <NavLink to="/Login">
                  <span>로그인</span>
                </NavLink>
              </div>
              <div>
                <NavLink to="/SignUp">
                  <span>회원가입</span>
                </NavLink>
              </div>
            </>
          ) : (
            <>
              <div>
                <NavLink to="/Cart" onClick={onPageChange}>
                  <span>장바구니{gCount > 0 && `(${gCount})`}</span>
                </NavLink>
              </div>
              <div>
                <span>{gName + "님"}</span>
              </div>
              <div className="Logout" onClick={onClickLogOut}>
                <span>로그아웃</span>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="titleWrapper">
        <div className="titleContent">
          <div className="title">
            <p>Shopping Mall</p>
          </div>
          <div className="searchContent">
            <div className="searchWrapper">
              <input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyPress={onKeyPressSearch}
              />
              {searchValue && (
                <button
                  className="searchResetBtn"
                  onClick={() => setSearchValue("")}
                >
                  X
                </button>
              )}
              <button className="searchBtn" onClick={onClickSearch}>
                검색
              </button>
            </div>
          </div>
        </div>
      </div>
      <CategoryTab />
    </div>
  );
}

const mapStateToProps = (state) => ({
  gCount: state.GlobalData.gCount,
  gName: state.GlobalData.gName,
  loginState: state.GlobalData.glogin,
  page: state.GlobalData.gPage,
});

const mapDispatchToProps = (dispatch) => ({
  gMemberId: (id) => dispatch(gMemberId(id)),
  gMemberName: (name) => dispatch(gMemberName(name)),
  gCartCount: (count) => dispatch(gCartCount(count)),
  gDataReset: () => dispatch(gDataReset()),
  nowPage: (page) => dispatch(gNowPage(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
