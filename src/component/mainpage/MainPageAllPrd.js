import React, { useEffect, useState } from 'react';
import '../../css/MainPage.css'
import Axios from 'axios';
import { NavLink } from 'react-router-dom';

function MainPageAllPrd()
{
    const [itemList, setItemList] = useState([]);
    const [sortType,setSortType] = useState("recommend");

    const sortTypeArr = [{type:"recommend",title:"판매자추천순"},
                        {type:"popular",title:"인기도순"},
                        {type:"review_score",title:"평점높은순"},
                        {type:"recent",title:"최신등록순"}]

    useEffect(()=>{
        Axios.get('http://lab.usagi.space/portfolio/products',
        {
            params:{
                sort_type: sortType,
            }
        }).then((response)=>{
            setItemList(response.data.item_list);
        })
    },[sortType])

    //할인가 계산 함수
    const saleCal = (price1,price2) =>{
        const cal = price2 - price1;
        const cal2 = cal/(price2/100);
        return parseInt(cal2);
    }

    // 상품 리스트 맵
    const itemListMap = itemList.map((arr)=>{
        return(
            <li key={arr.id} className="allprd_list_li">
                <NavLink  to={"/Products/"+arr.id} className="allprd_list_atag">
                    <div className="allprd_list_thumbnail">
                        <img src={arr.thumb_image} alt="img"/>
                    </div>
                    <strong className="allprd_list_title">
                        {arr.name}
                    </strong>
                    <div className="allprd_list_price_area">
                        <strong className="allprd_list_price">
                            <span className="price_num">{arr.price}</span>
                            <span className="price_text">원</span>
                            {arr.original_price ?
                            <>    
                                <strong className="itme_original_priceB">{arr.original_price}원</strong>
                                <strong className="itme_saleB">{saleCal(arr.price,arr.original_price)}%</strong>
                            </>:''}
                        </strong>
                    </div>
                    {arr.text ? 
                    <p className="allprd_list_ptag">한국 정품 닌텐도 스위치 동물의 숲 에디션 새제품 ( 동물의 숲 타이틀은 포함되어 있지 않습니다 ) 기본 구성품</p>
                    : ''}
                
                
                <div className="area_flag">
                    {arr.is_new ? <div className="flag flag_new">NEW</div> : ''}
                    {arr.is_best ?  <div className="flag flag_best">BEST</div> : ''}
                </div>

                {arr.review_count > 0 ? 
                    <div className="allprd_list_estimation">
                    <span className="allprd_list_estimation_text">리뷰</span>
                    <span className="allprd_list_estimation_text2">{arr.review_count}</span>
                    <span className="allprd_list_estimation_text">평점</span>
                    <span className="allprd_list_estimation_text2">
                        {arr.review_score}
                        <span className="slash">/</span>
                        5
                    </span>
                </div> : ''}

                {arr.sold_out ?
                    <div className="soldout_area">
                    <div className="soldout">
                        SOLDOUT
                    </div>
                </div>: ''}
                </NavLink>
            </li>
        )
    })

    // 현재 정렬된 타입 값을 set
    const onSortType = (e,type) =>{
        setSortType(type);
        e.preventDefault();
    }

    // 정렬 맵
    const sortTypeMap = sortTypeArr.map((arr,idx)=>{
        return(
            <li key={idx.toString()} className="allprd_sort_li" onClick={(e)=>{onSortType(e,arr.type)}}>
                <a href="#" className={sortType === arr.type ? "allprd_sort_focus" : "allprd_sort_atag"}>
                    {sortType === arr.type && <span>V</span>}
                    {arr.title}
                </a>
            </li>
        )
    })

    return(
        <div>
            <h4 className="allprd_title">
                <span className="title_inner">상품전체</span>
            </h4>

            <div className="allprd_sort">
                <ul className="allprd_sort_ul">
                    {sortTypeMap}
                </ul>
            </div>

            <div>
                <div className="allprd_list">
                    <ul className="allprd_list_ul">
                       {itemListMap}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default MainPageAllPrd;