import React from 'react'
import '../css/ListViewType.css'

function ListViewTypeC({arr})
{
    const saleCal = (price1,price2) =>{
        const cal = price2 - price1;
        const cal2 = cal/(price2/100);
        return parseInt(cal2);
    }

    return(      
        <li className="list_typeC">
            <a href="#">
                <div className="item_imgC"><img  src={arr.thumb_image ? arr.thumb_image:''} alt="img"/></div>
                <strong className="item_titleC">{arr.name}</strong>
                <div className="area_priceC">
                    <strong className="itme_priceC">
                        <span className="price_text1">{arr.price}</span>
                        <span className="price_text2">원</span> 
                    </strong>
                    {arr.original_price ?
                        <>    
                        <strong className="itme_original_priceC">
                            <span className="price_text1">{arr.original_price}</span>
                            <span className="price_text2">원</span>
                        </strong>

                        <strong className="itme_saleC">{saleCal(arr.price,arr.original_price)}%</strong>
                        </>:''}
                </div>
                <p className="item_textC">친구들 다 같이 모여봐요 동물의 숲이에요^^ 즐거운 시간을 보내세요</p>
            </a>
    
            <div className="area_flagC">
                {arr.is_best ? <div className="flag_bestC">BEST</div> : ''}
                {arr.is_new ? <div className="flag_newC">NEW</div> : ''}
            </div>
    
            {arr.review_count > 0 ?                 
            <div className="area_estimaionC">
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
             <div className="soldoutC">
                <div className="soldout_boxC">
                    SOLDOUT
                </div>
            </div> : ''}
        </li>)
}

export default ListViewTypeC;