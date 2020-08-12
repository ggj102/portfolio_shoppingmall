import React from 'react'
import '../css/ListViewType.css'

function ListViewTypeD({arr})
{
    const saleCal = (price1,price2) =>{
        const cal = price2 - price1;
        const cal2 = cal/(price2/100);
        return parseInt(cal2);
    }

    return(      
        <li className="list_typeD">
            <a href="#">
                <div className="img_areaD">
                    <div className="item_imgD"><img  src={arr.thumb_image ? arr.thumb_image:''} alt="img"/></div>
                    <strong className="item_titleD">{arr.name}</strong>
                </div>
                
                <div className="area_priceD">
                    <strong className="itme_priceD">
                        <span className="price_text1">{arr.price}</span>
                        <span className="price_text2">원</span> 
                    </strong>
                    {arr.original_price ?
                        <>    
                        <strong className="itme_original_priceD">
                            <span className="price_text1">{arr.original_price}</span>
                            <span className="price_text2">원</span>
                        </strong>

                        <strong className="itme_saleD">{saleCal(arr.price,arr.original_price)}%</strong>
                        </>:''}
                </div>
                <p className="item_textD">친구들 다 같이 모여봐요 동물의 숲이에요^^ 즐거운 시간을 보내세요</p>
            </a>
    
            <div className="area_flagD">
                {arr.is_best ? <div className="flag_bestD">BEST</div> : ''}
                {arr.is_new ? <div className="flag_newD">NEW</div> : ''}
            </div>
    
            {arr.review_count > 0 ?                 
            <div className="area_estimaionD">
                <span className="label">리뷰</span>
                <span className="count">{arr.review_count}</span>
                <span className="label">평점</span>
                <span className="count">
                    {arr.review_score}
                    <span className="slash">/</span>
                    5
                </span>
            </div>: ''}
    
            {arr.sold_out ?           
             <div className="soldoutD">
                <div className="soldout_boxD">
                    SOLDOUT
                </div>
            </div> : ''}
        </li>)
}

export default ListViewTypeD;