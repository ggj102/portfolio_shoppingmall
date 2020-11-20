import Axios from 'axios';
import React from 'react';

Axios.defaults.baseURL = "https://lab.usagi.space/portfolio/";
Axios.defaults.withCredentials = true;

export function ShoppingMallMainDataAxios(){
    return(
        Axios.get("user")
    )
}

export function MainPageAllPrdAxios(type){
    return(
        Axios.get("products",
        {
            params:{
                sort_type: type,
            }
        })
    )
}

export function MainPageBestPrdAxios(){
    return Axios.get("main")
    
}

export function MainPageHeaderAxios(){
    return Axios.get('header')
    
}

export function MainPageHeaderCountAxios(){
    return(
        Axios.get("cart_count")
    )
}

export function MainPageHeaderLogoutAxios(){
    return(
        Axios.get("logout")
    )
}

export function CartDataAxios(){
    return Axios.get("cart")
    
}

export function CartListDeleteAxios(id){
    return(
        Axios.delete("cart",{
                params:{
                    id: id
                }
            })
    )
}

export function CategoryPrdListAxios(id,type,now,per){
    return(
        Axios.get("category/"+id,{
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
        Axios.get("search",{
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
        Axios.post("login", {
            "id": id,
            "pw": pw
        })
    )
}

export function ProductsDataAxios(id){
    return Axios.get("product/"+id)
    
}

export function ProductsCartAddAxios(id,op,prd,delvalue){
    return(
        Axios.post("cart",{
                    id: id,
                    option: op,
                    add_product: prd,
                    delivery_method: delvalue
            })
    )
}

export function SignUpDetailPostAxios(id,pw,name,vy,mm,dd,gender,email,phone){
    return(
        Axios.post("join",{
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
