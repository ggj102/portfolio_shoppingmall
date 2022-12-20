import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";

import { gMemberId, gMemberName } from "./store/modules/GlobalData.js";
import { ShoppingMallMainDataAxios } from "./component/common/api.js";
import SigninPage from "./pages/SigninPage";
import SignUpPage from "./pages/SignUpPage";
import Cart from "./component/Cart.js";
import Products from "./component/Products.js";
import CategoryPrdList from "./component/ProductsList/CategoryPrdList.js";
import SearchPrdList from "./component/ProductsList/SearchPrdList";
import MainPage from "./pages/MainPage.jsx";
import Header from "./component/common/Header/Header.jsx";

function App({ gMemberId, gMemberName }) {
  useEffect(() => {
    ShoppingMallMainDataAxios().then((response) => {
      if (response.data.login) {
        gMemberId(response.data.user_data.id);
        gMemberName(response.data.user_data.name);
      } else if (!response.data.login) {
        return;
      }
    });
  }, [gMemberId, gMemberName]);

  return (
    <>
      <Header />
      <Route path="/LogIn" component={SigninPage} />
      <Route path="/SignUp" component={SignUpPage} />
      <Route path="/Cart" component={Cart} />
      <Route path="/Products/:id" component={Products} />
      <Route path="/CategoryPrdList/:id" component={CategoryPrdList} />
      <Route path="/SearchPrdList/:data" component={SearchPrdList} />
      <Route exact path="/" component={MainPage} />
    </>
  );
}

const mapStateToProps = null;

const mapDispatchToProps = (dispatch) => ({
  gMemberId: (id) => dispatch(gMemberId(id)),
  gMemberName: (name) => dispatch(gMemberName(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
