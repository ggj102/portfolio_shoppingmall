import React from 'react'
import '../../css/ProductsList.css'
import { CategoryPrdListAxios } from '../common/api.js';
import PrdList from './PrdList';

function CategoryPrdList({match})
{
    const sortTypeArr = [{type:"popular",title:"인기도순"},
                        {type:"total_sale",title:"누적판매순"},
                        {type:"low_price",title:"낮은가격순"},
                        {type:"recent",title:"최신등록순"},
                        {type:"review_count",title:"리뷰많은순"},
                        {type:"review_score",title:"평점높은순"},]
 
    return(
        <PrdList 
            sortTypeArr = {sortTypeArr}
            ListAxios = {CategoryPrdListAxios}
            data = {match.params.id}
            listType = {"category"}
        />
    )
}

export default CategoryPrdList;