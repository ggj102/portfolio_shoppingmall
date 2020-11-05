import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Cart from '../component/Cart';
import CategoryPrdList from '../component/ProductsList/CategoryPrdList';
import LogIn from '../component/LogIn';
import Products from '../component/Products';
import SearchPrdList from '../component/ProductsList/SearchPrdList';
import SignUpConsent from '../component/SignUpConsent';
import SignUpDetail from '../component/SignUpDetail';
import MainPage from './MainPage';
import { gMemberId,gMemberName } from '../store/modules/GlobalData.js'
import { ShoppingMallMainDataAxios } from '../component/AxiosLink';

function ShoppingMallMain({gMemberId,gMemberName})
{
    useEffect(()=>{
      ShoppingMallMainDataAxios().then((response)=>{
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

    return(
      <>
        <Route path="/SignUpConsent" component={SignUpConsent}/>
        <Route path="/ShoppingMallMain" component={ShoppingMallMain}/>
        <Route path="/SignUpDetail" component={SignUpDetail}/>
        <Route path="/LogIn" component={LogIn}/>
        <Route path="/Cart" component={Cart}/>
        <Route path="/Products/:id" component={Products}/>
        <Route path="/CategoryPrdList/:id" component={CategoryPrdList}/>
        <Route path="/SearchPrdList/:data" component={SearchPrdList}/>
        <Route exact path="/" component={MainPage}/>
      </>
    )
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
)(ShoppingMallMain);
