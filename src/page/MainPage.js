import React, { useEffect, useState } from 'react';
import '../css/MainPage.css'
import MainPageBestPrd from '../component/mainpage/MainPageBestPrd';
import MainPageAllPrd from '../component/mainpage/MainPageAllPrd';
import MainPageHeader from '../component/mainpage/MainPageHeader';

function MainPage()
{
    return(
        <div className="main_page">
            <MainPageHeader/>
            <div className="main_content">
                <MainPageBestPrd/>
                <MainPageAllPrd/>
            </div>
        </div>
    )
}

export default MainPage;