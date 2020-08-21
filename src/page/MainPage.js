import React from 'react';
import '../css/MainPage.css'
import MainPageHeader from '../component/mainpage/MainPageHeader';
import MainPageBestPrd from '../component/mainpage/MainPageBestPrd';
import MainPageAllPrd from '../component/mainpage/MainPageAllPrd';

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