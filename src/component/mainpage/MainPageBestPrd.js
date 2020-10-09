import React, { useEffect, useState } from 'react';
import '../../css/MainPage.css'
import Axios from 'axios';
import { NavLink } from 'react-router-dom';

function MainPageBestPrd()
{
    const [homeData,sethomeData] = useState([])
    const [topData,setTopData] = useState([])
    const [bottomData,setBottomData] = useState([])

    useEffect(()=>{
        Axios.get("http://lab.usagi.space/portfolio/main").then((response)=>{
            console.log(response.data);
            sethomeData(response.data.home_data[0]);
            setTopData(response.data.home_data[0].top_data);
            setBottomData(response.data.home_data[0].bottom_data);
        })
    },[])

    const topDataMap = topData.map((arr)=>{
        return(
            <li>
                <NavLink to={"/Products/"+arr.product_id} className="bestreview_atag">
                    <div className="bestreview_thumbnail">
                        <img src={arr.thumb_image} alt="img"/>
                    </div>

                    <div className="area_stylebox">
                        <div className="area_text">
                            <span>
                                {arr.text}
                            </span>
                        </div>

                        <div className="area_reviewinfo">
                            <span className="text_info">{arr.writer}</span>
                            <span className="text_info text_info2">{arr.date}</span>
                        </div>

                        <div className="product_name">
                            <span>
                               {arr.product_name}
                            </span>
                        </div>
                    </div>
                </NavLink>
            </li>
        )
    })

    const bottomDataMap = bottomData.map((arr)=>{
        return(
            <li>
                <NavLink to={"/Products/"+arr.product_id} className="listview_atag">
                    <div className="bestreview_thumbnail">
                        <img src={arr.thumb_image}/>
                    </div>
                    <p className="bestreview_text">{arr.text}</p>
                    <div className="listview_product_name">
                        <span className="bestreview_text2">{arr.product_name}</span>
                    </div>
                
                <div className="listview_area_reviewinfo">
                    <span className="text_info">{arr.writer}</span>
                    <span className="text_info text_info2">{arr.date}</span>
                </div>
                </NavLink>
            </li>
        )
    })

    return(
        <div className="bestreview_list">
            <h4>
                <span className="bestreview_title">{homeData.title}</span>
            </h4>

            <div className="bestreview_layout_inner">
                <ul className="bestview_list">
                   {topDataMap}
                </ul>

                <div className="list_product_listview_circle">
                    <ul className="listview_list">
                        {bottomDataMap}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default MainPageBestPrd;