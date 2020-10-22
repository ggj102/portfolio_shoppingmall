import React, { useEffect, useState } from 'react'
import '../css/ProductsList.css'
import Axios from 'axios';
import ListViewTypeA from '../productslistviewoption/ListViewTypeA';
import ListViewTypeB from '../productslistviewoption/ListViewTypeB';
import ListViewTypeC from '../productslistviewoption/ListViewTypeC';
import ListViewTypeD from '../productslistviewoption/ListViewTypeD';


// ctegoryPrdList, searchPrdList 의 기본이 되는 컴포넌트
// 실질적으로 이 컴포넌트는 사용하지 않음

function ProductsList({searchData,categoryIdData})
{
    const [listData,setListData] = useState({});
    const [listItemData,setListItemData] = useState([]);
    const [listViewOption,setListViewOption] = useState(2);
    const [test,setTest] = useState([1,2,3,4]);
    const [pageFocus,setPageFocus] = useState(1);
    const [sortType,setSortType] = useState('popular');
    const [nowPage,setNowPate] = useState(1);
    const [perPage,setPerPage] = useState(40);

    const sortTypeArr = [{type:"popular",title:"인기도순"},
                        {type:"total_sale",title:"누적판매순"},
                        {type:"low_price",title:"낮은가격순"},
                        {type:"recent",title:"최신등록순"},
                        {type:"review_count",title:"리뷰많은순"},
                        {type:"review_score",title:"평점높은순"},]
 
    useEffect(()=>{        
        if(searchData)
        {
            Axios.get('http://lab.usagi.space/portfolio/search?query='+searchData,{
                params:{
                    sort_type: sortType,
                    page: nowPage,
                    per_page: perPage,
                }
            }).then((response)=>{
            setListData(response.data);
            setListItemData(response.data.item_list);
            })
        }
        else{
            Axios.get('http://lab.usagi.space/portfolio/category/'+categoryIdData,{
                params:{
                    sort_type: sortType,
                    page: nowPage,
                    per_page: perPage,
                }
            }).then((response)=>{
            setListData(response.data);
            setListItemData(response.data.item_list);
            })
        }

    },[sortType,nowPage,perPage,searchData,categoryIdData])

    const saleCal = (price1,price2) =>{
        const cal = price2 - price1;
        const cal2 = cal/(price2/100);
        return parseInt(cal2);
    }

    const onSort = (type) =>{
        setSortType(type);
    }

    const sortMap = sortTypeArr.map((arr)=>{
        return(
            <li>
            <a href="#" className={sortType === arr.type ? "sort_focus" : "sort_tab"} 
            onClick={()=>{onSort(arr.type)}}>
             {sortType === arr.type && <span>V</span>}
                {arr.title}</a>
            </li>
        )
    })

    const onlistViewOption = (num) =>{
        setListViewOption(num);
    }

    const itemList = listItemData.map((arr)=>{
        if(listViewOption === 1)
        {
          return  <ListViewTypeA arr={arr}/>
        }
        else if(listViewOption === 2)
        {
          return  <ListViewTypeB arr={arr}/>
        }
        else if(listViewOption === 3)
        {
          return  <ListViewTypeC arr={arr}/>
        }
        else if(listViewOption === 4)
        {
          return  <ListViewTypeD arr={arr}/>
        }
    })

    const onPerPage = (e) =>{
        setPerPage(e.target.options[e.target.selectedIndex].value);
    }

    const onPageFocus = (num) =>{
        setNowPate(num);
        setPageFocus(num);
    }

    const paginationMap = test.map((arr,index)=>{
        return(
            <a href="#" className={pageFocus === index+1 ? "page_focus" : 'page_unfocus'} 
                onClick={()=>onPageFocus(index+1)}>{index+1}</a>
        )
    })

    return(
        <div className="content_productsList">
            <div className="category_list">
                <div className="list_title">
                    <h3>
                        <span>{listData.title}</span>
                    </h3>
                    <div className="category_route">
                        <ul>
                            <li>
                                <a href="#" className="route_text">홈</a>
                                <span className="arrow_mark">{'>'}</span>
                            </li>
                            <li>
                                <a href="#" className="route_text2">Nintendo Switch(29)</a>
                                <span className="arrow_mark">{'>'}</span>
                            </li>
                            <li>
                                <a href="#" className="route_text">전체</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="list_sort">
                    <ul>
                        {sortMap}
                    </ul>
                    
                    <div className="sort_option">
                        <div className="sort_selectBox">
                            <select value={perPage} onChange={onPerPage}>
                                <option value="20">20개씩 보기</option>
                                <option value="40">40개씩 보기</option>
                                <option value="60">60개씩 보기</option>
                                <option value="80">80개씩 보기</option>
                            </select>
                        </div>
                        
                        <div className="sort_view_type">
                            <ul>
                                <li className={listViewOption === 1 ? "option_tab_focus" : ''} onClick={()=>onlistViewOption(1)}>A</li>
                                <li className={listViewOption === 2 ? "option_tab_focus" : ''} onClick={()=>onlistViewOption(2)}>B</li>
                                <li className={listViewOption === 3 ? "option_tab_focus" : ''} onClick={()=>onlistViewOption(3)}>C</li>
                                <li className={listViewOption === 4 ? "option_tab_focus" : ''} onClick={()=>onlistViewOption(4)}>D</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="item_list">
                    <ul>
                        {itemList}
                        {itemList}
                        {itemList}
                        {itemList}
                    </ul>
                </div>

                <div className="pagination">
                    {paginationMap}
                </div>
                
            </div>
        </div>
    )
}

export default ProductsList;