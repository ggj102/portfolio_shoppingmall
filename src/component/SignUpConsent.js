import React, { useState } from 'react';
import '../css/SignUpConsent.css'
import { NavLink } from 'react-router-dom';

function SignUpConsent()
{
    const [checkCount, setCheckCount] = useState(0);
    const [terms,setTerms] = useState(false);
    const [privacy,setPrivacy] = useState(false);
    const [location,setLocation] = useState(false);
    const [event,setEvent] = useState(false);
    const [warning, setWarning] = useState(false);
    const [nextBtn,setNextBtn] = useState(0);

    // 모두 동의하는 checkbox며 모든 항목이 check됨
    const allCheckSet=(b)=>{
        setTerms(b);
        setPrivacy(b);
        setLocation(b);
        setEvent(b);
    }

    // 모든 항목이 check가 될 경우 allcheck부분 항목 checkbox 활성화
    const onAllCheck=()=>{
        if(checkCount===4)
        {
            setCheckCount(0)
            allCheckSet(false)
            setNextBtn(0)
        }
        else
        {
            setCheckCount(4)
            allCheckSet(true)
            setNextBtn(2)
        } 
    }

    // 이용약관 동의 check
    const onTermsCheck=()=>{
        if(terms)
        {
            setTerms(false);
            setNextBtn(nextBtn-1);
            setCheckCount(checkCount-1)
        }
        else{
            setTerms(true);
            setNextBtn(nextBtn+1)
            setCheckCount(checkCount+1)
        }
    }

    // 개인정보 수집 및 이용에 대한 안내 check
    const onPrivacyCheck=()=>{
        if(privacy)
        {
            setPrivacy(false);
            setNextBtn(nextBtn-1);
            setCheckCount(checkCount-1)
        }
        else{
            setPrivacy(true);
            setNextBtn(nextBtn+1)
            setCheckCount(checkCount+1)
        }
    }

    // 위치정보 이용약관 동의 check
    const onLocationCheck=()=>{
        if(location)
        {
            setLocation(false);
            setCheckCount(checkCount-1)
        }
        else{
            setLocation(true);
            setCheckCount(checkCount+1)
        }
    }

    // 이벤트 등 프로모션 알림 메일 수신 check
    const onEventCheck=()=>{
        if(event)
        {
            setEvent(false);
            setCheckCount(checkCount-1)
        }
        else{
            setEvent(true);
            setCheckCount(checkCount+1)
        }
    }

    // 필수 항목이 check되지 않을 경우 경고문 활성화
    const warningPhrase=()=>{
        return(
            <span className="warning">이용약관과 개인정보 수집 및 이용에 대한 안내 모두 동의해주세요.</span>
        )
    }

    // 확인 버튼 클릭 시 필수 항목이 전부 check되있는지 검사 후 다음 페이지로 넘어감
    const onNext=()=>{
        if(nextBtn < 2)
        {
            setWarning(true);
        }
    }

    return(
        <div className="">
            <div className="header">
                <NavLink to="/" className="title">회원가입 이용약관 페이지(홈으로)</NavLink>
            </div>

            <div className="container">
                <div className="content">
                    <p className="checkAll">
                        <span className="checkAllInput">
                            <input type="checkbox" onChange={onAllCheck}  checked={checkCount === 4 ? true : false}/>
                        </span>
                        <span className="checkAllText">
                            이용약관, 개인정보 수집 및 이용,
                            위치정보 이용약관(선택),
                            <br/>
                            프로모션 안내 메일 수신(선택)에 모두 동의합니다
                        </span>
                    </p>

                    <ul className="consentList">
                        <li>
                            <div className="consentInput">
                                <input type="checkbox" onChange={onTermsCheck} checked={terms}/>
                                <span>
                                    <span className="consentText">이용약관 동의</span> 
                                    <span className="consentNecessary">(필수)</span>
                                </span>
                            </div>
                            <div className="consentBox">
                                <div>이용약관 동의</div>
                            </div>
                        </li>

                        <li>
                            <div className="consentInput">
                                <input type="checkbox" onChange={onPrivacyCheck} checked={privacy}/>
                                <span>
                                    <span className="consentText">개인정보 수집 및 이용에 대한 안내</span> 
                                    <span className="consentNecessary">(필수)</span>
                                </span>
                            </div>
                            <div className="consentBox">
                                <div>개인정보 수집</div>
                            </div>
                        </li>

                        <li>
                            <div className="consentInput">
                                <input type="checkbox" onChange={onLocationCheck} checked={location}/>
                                <span>
                                    <span className="consentText">위치정보 이용약관 동의</span> 
                                    <span className="consentChoice">(선택)</span>
                                </span>
                            </div>
                            <div className="consentBox">
                                <div>위치정보 수집</div>
                            </div>
                        </li>

                        <li>
                            <div className="consentInput">
                                <input type="checkbox" onChange={onEventCheck} checked={event}/>
                                <span>
                                    <span className="consentText">이벤트 등 프로모션 알림 메일 수신</span> 
                                    <span className="consentChoice">(선택)</span>
                                </span>
                            </div>
                        </li>
                    </ul>
                    {warning ? warningPhrase() : ''}
                    <div className="consentBtn">
                        <span>
                            <NavLink to="/" className="cancelBtn consentBtnType">취소</NavLink>
                        </span>
                        <span>
                            <NavLink to={nextBtn === 2 ? "/SignUpDetail":"#"}  className="confirmBtn consentBtnType" onClick={onNext}>확인</NavLink>
                        </span>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default SignUpConsent;