import React from 'react';
import { NavLink } from 'react-router-dom';

function ShoppingMallMain()
{
    return(
        <div>
            <div>
                <NavLink to="/SignUpConsent">회원가입</NavLink>
            </div>

            <div>
                <NavLink to="/LogIn">로그인</NavLink>
            </div>
            <div>
                <NavLink to="/Products">제품</NavLink>
            </div>
        </div>
    )
}

export default ShoppingMallMain;