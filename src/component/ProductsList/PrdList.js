import React, { useEffect, useState } from 'react'
import '../../css/ProductsList.css'
import ListViewTypeA from './productslistviewoption/ListViewTypeA';
import ListViewTypeB from './productslistviewoption/ListViewTypeB';
import ListViewTypeC from './productslistviewoption/ListViewTypeC';
import ListViewTypeD from './productslistviewoption/ListViewTypeD';
import MainPageHeader from '../mainpage/MainPageHeader';

function Pagination({num,nowpage,onpagefocus})
{
    // const pageNum = () =>{

    const pageNumArr = []

    for(let i = 0; i < num; i++)
    {
        pageNumArr.push(<a key={(i+1).toString()} href="#pagenum" className={nowpage === i+1 ? "page_focus" : 'page_unfocus'} 
        onClick={()=>onpagefocus(i+1)}>{i+1}</a>) 
    }

    return pageNumArr;
}

function PrdList({sortTypeArr,ListAxios,data,listType})
{
    const [listData,setListData] = useState({});
    const [listItemData,setListItemData] = useState([]);
    const [listViewOption,setListViewOption] = useState(2);
    const [sortType,setSortType] = useState('popular');
    const [nowPage,setNowPage] = useState(1);
    const [perPage,setPerPage] = useState(40);
    const [pagination,setPagination] = useState();  

    useEffect(()=>{  
        ListAxios(data,sortType,nowPage,perPage).then((response)=>{
            setListData(response.data);
            setListItemData(response.data.item_list);
            setPagination(response.data.total_count < perPage ? 1 : Math.ceil(response.data.total_count/perPage))
            })
            
    },[sortType,nowPage,perPage,data,ListAxios])


    // 할인가 계산
    const saleCal = (price1,price2) =>{
        const cal = price2 - price1;
        const cal2 = cal/(price2/100);
        return parseInt(cal2);
    }

    const onSort = (type) =>{
        setSortType(type);
    }

    // 상단 좌측 타입별 정렬
    const sortMap = sortTypeArr.map((arr,idx)=>{
        return(
            <li key={idx.toString()}>
            <a href="#sort" className={sortType === arr.type ? "sort_focus" : "sort_tab"} 
            onClick={(e)=>{e.preventDefault();onSort(arr.type)}}>
                {sortType === arr.type && <span>V</span>}
                {arr.title}</a>
            </li>
        )
    })

    const onlistViewOption = (num) =>{
        setListViewOption(num);
    }

    // listViewOption값에 따라 보여주는 page 타입이 바뀜
    // 상품 리스트 맵
    const itemList = listItemData.map((arr)=>{
        if(listViewOption === 1)
        {
          return  <ListViewTypeA key={arr.id} arr={arr} saleCal={saleCal}/>
        }
        else if(listViewOption === 2)
        {
          return  <ListViewTypeB key={arr.id} arr={arr} saleCal={saleCal}/>
        }
        else if(listViewOption === 3)
        {
          return  <ListViewTypeC key={arr.id} arr={arr} saleCal={saleCal}/>
        }
        else if(listViewOption === 4)
        {
          return  <ListViewTypeD key={arr.id} arr={arr} saleCal={saleCal}/>
        }

        return 0;
    })

    //현재 페이지에서 보여 줄수 있는 상품의 개수의 값
    //perPage의 기능은 아직 추가되지 않음
    // const onPerPage = (e) =>{
    //     setPerPage(e.target.options[e.target.selectedIndex].value);
    // }

    // 페이지네이션 포커스 
    const onPageFocus = (num) =>{
        setNowPage(num);
    }

    // 임시로 만든 페이지네이션 기능 추가가 더 필요함
    // const paginationMap = test.map((arr)=>{
    //     return(
    //         <a key={arr.toString()} href="#pagenum" className={nowPage === arr ? "page_focus" : 'page_unfocus'} 
    //             onClick={()=>onPageFocus(arr)}>{arr}</a>
    //     )
    // })

    return(
        <div className="listPage">
            <MainPageHeader/>
            <div className="content_productsList">
                <div className="category_list">
                    <div className="list_title">
                        <h3>
                            <span>{listData.title}</span>
                        </h3>
                        <div className="category_route">
                            {listType === "category" &&
                            <ul>
                                <li>
                                    <a href="#route" className="route_text">홈</a>
                                    <span className="arrow_mark">&gt;</span>
                                </li>
                                <li>
                                    <a href="#route" className="route_text2">Nintendo Switch(29)</a>
                                    <span className="arrow_mark">&gt;</span>
                                </li>
                                <li>
                                    <a href="#route" className="route_text">전체</a>
                                </li>
                            </ul>}
                        </div>
                    </div>

                    <div className="list_sort">
                        <ul>
                            {sortMap}
                        </ul>
                        
                        <div className="sort_option">
                            {/* <div className="sort_selectBox">
                                <select value={perPage} onChange={onPerPage}>
                                    <option value="20">20개씩 보기</option>
                                    <option value="40">40개씩 보기</option>
                                    <option value="60">60개씩 보기</option>
                                    <option value="80">80개씩 보기</option>
                                </select>
                            </div> */}
                            
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
                        </ul>
                    </div>

                    <div className="pagination">
                        <Pagination 
                        num = {pagination} 
                        nowpage = {nowPage} 
                        onpagefocus = {onPageFocus}
                        />
                        {/* {()=>{
                            const pageNum = [];

                            for(let i = 1; i < pagination; i++)
                            {
                                pageNum.push(<a key={arr.toString()} href="#pagenum" className={nowPage === arr ? "page_focus" : 'page_unfocus'} 
                                onClick={()=>onPageFocus(arr)}>{arr}</a>) 
                            }
                        }} */}
                    </div>
                    
                </div>
            </div>
        </div>
        
    )
}

export default PrdList;