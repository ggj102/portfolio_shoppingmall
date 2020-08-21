import React, { useEffect, useState } from 'react';
import '../../css/MainPage.css'
import Axios from 'axios';

function MainPageAllPrd()
{
    const [itemList, setItemList] = useState([]);

    useEffect(()=>{
        Axios.get(process.env.PUBLIC_URL+'/MainPageData/MainPageAllPrd.json').then((response)=>{
            console.log(response.data);
            setItemList(response.data.item_list);
        })
    },[])

    const saleCal = (price1,price2) =>{
        const cal = price2 - price1;
        const cal2 = cal/(price2/100);
        return parseInt(cal2);
    }


    const itemListMap = itemList.map((arr)=>{
        return(
            <li className="allprd_list_li">
                <a href="#" className="allprd_list_atag">
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
                </a>
                
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
                    <li className="allprd_sort_li">
                        <a href="#" className="allprd_sort_atag allprd_sort_focus">
                            <span>V</span>
                            판매자추천순
                        </a>
                    </li>

                    <li className="allprd_sort_li">
                        <a href="#" className="allprd_sort_atag">
                            인기도순
                        </a>
                    </li>

                    <li className="allprd_sort_li">
                        <a href="#" className="allprd_sort_atag">
                            평점높은순
                        </a>
                    </li>

                    <li className="allprd_sort_li">
                        <a href="#" className="allprd_sort_atag">
                            최신등록순
                        </a>
                    </li>
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