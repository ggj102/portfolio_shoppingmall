import Axios from 'axios';
import React from 'react';

export function ShoppingMallMainDataAxios(){
    return(
        Axios.get("https://lab.usagi.space/portfolio/user", {
          withCredentials: true,
        })
    )
}

export function MainPageAllPrdAxios(type){
    return(
        Axios.get('http://lab.usagi.space/portfolio/products',
        {
            params:{
                sort_type: type,
            }
        })
    )
}

export function MainPageBestPrdAxios(){
    return(
        Axios.get("http://lab.usagi.space/portfolio/main")
    )
}

export function MainPageHeaderAxios(){
    return(
        Axios.get('http://lab.usagi.space/portfolio/header')
    )
}

export function MainPageHeaderCountAxios(){
    return(
        Axios.get("https://lab.usagi.space/portfolio/cart_count", {
            withCredentials: true,
        })
    )
}

export function MainPageHeaderLogoutAxios(){
    return(
        Axios.get("https://lab.usagi.space/portfolio/logout", {
            withCredentials: true,
        })
    )
}

export function CartDataAxios(){
    return(
        Axios.get('http://lab.usagi.space/portfolio/cart')
    )
}

export function CartListDeleteAxios(id){
    return(
        Axios.delete('http://lab.usagi.space/portfolio/cart',{
                params:{
                    id: id
                }
            })
    )
}

export function CategoryPrdListAxios(id,type,now,per){
    return(
        Axios.get('http://lab.usagi.space/portfolio/category/'+id,{
            params:{
                sort_type: type,
                page: now,
                per_page: per,
            }
        })
    )
}

export function SearchPrdListAxios(data,type,now,per){
    return(
        Axios.get('http://lab.usagi.space/portfolio/search',{
            params:{
                query: data,
                sort_type: type,
                page: now,
                per_page: per,
            }
        })
    )
}

export function LoginPostAxios(id,pw){
    return(
        Axios.post("https://lab.usagi.space/portfolio/login", {
            "id": id,
            "pw": pw
        }, {
            withCredentials: true,
        })
    )
}

export function ProductsDataAxios(id){
    return(
        Axios.get('http://lab.usagi.space/portfolio/product/'+id)
    )
}

export function ProductsCartAddAxios(id,op,prd,delvalue){
    return(
        Axios.post("http://lab.usagi.space/portfolio/cart",{
                    id: id,
                    option: op,
                    add_product: prd,
                    delivery_method: delvalue
            })
    )
}

export function SignUpDetailPostAxios(id,pw,name,vy,mm,dd,gender,email,phone){
    return(
        Axios.post('https://lab.usagi.space/portfolio/join',{
            "id": id,
            "pw": pw,
            "name": name,
            "birth": {
                "year": parseInt(vy),
                "month": parseInt(mm),
                "day": parseInt(dd)
            },
            "gender": gender,
            "email": email,
            "phone_number": phone,
        })
    )
}

function AxiosLink()
{
    return
}

export default AxiosLink;