import React from 'react'
import { NavLink } from 'react-router-dom';
import '../../../css/ListViewType.css'

function ListViewTypeA({arr,saleCal})
{
    return(   
        <li className="list_typeA">
            <NavLink to={"/Products/"+arr.id}>
                <div className="item_imgA"><img  src={arr.thumb_image ? arr.thumb_image:''} alt="img"/></div>
                <div className="item_infoA">
                    <div className="align_wrapA">
                        <div className="align_boxA">
                            <strong className="item_titleA">{arr.name}</strong>
                            <p className="item_textA">친구들 다 같이 모여봐요 동물의 숲이에요^^ 즐거운 시간을 보내세요</p>
                            <div className="area_priceA">
                                <strong className="itme_priceA">
                                    <span className="price_text1">{arr.price}</span>
                                    <span className="price_text2">원</span> 
                                </strong>
                                {arr.original_price ?
                                <>    
                                <strong className="itme_original_priceA">
                                    <span className="price_text1">{arr.original_price}</span>
                                    <span className="price_text2">원</span>
                                </strong>
                                <strong className="itme_saleA">{saleCal(arr.price,arr.original_price)}%</strong>
                                </>:''}
                                {arr.sold_out ?           
                                <div className="soldoutA">
                                    <div className="soldout_boxA">
                                    SOLDOUT
                                    </div>
                                </div> : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </NavLink>
            <div className="area_flagA">
                        {arr.is_best ? <div className="flag_bestA">BEST</div> : ''}
                        {arr.is_new ? <div className="flag_newA">NEW</div> : ''}
            </div>
            {arr.review_count > 0 ?                 
            <div className="area_estimaionA">
                <span className="label">리뷰</span>
                <span className="count">{arr.review_count}</span>
                <span className="label">평점</span>
                <span className="count">
                    {arr.review_score}
                    <span className="slash">/</span>
                    5
                </span>
            </div>: ''}
        </li>)
}

export default ListViewTypeA;