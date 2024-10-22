/*
 * @Author: shengqun.zhu shengqun2022@gmail.com
 * @Date: 2024-10-18 16:50:01
 * @LastEditors: shengqun.zhu shengqun2022@gmail.com
 * @LastEditTime: 2024-10-20 22:24:41
 * @FilePath: /web3-travel/src/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider} from "react-router-dom"
import './index.css';
import router from './router'
import Header from './components/TvHeader'
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import store, { persistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react';

import {} from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <div className='width-100 flex justify-center project-container'>
            <div className='app'>
                <Header router={router} />
                <RouterProvider router={router} />
            </div>
        </div>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
