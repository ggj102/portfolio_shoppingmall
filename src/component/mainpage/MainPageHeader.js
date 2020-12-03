import React, { useEffect, useState } from 'react';
import '../../css/MainPage.css'
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { gMemberId, gMemberName, gCartCount, gDataReset } from '../../store/modules/GlobalData.js'
import { MainPageHeaderAxios, MainPageHeaderCountAxios, MainPageHeaderLogoutAxios } from '../common/api';

function MainPageHeader(props)
{
    const {history,gName,gCount,gCartCount,gDataReset} = props;
    const [headerData,setHeaderData] = useState({});
    const [categoryData,setCategoryData] = useState([]);
    const [subCategoryData,setSubCategoryData] = useState([]);
    const [subData1,setSubData1] = useState([]);
    const [subData2,setSubData2] = useState([]);
    const [subData3,setSubData3] = useState([]);
    const [depthNum,setdepthNum] = useState({depth1:0, depth2:false, depth3:false})
    const [inputValue,setInputValue] = useState('');
    const [searchData,setSearchData] = useState('');

    // 장바구니 count값을 서버에서 가져오며 result가 -1 일때 재귀함수로 서버에 재요청 함
    const cartCountResponse = () =>{
        MainPageHeaderCountAxios().then((response)=>{
            if(response.data.result === 0)
            {
                gCartCount(response.data.count);
            }
            else if(response.data.result === -1){
                cartCountResponse();
            }
        })
    }

    useEffect(()=>{
        MainPageHeaderAxios().then((response)=>{
            setHeaderData(response.data);
            setCategoryData(response.data.category_list.category_list);
            setSubCategoryData(response.data.category_list.subcategory_list);
        })
    },[]);

    useEffect(cartCountResponse, []);

    const onReset = () =>{
        setInputValue('');
        setSearchData('');
    }

    const onInputChange = (e) =>{
        setInputValue(e.target.value);
    }

    // 로그아웃 서버에 값을 요청하며 작업이 끝난 후 store의 글로벌 데이터 초기화
    const onLogOut = () =>{
        MainPageHeaderLogoutAxios().then(()=>{
            gDataReset();
        })
    }

    // enter key 입력시 inputValue를 검색하는 이벤트 동작
    const onSearchKey = (e)=>{
        if(e.key === 'Enter')
        {
            setSearchData(inputValue);
            history.push('/SearchPrdList/'+inputValue);
        }
    }

    // mouseover 할 경우 카테고리가 단계적으로 활성화 됨
    const categoryMouseOver = (id,num) =>{
        //parent_id가 2개 이상일수도 있으므로 filter로 가공함
        const subfilter =  subCategoryData.filter((arr)=>{
            return arr.parent_id === id;
        })

        if(subfilter.length === 0)
        {
            if(num === 2)
            {
               setSubData2([]);
               setSubData3([]);
               return setdepthNum({...depthNum,depth2:false,depth3:false});
            }
            else if(num === 3)
            {
                setSubData3([]);
                return setdepthNum({...depthNum,depth3:false});
            }
        }
        else{
            if(num === 1)
            {
                setdepthNum({...depthNum,depth1:id,depth2:false,depth3:false});
                setSubData1(subfilter);
            }
            else if(num === 2)
            {
                setdepthNum({...depthNum,depth2:true});
                setSubData2(subfilter);
            }
            else if(num === 3)
            {
                setdepthNum({...depthNum,depth3:true});
                setSubData3(subfilter);
            }
        }
    }

    const categoryMouseOut = () =>{
        setdepthNum({...depthNum,depth1:0,depth2:false,depth3:false});
        setSubData1([]);
        setSubData2([]);
        setSubData3([]);
    }

    // 카테고리 mouseover시 활성화 됬을 때 보여주는 서브 카테고리
    const subDataMap = (data,num) =>{
        return(
            <div className="categoryMouseOver_list">
                <ul>
                    {data.map((sub)=>{
                        return(
                            <li key={sub.id} className="category_name2" 
                                onMouseEnter={()=>categoryMouseOver(sub.id,num)}
                                onClick={()=>{onReset()}}
                            ><NavLink to={"/CategoryPrdList/"+sub.id}>{sub.name}</NavLink></li>
                        )
                    })}
                </ul>
            </div>
        )
    }

    // 상품 카테고리 맵
    const categoryMap = categoryData.map((arr)=>{
        return(
            <li key={arr.id}
                className="category_inner_li" 
                onMouseLeave={categoryMouseOut}
                onClick={()=>{onReset()}}>
                <div className="category_name" onMouseEnter={()=>categoryMouseOver(arr.id,1)}
                ><NavLink to={"/CategoryPrdList/"+arr.id}>{arr.name}</NavLink></div>
            {depthNum.depth1 === arr.id &&
                <div className="mouseOver_area" >
                    <div className="category_depth1">
                        {subDataMap(subData1,2)}
                        {depthNum.depth2 && 
                            <div className="category_depth2">
                                {subDataMap(subData2,3)}
                            {depthNum.depth3 && 
                                <div className="category_depth3">
                                    {subDataMap(subData3,4)}
                                </div>}
                        </div>}
                    </div>
                </div>}
            </li>
        )
    })

    return(
        <div className="layout_header">
            <div className="header_shopping">
                <div className="layout_inner">
                    <div className="globla_area">
                        <div className="header_menu">
                            <div className="menu_area">
                                <ul>
                                    <li>
                                        <a href="#menu">
                                            <span>찜한 스토어</span>
                                        </a>
                                    </li>

                                    <li>
                                        <a href="#menu">
                                            <span>마이페이지</span>
                                        </a>
                                    </li>
                                    <li>
                                        <NavLink to="/Cart">
                                            <span>장바구니{gCount > 0 && "("+gCount+")"}</span>
                                        </NavLink>
                                    </li>
                                    {!gName ? 
                                    <>
                                    <li>
                                        <NavLink to="/Login">
                                            <span>로그인</span>
                                        </NavLink>
                                    </li> 
                                    <li>
                                    <NavLink to="/SignUpConsent">
                                        <span>회원가입</span>
                                    </NavLink>
                                    </li> 
                                    </> :
                                    <>
                                    <li>
                                    <NavLink to="/Login">
                                        <span>{gName+"님"}</span>
                                    </NavLink>
                                    </li>
                                    <li>
                                        <div className="Logout" onClick={onLogOut}>
                                            <span>로그아웃</span>
                                        </div>
                                    </li></>}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="shop_area">
                        <div className="title">
                            <NavLink to="/" onClick={onReset}>{headerData.title}</NavLink> 
                        </div>
                        <div className="search_area">
                            <input className="search_input" value={inputValue} 
                                onChange={onInputChange}
                                onKeyPress={onSearchKey}
                            />
                            <div className="search_button_area">
                                {searchData && <button className="x_btn" onClick={onReset}>X</button>}
                            <NavLink to={"/SearchPrdList/"+inputValue} ><button className="search_btn">검색</button></NavLink> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="category_area">
                <div className="category_inner">
                    <ul className="category_inner_ul">
                        {categoryMap}
                        
                        <li className="category_inner_li">
                            <div className="category_btn">
                                <a href="#allprd">전체상품</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state =>({
    gCount: state.GlobalData.gCount,
    gName: state.GlobalData.gName
})

const mapDispatchToProps = dispatch =>({
    gMemberId: id => dispatch(gMemberId(id)),
    gMemberName: name => dispatch(gMemberName(name)),
    gCartCount: count => dispatch(gCartCount(count)),
    gDataReset: ()=> dispatch(gDataReset()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(MainPageHeader));
