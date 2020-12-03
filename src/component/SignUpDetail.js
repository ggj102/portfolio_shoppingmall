import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/SignUpDetail.css'
import { SignUpDetailPostAxios } from './common/api.js';

function SignUpDetail({history})
{
    const [idCheck,setIdCheck] = useState({onClick:false, blank:false,form:false,value:''});
    const [pwCheck,setPwCheck] = useState({onClick:false,blank:false,form:false,value:''});
    const [reconfirmCheck,setReconfirmCheck] = useState({onClick:false,blank:false,form:false,value:''});
    const [nameCheck,setNameCheck] = useState({onClick:false,blank:false,form:false,value:''});
    const [birCheck,setBirCheck] = useState({onClick:false,vy:false, mm: false, dd:false, vyValue:'',mmValue:'',ddValue:''});
    const [genderCheck,setGenderCheck] = useState({onClick:false,form:false,value:''});
    const [emailCheck,setEmailCheck] = useState({form:true,value:''});
    const [phoneCheck,setPhoneCheck] = useState({onClick:false,blank:false,form:false,value:''});

    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth()+1;
    let date = today.getDate();

    // 필수정보 경고문
    // 쓰는 부분이 많아 함수로 만들었습니다.
    const necessaryInfo=()=>{
        return(
            <span className="Warning">필수 정보입니다.</span>
        )
    }

    // id 경고문
    const idWarning=()=>{
        if(!idCheck.blank)
        {
            return necessaryInfo();
        }
        else if(!idCheck.form)
        {
            return(
                <span className="Warning">5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.</span>
            )
        }
    }

    // password 경고문
    const pwWarning=()=>{
        if(!pwCheck.blank)
        {
            return necessaryInfo();
        }
        else if(!pwCheck.form)
        {
            return(
                <span className="Warning">8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.</span>
            )
        }
    }

    // password 확인 경고문
    const reconfirmWarning=()=>{
        if(!reconfirmCheck.form)
        {
            return necessaryInfo();
        }
        else if(!reconfirmCheck.blank)
        {
            return(
                <span className="Warning">비밀번호가 일치하지 않습니다.</span>
            )
        }
    }

    // 이름 경고문
    const nameWarning=()=>{
        if(!nameCheck.form)
        {
            return necessaryInfo();
        }
        else if(!nameCheck.blank)
        {
            return(
                <span className="Warning">한글과 영문 대 소문자를 사용하세요.(특수기호, 공백 사용 불가)</span>
            )
        }
    }

    // 생년월일 경고문
    const birWarning=()=>{
        if(!birCheck.vy)
        {
            return <span className="Warning">태어난 년도 4자리를 정확하게 입력하세요.</span>
        }
        else if(!birCheck.mm)
        {
            return <span className="Warning">태어난 월을 선택하세요.</span>
        }
        else if(!birCheck.dd)
        {
            return <span className="Warning">태어난 일(날짜) 2자리를 정확하게 입력하세요.</span>
        }
    }

    // 성별 경고문
    const genderWarning=()=>{
        if(!genderCheck.form)
        {
            return necessaryInfo();
        }
    }

    // email 경고문
    const emailWarning=()=>{
        if(!emailCheck.form)
        {
            return <span className="Warning">이메일 주소를 다시 확인해주세요.</span>
        }
    }

    // 휴대폰 번호 경고문
    const phoneWarning=()=>{
        if(!phoneCheck.blank)
        {
            return necessaryInfo();
        }
        else if(!phoneCheck.form)
        {
            return <span className="Warning">번호를 다시 확인해주세요.</span>
        }
    }

    // id값 check
    const idChange=(e)=>{
        setIdCheck({...idCheck,value:e.target.value})
    }

    // password값 check
    const pwChange=(e)=>{
        setPwCheck({...pwCheck,value:e.target.value})
    }

    // password 확인값 check
    const reconfirmChange=(e)=>{
        setReconfirmCheck({...reconfirmCheck,value:e.target.value})
    }

    // 이름값 check
    const nameChange=(e)=>{
        setNameCheck({...nameCheck,value:e.target.value})
    }

    // 년도값 check
    const birVyChange=(e)=>{
        setBirCheck({...birCheck,vyValue:e.target.value})
    }

    // 월 select값 check
    const birMmChange=(e)=>{

        const targetValue = e.target.options[e.target.selectedIndex].value;
        const stateCopy = {...birCheck};

        if(!targetValue)
        {
            stateCopy.mm = false;
        }
        else if(targetValue)
        {
            if(stateCopy.vy)
            {
                if(parseInt(targetValue) > month)
                {
                    stateCopy.mm = false;
                }
                else{ 
                    stateCopy.mm = true;
                    stateCopy.mmValue = targetValue;
                }
            }
            else{
                stateCopy.mm = true;
                stateCopy.mmValue = targetValue;
            }

            if(stateCopy.mm)
            {
                if(parseInt(targetValue) === month)
                {
                    if(parseInt(stateCopy.ddValue) > date)
                    {
                        stateCopy.dd = false;
                    }
                    else stateCopy.dd = true;
                }
                
            }
        }
        setBirCheck(stateCopy);
    }

    // 일 값 check
    const birDdChange=(e)=>{
        setBirCheck({...birCheck,ddValue:e.target.value})
    }

    // 성별 select 값 check
    const genderChange=(e)=>{
        const stateCopy = {...genderCheck,onClick:true};
        const targetValue = e.target.options[e.target.selectedIndex].value;

        if(!targetValue)
        {
            stateCopy.form = false;
        }
        else if(targetValue)
        {
            stateCopy.form = true;
            stateCopy.value = targetValue;
        }

        setGenderCheck(stateCopy);
    }
    
    // email 값 check
    const emailChange=(e)=>{
        setEmailCheck({...emailCheck,value:e.target.value})
    }

    // 휴대폰 번호 값 check
    const phoneChange=(e)=>{
        setPhoneCheck({...phoneCheck,value:e.target.value})
    }

    // id를 입력 후 onblur로 이벤트 작동
    // scText,noText값이 해당 또는 값이 blank 및 조건의 맞는 길이가 아닐 경우 경고문이 활성화
    const onIdCheck=()=>{
        
        const scText = /[~!@#$%^&*()\-_=+|[\]'";,./<>?:{} ]/
        const noText = /^[ㄱ-ㅎ|가-힣|ㅏ-ㅣ|A-Z]+$/ 
        const stateCopy = {...idCheck,onClick:true};

        if(stateCopy.value === '')
        {
            stateCopy.blank = false;
        }
        else if(stateCopy.value.length > 0)
        {
            if(stateCopy.value.length <= 4 || stateCopy.value.length > 21)
            {
                stateCopy.blank = true;
                stateCopy.form = false;
            }
            else if(scText.test(stateCopy.value) || noText.test(stateCopy.value))
            {
                stateCopy.blank = true;
                stateCopy.form = false;
            }
            else{
                stateCopy.blank = true;
                stateCopy.form = true;
            }
        }
        setIdCheck(stateCopy);
    }

    // password를 입력 후 onblur로 이벤트 작동
    // scText,noNum,noAZ,noaz 값이 없거나 또는 값이 blank 및 조건의 맞는 길이가 아닐 경우 경고문이 활성화
    const onPwCheck=()=>{

        const scText = /[~!@#$%^&*()\-_=+|[\]'";,./<>?:{} ]/
        const noNum = /[0-9]/
        const noAZ = /[A-Z]/
        const noaz = /[a-z]/
        const stateCopy = {...pwCheck,onClick:true};

        // 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.
        if(stateCopy.value === '')
        {
            stateCopy.blank = false;
        }
        else if(stateCopy.value.length > 0)
        {
            if(stateCopy.value.length <= 7 || stateCopy.value.length > 17)
            {
                stateCopy.form = false;
                stateCopy.blank = true;
            }
            else if(!scText.test(stateCopy.value) ||!noNum.test(stateCopy.value)||!noAZ.test(stateCopy.value)||!noaz.test(stateCopy.value))
            {
                stateCopy.form = false;
                stateCopy.blank = true;
            }
            else{
                stateCopy.form = true;
                stateCopy.blank = true;
            }
        }

        setPwCheck(stateCopy);
    }

    // password 확인을 입력 후 onblur로 이벤트 작동
    // password에 입력했던 값이 password확인 값과 일치 하지 않거나 blank일 경우 경고문 활성화
    const onReconfirmCheck=()=>{
        const stateCopy = {...reconfirmCheck,onClick:true};

        if(stateCopy.value === '')
        {
            stateCopy.blank = false;
        }
        else if(pwCheck.value !== stateCopy.value)
        {
            stateCopy.blank = true;
            stateCopy.form = false;
        }
        else{
            stateCopy.blank = true;
            stateCopy.form = true;
        }

        setReconfirmCheck(stateCopy);
    }

    // 이름을 입력 후 onblur로 이벤트 작동
    // scText,noText값이 해당 또는 값이 blank 및 조건의 맞는 길이가 아닐 경우 경고문이 활성화
    const onNameCheck=()=>{

        // 특수기호, 공백 사용 불가
        const scText = /[~!@#$%^&*()\-_=+|[\]'";,./<>?:{} ]/
        const noText = /[ㄱ-ㅎ|ㅏ-ㅣ]/
        const stateCopy = {...nameCheck,onClick:true};

        if(nameCheck.value === '')
        {
            stateCopy.blank = false;
        }
        else if(scText.test(nameCheck.value) || noText.test(nameCheck.value))
        {
            stateCopy.blank = true;
            stateCopy.form = false;
        }
        else{
            stateCopy.blank = true;
            stateCopy.form = true;
        }
        setNameCheck(stateCopy);
    }

    // 년도,일을 입력 후 onblur로 이벤트 작동
    // noText값이 해당 또는 값이 blank 및 조건의 맞는 길이가 아니며 생년월일 3개 중 1개라도 조건에 안 맞을 경우 경고문이 활성화
    const onBirCheck=()=>{
        const noText = /[A-Z|a-z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣|~!@#$%^&*()\-_=+|[\]'";,./<>?:{} ]/
        const zero = '0';
        const stateCopy = {...birCheck,onClick:true};

        if(stateCopy.vyValue.length < 4 // 년도 길이가 4 미만일 경우
            || parseInt(stateCopy.vyValue) < 1900 // 혹은 년도가 1900 미만인 경우
            || parseInt(stateCopy.vyValue) > year) // 현재 년도보다 높을 경우
        {
            stateCopy.vy = false;
        }
        else if(stateCopy.vyValue.length === 4) // 년도 길이가 4인 경우
        {
            if(noText.test(stateCopy.vyValue)) // 숫자가 아닌지 체크
            {
                stateCopy.vy = false;
            }
            stateCopy.vy = true;
        }

        if(stateCopy.vy)
        {
            if(parseInt(stateCopy.mmValue) > month)
            {
                stateCopy.mm = false;
            }
        }

        if(stateCopy.ddValue === '' || stateCopy.ddValue.length > 2 || stateCopy.ddValue.indexOf(zero) === 0 || parseInt(stateCopy.ddValue) > 31)
        {
            stateCopy.dd = false;
        }
        else if(stateCopy.ddValue.length === 1 || stateCopy.ddValue.length === 2)
        {
            if(stateCopy.vy)
            {
                if(stateCopy.mm)
                {
                    if(parseInt(stateCopy.mmValue) === month)
                    {
                        if(parseInt(stateCopy.ddValue) > date)
                        {
                            stateCopy.dd = false;
                        }
                        else stateCopy.dd = true;
                    }
                    else stateCopy.dd = true;
                }
                else stateCopy.dd = true;
            }
            else stateCopy.dd = true;
        }

        setBirCheck(stateCopy);
    }

    // email을 입력 후 onblur로 이벤트 작동
    // emailTextCheck값으로 check하며 email 양식에 적합하지 않을 경우 경고문 활성화
    const onEmailCheck=()=>{
        const emailTextCheck=/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        const stateCopy = {...emailCheck};
     
        if(stateCopy.value === '')
        {
            stateCopy.form = true;
        }
        else if(stateCopy.value.length > 0)
        {
            if(emailTextCheck.test(stateCopy.value))
            {
                stateCopy.form = true;
            }
            else stateCopy.form = false;
        }
        
        setEmailCheck(stateCopy);
    }

    // 휴대폰번호 입력 후 onblur로 이벤트 작동
    // phoneTextCheck값으로 check하며 휴대폰번호 양식에 적합하지 않거나 blank일 경우 경고문 활성화
    const onPhoneCheck=()=>{

        const phoneTextCheck = /^01(?:0|1|[6-9])(?:\d{7}|\d{8})$/;
        const stateCopy = {...phoneCheck,onClick:true};

        if(stateCopy.value === '')
        {
            stateCopy.blank=false;
        }
        else if(stateCopy.value.length > 0)
        {
            if(phoneTextCheck.test(stateCopy.value))
            {
                stateCopy.blank=true;
                stateCopy.form=true;
            }
            else{
                stateCopy.blank=true;
                stateCopy.form=false;
            }
        }

        setPhoneCheck(stateCopy);
    }

    // 회원가입시 가입자의 데이터를 서버로 post함
    // 작업 후 result값이 0일 경우 메인페이지로 이동
    const joinPost = () =>{
        SignUpDetailPostAxios(
            idCheck.value,
            pwCheck.value,
            nameCheck.value,
            birCheck.vyValue,
            birCheck.mmValue,
            birCheck.ddValue,
            genderCheck.value,
            emailCheck.value,
            phoneCheck.value
            ).then((response)=>{
            if(response.data.result !== 0)
            {
                alert(response.data.message);
            }
            else{
                history.push('/')
            }
        })
    }

    // 가입하기 버튼을 클릭 시 동작하며 모든 항목을 검사하고 조건에 충족되지 않는 항목에 경고문을 활성화
    // 모든 항목이 충족 될 경우 joinPost함수를 호출하며 다음 페이지로 넘어감

    const onJoinBtn=()=>{
        setIdCheck({...idCheck,onClick:true});
        setPwCheck({...pwCheck,onClick:true});
        setReconfirmCheck({...reconfirmCheck,onClick:true});
        setNameCheck({...nameCheck,onClick:true});
        setBirCheck({...birCheck,onClick:true});
        setGenderCheck({...genderCheck,onClick:true});
        setPhoneCheck({...phoneCheck,onClick:true});

        if(!idCheck.form || !pwCheck.form || !reconfirmCheck.form || !nameCheck.form || !genderCheck.form || !emailCheck.form || 
           !phoneCheck.form || !birCheck.vy || !birCheck.mm || !birCheck.dd)
           {
              return
           }
        else{
            joinPost();
        }
    }

    return(
        <div>
            <div className="header">
                <NavLink to="/" className="title">회원가입 상세 페이지(홈으로)</NavLink>
            </div>
            <div className="container">
                <div className="content">
                    <div className="contentDetail">
                        <div className="idPw">
                            <div className="contentTitleText">아이디</div>
                            <div className="idBox boxType">
                                <input className="contentInput" onChange={idChange} onBlur={onIdCheck}/>
                                {/* <span className="emailUrl">@naver.com</span> */}
                            </div>
                            {idCheck.onClick ? idWarning() : ''}
                            <div className="contentTitleText">비밀번호</div>
                            <div className="pwBox boxType">
                                <input type="password" className="contentInput" onChange={pwChange} onBlur={onPwCheck}/>
                                {/* <span>자물쇠</span> */}
                            </div>
                            {pwCheck.onClick ? pwWarning() : ''}
                            <div className="contentTitleText">비밀번호 재확인</div>
                            <div className="pwBox boxType">
                                <input type="password" className="contentInput" onChange={reconfirmChange} onBlur={onReconfirmCheck}/>
                                {/* <span>자물쇠확인</span> */}
                            </div>
                        </div>
                        {reconfirmCheck.onClick ? reconfirmWarning() : ''}
                        <div className="privacy">
                            <div className="contentTitleText">이름</div>
                            <div className="nameBox boxType">
                                <input className="contentInput" onChange={nameChange} onBlur={onNameCheck}/>
                            </div>
                            {nameCheck.onClick ? nameWarning() : ''}
                            <div className="contentTitleText">생년월일</div>
                            <div className="bir">
                                <div className="birVy birCommon">
                                    <span className="boxType">
                                        <input className="contentInput" placeholder="년(4자)" onKeyUp={birVyChange} onBlur={onBirCheck}/>
                                    </span>
                                </div>
                                <div className="birMm birCommon">
                                    <span className="boxType">
                                        <select className="contentSel" onChange={birMmChange}>
                                            <option value=''>월</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                        </select>
                                    </span>
                                </div>
                                <div className="birDd birCommon">
                                    <span className="boxType">
                                        <input className="contentInput" placeholder="일" onChange={birDdChange} onBlur={onBirCheck}/>
                                    </span>
                                </div>
                            </div>
                            {birCheck.onClick ? birWarning() : ''}
                        </div>
                        <div className="sex">
                            <div className="contentTitleText">성별</div>
                            <div className="genderBox boxType">
                                <select className="contentSel" onChange={genderChange}>
                                    <option value=''>성별</option>
                                    <option value="M">남자</option>
                                    <option value="F">여자</option>
                                </select>
                            </div>
                        </div>
                        {genderCheck.onClick ? genderWarning() : ''}
                        <div className="email">
                            <div className="contentTitleText">본인 확인 이메일
                                <span className="choiceText">(선택)</span>
                            </div>
                            <div className="emailBox boxType">
                                <input className="contentInput" placeholder="선택입력" onChange={emailChange} onBlur={onEmailCheck}/>
                            </div>
                        </div>
                        {emailWarning()}
                        <div className="mobile">
                            <div className="contentTitleText">휴대전화</div>
                            <div className="boxType">
                                <input className="contentInput" placeholder="- 없이 입력해주세요" onChange={phoneChange} onBlur={onPhoneCheck}/>
                            </div>
                        </div> 
                        {phoneCheck.onClick ? phoneWarning() : ''}
                        <div className="joinBtnArea">
                            <div className="joinBtn btnPrimary" onClick={onJoinBtn}><span>가입하기</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUpDetail;