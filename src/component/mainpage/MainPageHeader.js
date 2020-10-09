import React, { useEffect, useState } from 'react';
import '../../css/MainPage.css'
import Axios from 'axios';
import { NavLink, withRouter } from 'react-router-dom';

function MainPageHeader({history})
{
    const [headerData,setHeaderData] = useState({});
    const [categoryData,setCategoryData] = useState([]);
    const [subCategoryData,setSubCategoryData] = useState([]);
    const [subData1,setSubData1] = useState([]);
    const [subData2,setSubData2] = useState([]);
    const [subData3,setSubData3] = useState([]);
    const [depthNum,setdepthNum] = useState({depth1:0, depth2:false, depth3:false})
    const [inputValue,setInputValue] = useState('');
    const [searchData,setSearchData] = useState('');
    const [categoryIdData,setCategoryIdData] = useState(0);

    useEffect(()=>{
        Axios.get('http://lab.usagi.space/portfolio/header').then((response)=>{
            console.log(response.data);
            setHeaderData(response.data);
            setCategoryData(response.data.category_list.category_list);
            setSubCategoryData(response.data.category_list.subcategory_list)
        })
    },[])

    const onHome = () =>{
        setInputValue('');
        setSearchData('');
        setCategoryIdData(0);
    }

    const onInputChange = (e) =>{
        setInputValue(e.target.value);
    }

    const searchDelete = () =>{
        setSearchData('');
        setInputValue('');
    }

    const onSearch = () =>{
        setSearchData(inputValue);
        history.push('/SearchPrdList/'+inputValue);
    }

    const onCategory = (id) =>{
        setSearchData('');
        setInputValue('');
        setCategoryIdData(id)
    }

    const onSearchKey = (e)=>{
        if(e.key === 'Enter')
        {
            setSearchData(inputValue);
            history.push('/SearchPrdList/'+inputValue);
        }
    }
    const categoryMouseOver = (id,num) =>{
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

    const subDataMap = (data,num) =>{
        return(
            <div className="categoryMouseOver_list">
                <ul>
                    {data.map((sub)=>{
                        return(
                            <li className="category_name2" 
                                onMouseEnter={()=>categoryMouseOver(sub.id,num)}
                                onClick={()=>{onCategory(sub.id)}}
                            ><NavLink to={"/CategoryPrdList/"+sub.id}>{sub.name}</NavLink></li>
                        )
                    })}
                </ul>
            </div>
        )
    }

    const categoryMap = categoryData.map((arr)=>{
        return(
            <li className="category_inner_li" 
                onMouseLeave={categoryMouseOut}
                onClick={()=>{onCategory(arr.id)}}>
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
                                        <a href="#">
                                            <span>찜한 스토어</span>
                                        </a>
                                    </li>

                                    <li>
                                        <a href="#">
                                            <span>마이페이지</span>
                                        </a>
                                    </li>

                                    <li>
                                        <NavLink to="/Cart">
                                            <span>장바구니</span>
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="shop_area">
                        <div className="title">
                            <NavLink to="/MainPage" onClick={onHome}>{headerData.title}</NavLink> 
                        </div>
                        <div className="search_area">
                            <input className="search_input" value={inputValue} 
                                onChange={onInputChange}
                                onKeyPress={onSearchKey}
                            />
                            <div className="search_button_area">
                                {searchData && <button className="x_btn" onClick={searchDelete}>X</button>}
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
                                <a href="#">전체상품</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default withRouter(MainPageHeader);