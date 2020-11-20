import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import MainPage from './page/MainPage';
const Root = ()=>(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
)

export default Root;