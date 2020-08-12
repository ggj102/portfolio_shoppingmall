import React, { useEffect, useState } from 'react'
import '../css/ProductsList.css'
import Axios from 'axios';
import ListViewTypeA from '../productslistviewoption/ListViewTypeA';
import ListViewTypeB from '../productslistviewoption/ListViewTypeB';
import ListViewTypeC from '../productslistviewoption/ListViewTypeC';
import ListViewTypeD from '../productslistviewoption/ListViewTypeD';

function ProductsList()
{
    const [listData,setListData] = useState({});
    const [listItemData,setListItemData] = useState([]);
    const [listViewOption,setListViewOption] = useState(1);
    const [test,setTest] = useState([1,2,3,4]);
    const [pageFocus,setPageFocus] = useState(1);

    useEffect(()=>{        
        Axios.get(process.env.PUBLIC_URL+'/ProductsListData.json').then((response)=>{
        setListData(response.data);
        setListItemData(response.data.item_list);
    })
    },[])

    const saleCal = (price1,price2) =>{
        const cal = price2 - price1;
        const cal2 = cal/(price2/100);
        return parseInt(cal2);
    }

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

    const onPageFocus = (num) =>{
        setPageFocus(num);
    }

    const paginationMap = test.map((arr,index)=>{
        return(
            <a href="#" className={pageFocus === index+1 ? "page_focus" : 'page_unfocus'} onClick={()=>onPageFocus(index+1)}>{index+1}</a>
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
                        <li>
                            <a href="#" className="sort_tab_focus">
                             <span>V</span>
                                인기도순</a>
                        </li>

                        <li>
                            <a href="#" className="sort_tab ">누적판매순</a>
                        </li>

                        <li>
                            <a href="#" className="sort_tab">낮은가격순</a>
                        </li>

                        <li>
                            <a href="#" className="sort_tab">최신등록순</a>
                        </li>

                        <li>
                            <a href="#" className="sort_tab">리뷰많은순</a>
                        </li>

                        <li>
                            <a href="#" className="sort_tab sort_tab_last">평점높은순</a>
                        </li>
                    </ul>
                    
                    <div className="sort_option">
                        <div className="sort_selectBox">
                            <select>
                                <option>20개씩 보기</option>
                                <option>40개씩 보기</option>
                                <option>60개씩 보기</option>
                                <option>80개씩 보기</option>
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
                        {itemList}
                        {/* {itemList}
                        {itemList}
                        {itemList}
                        {itemList}
                        {itemList}
                        {itemList}
                        {itemList}
                        {itemList}
                        {itemList}
                        {itemList}
                        {itemList}
                        {itemList}
                        {itemList} */}
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