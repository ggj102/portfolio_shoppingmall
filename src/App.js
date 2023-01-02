import React, { useEffect } from "react";
import "./App.css";
import { connect } from "react-redux";
import { Route } from "react-router-dom";

import {
  gMemberId,
  gMemberName,
  gLoginState,
} from "./store/modules/GlobalData.js";
import { ShoppingMallMainDataAxios } from "./component/common/api.js";
import Header from "./component/common/Header/Header.jsx";
import SigninPage from "./pages/SigninPage";
import SignUpPage from "./pages/SignUpPage";
import CartPage from "./pages/CartPage";
import DetailProductPage from "./pages/DetailProductPage.jsx";
import ProductsListPage from "./pages/ProductsListPage";
import MainPage from "./pages/MainPage.jsx";

function App({ gMemberId, gMemberName, loginState }) {
  useEffect(() => {
    ShoppingMallMainDataAxios().then((response) => {
      console.log(response, "정보");
      if (response.data.login) {
        loginState(true);
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
      <Route path="/Cart" component={CartPage} />
      <Route path="/DetailProduct/:id" component={DetailProductPage} />
      <Route path="/CategoryProductsList/:id" component={ProductsListPage} />
      <Route path="/SearchProductsList/:data" component={ProductsListPage} />
      <Route exact path="/" component={MainPage} />
    </>
  );
}

const mapStateToProps = null;

const mapDispatchToProps = (dispatch) => ({
  gMemberId: (id) => dispatch(gMemberId(id)),
  gMemberName: (name) => dispatch(gMemberName(name)),
  loginState: (state) => dispatch(gLoginState(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
