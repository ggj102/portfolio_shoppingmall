import React from 'react'
import '../../../css/ListViewType.css'

function ListViewTypeB({arr,saleCal})
{
    return(        
        <li className="list_typeB">
            <a href="#">
                <div className="item_imgB"><img  src={arr.thumb_image ? arr.thumb_image:''} alt="img"/></div>
                <strong className="item_titleB">{arr.name}</strong>
                <div className="area_priceB">
                    <strong className="itme_priceB">{arr.price}원</strong>
                    {arr.original_price ?
                    <>    
                    <strong className="itme_original_priceB">{arr.original_price}원</strong>
                    <strong className="itme_saleB">{saleCal(arr.price,arr.original_price)}%</strong>
                    </>:''}
                </div>
                <p className="item_textB">친구들 다 같이 모여봐요 동물의 숲이에요^^ 즐거운 시간을 보내세요</p>
            </a>
            <div className="area_flagB">
                {arr.is_best ? <div className="flag_bestB">BEST</div> : ''}
                {arr.is_new ? <div className="flag_newB">NEW</div> : ''}
            </div>
            {arr.review_count > 0 ?                 
            <div className="area_estimaionB">
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
             <div className="soldoutB">
                <div className="soldout_boxB">
                    SOLDOUT
                </div>
            </div> : ''}
        </li>)
}

export default ListViewTypeB;