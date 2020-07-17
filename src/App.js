import React from 'react';
import {Route} from 'react-router-dom'
import ShoppingMallMain from './page/ShoppingMallMain';
import SignUpConsent from './component/SignUpConsent';
import SignUpDetail from './component/SignUpDetail';
import LogIn from './component/LogIn';
import Products from './component/Products';

function App() {
  return (
    <>
      <Route exact path="/" component={ShoppingMallMain}/>
      <Route path="/SignUpConsent" component={SignUpConsent}/>
      <Route path="/SignUpDetail" component={SignUpDetail}/>
      <Route path="/LogIn" component={LogIn}/>
      <Route path="/Products" component={Products}/>
    </>
  );
}

export default App;
