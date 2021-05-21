import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/Login.css'
import { connect } from 'react-redux';
import { gMemberId, gMemberName, gLoginState } from '../store/modules/GlobalData.js'
import { LoginPostAxios } from './common/api.js';

function LogIn(props)
{
    const {history,gMemberId,gMemberName, loginState} = props;
    const [inputId,setInputId] = useState('');
    const [inputPw,setInputPw] = useState('');

    const onChangeId = (e) =>{
        setInputId(e.target.value);
    }

    const onChangePw = (e) =>{
        setInputPw(e.target.value);
    }

    // 입력한 id,pw를 서버에 post 함
    const loginPost = () =>{
        LoginPostAxios(inputId,inputPw).then((response)=>{
            if(response.data.result === 0)
            {
                loginState(true);
                gMemberId(response.data.user_data.id);
                gMemberName(response.data.user_data.name)
                history.push('/');
            }
            else if(response.data.result === 100)
            {
                history.push('/');
            }
            else if(response.data.result === 101)
            {
                alert("아이디 혹은 비밀번호가 잘못되었습니다.")
            }
        })
    }

    return(
        <div className="login">
            <div className="header">
                <NavLink to="/" className="title">로그인페이지(홈으로)</NavLink>
            </div>
            <div className="container">
                <div className="content">
                    <div className="loginForm">
                        <div className="id">
                            <div className="inputRow">
                                <span className="inputBox">
                                    <input 
                                    className="idInput" 
                                    placeholder="아이디"
                                    onChange={onChangeId}/>
                                </span>
                            </div>
                        </div>
                        <div className="password">
                            <div className="inputRow">
                                <span className="inputBox">
                                    <input 
                                    type="password"
                                    className="passwordInput" 
                                    placeholder="비밀번호"
                                    onChange={onChangePw}/>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="loginBtn" onClick={loginPost}>로그인</div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state =>({

})

const mapDispatchToProps = dispatch =>({
    gMemberId: id => dispatch(gMemberId(id)),
    gMemberName: name => dispatch(gMemberName(name)),
    loginState:  state => dispatch(gLoginState(state))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LogIn);