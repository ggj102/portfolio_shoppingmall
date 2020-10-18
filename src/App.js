import React, { useEffect } from 'react';
import {Route, Switch} from 'react-router-dom'
import ShoppingMallMain from './page/ShoppingMallMain';
import SignUpConsent from './component/SignUpConsent';
import SignUpDetail from './component/SignUpDetail';
import LogIn from './component/LogIn';
import Products from './component/Products';
import ProductsList from './component/ProductsList';
import Cart from './component/Cart';
import CategoryPrdList from './component/CategoryPrdList';
import SearchPrdList from './component/SearchPrdList';
import MainPage from './page/MainPage';
import Axios from 'axios';
import { connect } from 'react-redux';
import { gMemberId,gMemberName } from './store/modules/GlobalData.js'

function App({gMemberId,gMemberName}) {

  useEffect(()=>{
    Axios.get("https://lab.usagi.space/portfolio/user", {
      withCredentials: true,
    }).then((response)=>{
        if(response.data.login)
        {
            gMemberId(response.data.user_data.id);
            gMemberName(response.data.user_data.name);
        }
        else if(!response.data.login)
        {
           return
        }
    })
  },[])

  return (
    <>
      <Route exact path="/" component={ShoppingMallMain}/>
      <Route path="/SignUpConsent" component={SignUpConsent}/>
      <Route path="/ShoppingMallMain" component={ShoppingMallMain}/>
      <Route path="/SignUpDetail" component={SignUpDetail}/>
      <Route path="/LogIn" component={LogIn}/>
      {/* <Route path="/ProductsList" component={ProductsList}/> */}
      <Route path="/Cart" component={Cart}/>
      <Route path="/MainPage" component={MainPage}/>
      <Route path="/Products/:id" component={Products}/>
      <Route path="/CategoryPrdList/:id" component={CategoryPrdList}/>
      <Route path="/SearchPrdList/:data" component={SearchPrdList}/>
    </>
  );
}

const mapStateToProps = state =>({

})

const mapDispatchToProps = dispatch =>({
    gMemberId: id => dispatch(gMemberId(id)),
    gMemberName: name => dispatch(gMemberName(name))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
