import React, { useEffect, useState } from 'react';
import '../css/Products.css'
import { NavLink } from 'react-router-dom';
import Axios from 'axios';
import Installment from './Installment';

function Products(){

    const [prdData,setPrdData] = useState([]);
    const [categoryList,setCategoryList] = useState([])
    const [deliveryMethod,setDeliveryMethod] = useState([]);
    const [prdImg,setPrdImg] = useState([])
    const [imgState,setImgState] = useState('');
    const [saleInfo,setSaleInfo] = useState([]);
    const [prdOption,setPrdOption] = useState([])
    const [addPrd,setAddPrd] = useState([])
    const [deliverySelValue,setDeliverySelValue] = useState("1")
    const [optionListArr,setOptionListArr] = useState([]);
    const [addPrdListArr,setAddPrdListArr] = useState([]);
    const [totalCount,setTotalCount] = useState(0);
    const [totalPrice,setTotalPrice] = useState(0);
    const [installmentState,setInstallmentState] = useState(false);

    
    const {product_code,product_name,product_price} = prdData;

    useEffect(()=>{
        Axios.get(process.env.PUBLIC_URL+'/ProductsData.json').then((response)=>{
            console.log(response.data);
            setPrdData(response.data);
            setCategoryList(response.data.category_list);
            setPrdImg(response.data.product_image);
            setImgState(response.data.product_image[0].url);
            setSaleInfo(response.data.sale_info);
            setDeliveryMethod(response.data.delivery_method);
            setPrdOption(response.data.option);
            setAddPrd(response.data.add_product);
        })
    },[])

    const imgPaging = prdImg.map((arr)=>{
        if(prdImg.length > 1)
        {
            return(
                <>
                {console.log(arr.url)}
                <span className="_image_box" onMouseOver={()=>onPaging(arr.url)}><img src={arr.url} alt="img"/></span>
                </>
            )
        }
    })
        
    const onPaging = (url) =>{
        setImgState(url);
    }
    

    const Calculator = () =>{
        const optionCountReduce = optionListArr.reduce((acc,arr)=>{
            return acc+arr.count;
        },0)

        const optionPriceReduce = optionListArr.reduce((acc,arr)=>{
            if(arr.add_price)
            {
                return acc+(arr.count*(product_price+arr.add_price));
            }
            else return acc+(arr.count*product_price);
        },0)

        const addPrdCountReduce = addPrdListArr.reduce((acc,arr)=>{
            return acc+arr.count;
        },0)

        const addPrdPriceReduce = addPrdListArr.reduce((acc,arr)=>{
            return acc+(arr.count*arr.price);
        },0)

        setTotalCount(optionCountReduce+addPrdCountReduce);
        setTotalPrice(optionPriceReduce+addPrdPriceReduce);
    }

    const onOptionValue = (data,e) =>{
        const ReselectionFilter = optionListArr.filter((arr)=>{
            return arr.data_id === data;
        })
        
        const ReselectionFilter2 = ReselectionFilter.filter((arr)=>{
            return arr.id === parseInt(e.target.value);
        })

        if(ReselectionFilter2.length)
        {
            return alert('이미 선택한 옵션입니다.');
        }

        if(e.target.value !== '0')
        {
            const copy = [...prdOption]
            const prdFilter = copy.filter((arr)=>{
                return  arr.id === data
            })
            console.log(prdFilter);
         
            const list = prdFilter[0].option_list;
            console.log(list);

            const prdFilter2 = list.filter((arr)=>{
                return arr.id === parseInt(e.target.value);
            })
            

            const filter_list = prdFilter2[0];
            console.log(filter_list);

            if(filter_list.soldout)
            {
                e.target.value = '0';
                return alert('품절인 옵션은 구매하실 수 없습니다.');
            }
            else{
                if(filter_list.add_price)
                {
                    setTotalPrice(totalPrice+product_price+filter_list.add_price);
                }
                else
                {
                    setTotalPrice(totalPrice+product_price);
                }
                    const listMap = prdFilter2.map((arr)=>{
                    return {data_id:data,count:1,...arr};
                })
                
                const prdOp = listMap[0];
                setTotalCount(totalCount+1);
                setOptionListArr([...optionListArr,prdOp])
            }
        }
    }

    
    const onAddPrdValue = (data,e) =>{
        const ReselectionFilter = addPrdListArr.filter((arr)=>{
            return arr.data_id === data;
        })
        
        const ReselectionFilter2 = ReselectionFilter.filter((arr)=>{
            return arr.id === parseInt(e.target.value);
        })

        if(ReselectionFilter2.length)
        {
            return alert('이미 선택한 옵션입니다.');
        }

        if(e.target.value !== '0')
        {
            const copy = [...addPrd]
            const prdFilter = copy.filter((arr)=>{
                return arr.id === data
            })
         
            const list = prdFilter[0].product_list;

            const prdFilter2 = list.filter((arr)=>{
                return arr.id === parseInt(e.target.value);
            })

            const filter_list = prdFilter2[0];

            if(filter_list.soldout)
            {
                e.target.value = '0';
                return alert('품절인 옵션은 구매하실 수 없습니다.');
            }
            else{
                const listMap = prdFilter2.map((arr)=>{
                    return {data_id:data,count:1,...arr};
                })
                
                const prdAdd = listMap[0];
                setTotalCount(totalCount+1);
                setTotalPrice(totalPrice+prdAdd.price);
                setAddPrdListArr([...addPrdListArr,prdAdd])
            }
        }
    }

    const optionList = optionListArr.map((arr,num)=>{
        return(
            <li>
                {console.log()}
                <span className="list_prd">{arr.name}</span>
                <div className="list_count">
                    <button className="delBtn" onClick={()=>onOptionRemove(num)}>X</button>
                    <span className="list_price">{arr.add_price ? arr.count*(arr.add_price + product_price) : arr.count*(product_price)}</span>
                    <div className="list_input" >
                        <button onClick={()=>{onOptionCountMinus(num)}}>-</button>
                        <input  onBlur={(e)=>onOptionCount(e,num)} />
                        <button onClick={()=>{onOptionCountPlus(num)}}>+</button>
                    </div>
                </div>
            </li>
        )
    })

    const addPrdList = addPrdListArr.map((arr,num)=>{
        return(
            <li>
                {console.log()}
                <span className="list_prd">{arr.name}</span>
                <div className="list_count">
                    <button className="delBtn" onClick={()=>onAddPrdRemove(num)}>X</button>
                    <span className="list_price">{arr.count*(arr.price)}</span>
                    <div className="list_input" >
                        <button onClick={()=>{onAddPrdCountMinus(num)}}>-</button>
                        <input value={arr.count} onBlur={(e)=>onAddPrdCount(e,num)}/>
                        <button onClick={()=>{onAddPrdCountPlus(num)}}>+</button>
                    </div>
                    
                </div>
            </li>
        )
    })
    

    const onOptionCount = (e,num) =>{
        if(e.target.value === '0')
        {
            e.target.value= '1';
            alert("1개 이상부터 구매하실 수 있습니다.");
        }

        const countMap = optionListArr.map((arr,arrIndex)=>{
            if(arrIndex === num)
            {
                arr.count = parseInt(e.target.value);
            }
            return arr;
         })
 
        setOptionListArr(countMap);
        Calculator();
   }

    const onAddPrdCount = (e,num) =>{
        // if(e.target.value === '0')
        // {
        //     e.target.value= '1';
        //     alert("1개 이상부터 구매하실 수 있습니다.");
        // }

        const countMap = addPrdListArr.map((arr,arrIndex)=>{
           if(arrIndex === num)
           {
               arr.count = parseInt(e.target.value);
           }
           return arr;
        })
        
        setAddPrdListArr(countMap);
        Calculator();
   }

    const onOptionCountPlus = (num) =>{
        const plusMap = optionListArr.map((arr,arrIndex)=>{
            if(arrIndex === num)
            {
                arr.count+=1;
            }
            return arr;
         })
         
         setOptionListArr(plusMap);
         Calculator();
    }

    const onOptionCountMinus = (num) =>{
        const minusMap = optionListArr.map((arr,arrIndex)=>{
            if(arrIndex === num)
            {
                arr.count-=1
            }
            return arr;
         })
        
         setOptionListArr(minusMap);
         Calculator();
    }

    const onAddPrdCountPlus = (num) =>{
        const plusMap = addPrdListArr.map((arr,arrIndex)=>{
            if(arrIndex === num)
            {
                arr.count+=1
            }
            return arr;
         })
         setAddPrdListArr(plusMap);
         Calculator();
    }

    const onAddPrdCountMinus = (num) =>{
        const minusMap = addPrdListArr.map((arr,arrIndex)=>{
            if(arrIndex === num)
            {
                arr.count-=1
            }
            return arr;
         })
         setAddPrdListArr(minusMap);
         Calculator();
    }

    const onOptionRemove = (num) =>{
        const totalFilter = optionListArr.filter((arr,fil_num)=>{
            return fil_num === num;
        })
        if(totalFilter[0].add_price)
        {
            const plus = totalFilter[0].add_price+product_price;
            setTotalPrice(totalPrice-(totalFilter[0].count*plus));
        }
        else setTotalPrice(totalPrice-(totalFilter[0].count*product_price));

        const removeFilter = optionListArr.filter((arr,fil_num)=>{
            return fil_num !== num;
        })
        setTotalCount(totalCount-totalFilter[0].count);
        
        setOptionListArr(removeFilter);
     }


     const onAddPrdRemove = (num) =>{
        const totalFilter = addPrdListArr.filter((arr,fil_num)=>{
            return fil_num === num;
        })

        const removeFilter = addPrdListArr.filter((arr,fil_num)=>{
            return fil_num !== num;
        })
        setTotalCount(totalCount-totalFilter[0].count);
        setTotalPrice(totalPrice-(totalFilter[0].count*totalFilter[0].price));
        setAddPrdListArr(removeFilter);
     }


    const onDeliverySel=(e)=>{
        setDeliverySelValue(e.target.options[e.target.selectedIndex].value);
    }

    const deliverySel = deliveryMethod.map((arr)=>{
        return <option value={arr.id}>{arr.name}</option>
    })

    const oninstallment = () =>{
        setInstallmentState(true);
    }

    const offinstallment = () =>{
        setInstallmentState(false);
    }
    
    return(
    <div>
        <div id="container">
            <div className=" _category_area h_area h_area_v2">
                <div className="loc">
                    <NavLink to="/">홈</NavLink>
                        <span className="bar">{'>'}</span>
                    {
                        categoryList.map((list,num)=>{
                            if(categoryList.length === num+1)
                            {
                              return <NavLink to={"/category/"+list.id}>{list.name}(총{list.num}개)</NavLink>
                            }
                            else{
                                return (
                                    <>
                                    <NavLink to={"/category/"+list.id}>{list.name}</NavLink>
                                    <span className="bar">{'>'}</span>
                                    </>)}
                            })
                    }
                </div>
            </div>
            <div id="content">
                <div className="_show_area">
                    <div className="prd_detail_basic">
                        <div className="_image view">
                            <div className="bimg">
                                <div className="img_va">
                                    <img src={imgState}  alt="img"/>
                                </div>
                                <div className="ico_goods"></div>
                            </div>

                            <div className="thumbnail_area thmb_lst more">
                                {imgPaging}
                            </div>
                        </div>

                        <div className="info">
                            <div>
                                <div className="_copyable">
                                    <p className="_easy_purchase_hide_area prd_num">
                                        "상품번호 : "
                                        <span className="thm">{product_code}</span>
                                    </p>
                                    <dl className="_easy_purchase_hide_area">
                                        <dt className="prd_name">
                                            <strong>{product_name}</strong>
                                            <em className="sub">플레이스테이션4 프로</em>
                                        </dt>
                                        <dd>
                                            <div className="area_cost">
                                                <strong className="info_cost">
                                                    <span className="price">{product_price}<span>원</span></span>
                                                    {saleInfo.length !== 0 ?
                                                        <> 
                                                        <span className="dc">{saleInfo.discount_percent}</span>
                                                        <span className="ori">{saleInfo.original_price}<span>원</span></span>
                                                        </> : ''
                                                    }
                                                </strong>
                                            </div>
                                            <div className="installment">
                                                <div className="h">무이자할부</div>
                                                <a href="#" className="detailBtn" onClick={oninstallment}>자세히보기</a>
                                            </div>
                                        </dd>
                                    </dl>

                                    {installmentState ?<Installment btn={offinstallment}/> : ''}

                                    <div className="delivery">
                                        <div className="delivery_way">
                                            <span>배송방법</span>
                                            {
                                                deliveryMethod.length === 1 ? 
                                                <span className="text_delivery">택배</span>
                                                : <select onChange={onDeliverySel}>
                                                    {deliverySel};
                                                  </select>}
                                        </div>
                                        {deliverySelValue === "1" ?                            
                                        <div className="delivery_cost">
                                            <span className="delivery_cost_text">배송비</span>
                                            <div className="cost">
                                                <div className="delivery_price">{ (deliveryMethod.length && deliveryMethod[0].price) === 0 ? '무료' : deliveryMethod.length && deliveryMethod[0].price+'원'}</div>
                                                <div className="interval">{deliveryMethod.length && deliveryMethod[0].additional_description}</div>
                                                <div><a href="#" className="saving">배송비 절약상품보기</a></div>
                                            </div>
                                        </div> : ''}
                                    </div>

                                    <div className="prd_option">
                                        <div className="option">
                                            <span>옵션</span>
                                            {
                                                prdOption.map((option_item) => {
                                                    return (
                                                        <select onChange={(e) => onOptionValue(option_item.id, e)}>
                                                            <option value='0'>{option_item.name}</option>
                                                            {
                                                                option_item.option_list.map((list)=>{
                                                                    return <option value={list.id}>{list.name}{list.add_price ? "  ("+list.add_price+"원)추가" : ''} {list.soldout ? "(품절)": ''}</option>
                                                                })
                                                            }
                                                        </select>
                                                    )
                                                })
                                            }
                                        </div>

                                        <div className="add">
                                            <span>추가상품</span>
                                            <div className="select_area">
                                                {
                                                    addPrd.map((addItem) => {
                                                        return (
                                                            <select onChange={(e) => onAddPrdValue(addItem.id, e)}>
                                                                <option value='0'>{addItem.name}</option>
                                                                {
                                                                    addItem.product_list.map((list)=>{
                                                                     return <option value={list.id}>{list.name} {list.price}원 {list.soldout ? "(품절)": ''}</option>
                                                                    })
                                                                }
                                                            </select>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <ul className="purchase_list">
                                        {optionList}
                                        {addPrdList}
                                    </ul>

                                    <div className="total">
                                            <span className="total_count">총 수량 {totalCount}개</span>
                                        <span className="total_cost">
                                            총 상품금액
                                            <span>{totalPrice}원</span>
                                        </span>
                                    </div>

                                    <div className="btn_area">
                                        <div className="buy_btn">
                                            <a href="#">구매하기</a>
                                        </div>

                                        <div className="basket_btn">
                                            <a href="#">장바구니</a>
                                        </div>

                                        <div className="pick_btn">
                                            <a href="#">찜</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        {/* 하단 */}

        <div className="detail_info">
            <div className="tab_area">
                <div className="info_tab">
                    <a href="#">상세정보</a>
                </div>
                <div className="info_tab">
                    <a href="#">Q{'&'}A</a>
                </div>
                <div className="info_tab last_tab">
                    <a href="#">반품/교환정보</a>
                </div>
            </div>

            <div className="prd_info">
                <div className="info_area">
                    <div className="info_title">상품정보</div>
                    <div>
                        <table cellPadding="0" className="info_table">
                        <tr>
                                <th scope="row">
                                    <span>상품상태</span>
                                </th>
                                <td><span>새상품</span></td>

                                <th scope="row">
                                    <span>상품번호</span>
                                </th>
                                <td><span>00000000</span></td>
                        </tr>

                        <tr>
                                <th scope="row">
                                    <span>제조사</span>
                                </th>
                                <td><span>소니</span></td>

                                <th scope="row"><span>브랜드</span></th>
                                <td><span>소니</span></td>
                        </tr>

                        <tr>
                                <th scope="row">
                                    <span>모델명</span>
                                </th>
                                <td><span>플레이스테이션4</span></td>

                                <th scope="row"><span>원산지</span></th>
                                <td><span>일본산</span></td>
                        </tr>
                        </table>
                        <div className="report_info">
                            ※ 상품정보 관련 문의사항은 <a href="#">Q{'&'}A</a>에 남겨주세요.
                        </div>
                    </div>
                </div>

                <div className="info_area">
                    <table className="info_table">
                    <tr>
                        <th scope="row">
                                    <span>기종</span>
                                </th>
                                <td><span>PS4</span></td>

                                <th scope="row">
                                    <span>품목</span>
                                </th>
                                <td><span>게임기</span></td>
                        </tr>

                        <tr>
                                <th scope="row">
                                    <span>네트워크</span>
                                </th>
                                <td><span>유선랜,무선랜n,블루투스4.0</span></td>

                                <th scope="row"><span>해상도</span></th>
                                <td><span>1080p</span></td>
                        </tr>

                        <tr>
                                <th scope="row">
                                    <span>CPU</span>
                                </th>
                                <td><span>옥타코어</span></td>

                                <th scope="row"><span>램</span></th>
                                <td><span>8기가</span></td>
                        </tr>

                        <tr>
                                <th scope="row">
                                    <span>그래픽</span>
                                </th>
                                <td><span>라데온</span></td>

                                <th scope="row"><span>HDD</span></th>
                                <td><span>1테라</span></td>
                        </tr>

                        <tr>
                                <th scope="row">
                                    <span>재생</span>
                                </th>
                                <td><span>DVD, 블루레이</span></td>

                                <th scope="row"><span>부가기능</span></th>
                                <td><span>너무 많음</span></td>
                        </tr>

                        <tr>
                                <th scope="row">
                                    <span>소비전력</span>
                                </th>
                                <td colSpan="3"><span>최대300W</span></td>
                        </tr>
                    </table>
                </div>

                <div className="info_area">
                    <table className="info_table">
                            <tr>
                                <th scope="row">
                                    <span>영수증발급</span>
                                </th>
                                <td colSpan="3"><span>신용카드전표,현금영수증 발급</span></td>
                            </tr>

                            <tr>
                                <th scope="row">
                                    <span>A/S안내</span>
                                </th>
                                <td colSpan="3"><span>너무 길어</span></td>
                            </tr>    
                    </table>
                </div>

                {/* 상품상세정보 */}

                <div className="test_interval"> </div>

                <div className="goods_tag">
                    <h3>Tag</h3>
                    <ul>
                        <li><a href="#">#PS4</a></li>
                        <li><a href="#">#플스게임</a></li>
                        <li><a href="#">#플스타이틀</a></li>
                        <li><a href="#">#플레이스테이션4</a></li>
                        <li><a href="#">#플스악세사리</a></li>
                        <li><a href="#">#ps4신형</a></li>
                    </ul>
                </div>

                <div className="info_area">
                    <div className="info_title">상품정보 제공고시</div>
                    <table className="info_table">
                            <tr>
                                <th scope="row">
                                    <span>품명 / 모델명</span>
                                </th>
                                <td colSpan="3"><span>상품상세 참조 / 상품상세 참조</span></td>
                            </tr>

                            <tr>
                                <th scope="row">
                                    <span>KC 인증 필 유무</span>
                                </th>
                                <td colSpan="3"><span>상품상세 참조</span></td>
                            </tr>

                            <tr>
                                <th scope="row">
                                    <span>정격전압</span>
                                </th>
                                <td colSpan="3"><span>상품상세 참조</span></td>
                            </tr>

                            <tr>
                                <th scope="row">
                                    <span>소비전력</span>
                                </th>
                                <td colSpan="3"><span>상품상세 참조</span></td>
                            </tr>

                            <tr>
                                <th scope="row">
                                    <span>동일모델의 출시 연월</span>
                                </th>
                                <td colSpan="3"><span>상품상세 참조</span></td>
                            </tr>

                            <tr>
                                <th scope="row">
                                    <span>제조자</span>
                                </th>
                                <td colSpan="3"><span>상품상세 참조</span></td>
                            </tr>

                            <tr>
                                <th scope="row">
                                    <span>제조국</span>
                                </th>
                                <td colSpan="3"><span>일본산</span></td>
                            </tr>

                            <tr>
                                <th scope="row">
                                    <span>크기</span>
                                </th>
                                <td colSpan="3"><span>상품상세 참조</span></td>
                            </tr>

                            <tr>
                                <th scope="row">
                                    <span>무게</span>
                                </th>
                                <td colSpan="3"><span>상품상세 참조</span></td>
                            </tr>

                            <tr>
                                <th scope="row">
                                    <span>주요 사양</span>
                                </th>
                                <td colSpan="3"><span>상품상세 참조</span></td>
                            </tr>

                            <tr>
                                <th scope="row">
                                    <span>품질보증기준</span>
                                </th>
                                <td colSpan="3"><span>상품상세 참조</span></td>
                            </tr>

                            <tr>
                                <th scope="row">
                                    <span>A/S 책임자와 전화번호</span>
                                </th>
                                <td colSpan="3"><span>상품상세 참조(00-0000-0000)</span></td>
                            </tr>
                    </table>
                </div>

                <div className="info_area">
                    <div className="info_title">거래조건에 관한 정보</div>
                    <table className="info_table">
                            <tr>
                                <th scope="row">
                                    <span>재화등의 배송방법에 관한 정보</span>
                                </th>
                                <td><span>상품상세 참조 / 상품상세 참조</span></td>
                            </tr>

                            <tr>
                                <th scope="row">
                                    <span>주문 이후 예상되는 배송기간</span>
                                </th>
                                <td><span>상품상세 참조</span></td>
                            </tr>

                            <tr>
                                <th scope="row">
                                    <span>제품하자·오배송 등에 따른 청약철회 등의 경우 청약철회 등을 할 수 있는 기간 및 통신판매업자가 부담하는 반품비용 등에 관한 정보</span>
                                </th>
                                <td><span>상품상세 참조</span></td>
                            </tr>

                            <tr>
                                <th scope="row">
                                    <span>제품하자가 아닌 소비자의 단순변심, 착오구매에 따른 청약철회가 불가능한 경우 그 구체적 사유와 근거</span>
                                </th>
                                <td><span>상품상세 참조</span></td>
                            </tr>

                            <tr>
                                <th scope="row">
                                    <span>재화등의 교환·반품·보증 조건 및 품질보증기준</span>
                                </th>
                                <td><span>상품상세 참조</span></td>
                            </tr>

                            <tr>
                                <th scope="row">
                                    <span>재화등의 A/S 관련 전화번호</span>
                                </th>
                                <td><span>상품상세 참조</span></td>
                            </tr>

                            <tr>
                                <th scope="row">
                                    <span>대금을 환불받기 위한 방법과 환불이 지연될 경우 지연에 따른 배상금을 지급받을 수 있다는 사실 및 배상금 지급의 구체적 조건 및 절차</span>
                                </th>
                                <td><span>일본산</span></td>
                            </tr>

                            <tr>
                                <th scope="row">
                                    <span>소비자피해보상의 처리, 재화등에 대한 불만 처리 및 소비자와 사업자 사이의 분쟁처리에 관한 사항</span>
                                </th>
                                <td><span>상품상세 참조</span></td>
                            </tr>

                            <tr>
                                <th scope="row">
                                    <span>거래에 관한 약관의 내용 또는 확인할 수 있는 방법</span>
                                </th>
                                <td><span>상품상세 참조</span></td>
                            </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Products;