import React from 'react'
import '../../css/ProductsList.css'
import { SearchPrdListAxios } from '../common/api';
import PrdList from './PrdList';

function SearchPrdList({match})
{
    const sortTypeArr = [{type:"popular",title:"정확도순"},
                        {type:"low_price",title:"낮은가격순"},
                        {type:"low_price",title:"높은가격순"},
                        {type:"recent",title:"최신등록순"},
                        {type:"review_count",title:"리뷰많은순"},]
 
    return(
        <PrdList 
        sortTypeArr = {sortTypeArr}
        ListAxios = {SearchPrdListAxios}
        data = {match.params.data}
        listType= {"search"}
    />
    )
}

export default SearchPrdList;