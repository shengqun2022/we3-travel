/*
 * @Author: shengqun.zhu shengqun2022@gmail.com
 * @Date: 2024-09-19 16:30:16
 * @LastEditors: shengqun.zhu shengqun2022@gmail.com
 * @LastEditTime: 2024-10-30 17:23:07
 * @FilePath: /myapp/front/src/views/Mine.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import React, { useEffect } from 'react';
import { Divider, Tabs } from 'antd';
import { useNavigate,useLocation, useHistory,Route, Routes, Link  } from "react-router-dom"
import News from '../news'
import Create from './components/Create'
import Trade from '../trade'
import "./home.css"
const App = () => {
  const navigate = useNavigate()
  const location = useLocation();
  useEffect(()=> {
     console.log(location,'location')
  },[])
  const tabChange = (item) => {
    // history.push(item.key);
    navigate(item.key, { replace: false })
  };
  const items = [
    {
      key: '/',
      label: '新闻',
    },
    {
      key: '/create',
      label: '创建攻略',
    },
    {
      key: '/trade',
      label: '交易市场',
    },
  ]; 
  const listNode = items.map(item=> {
     return  <li  >
      <Link to={item.key}>{item.label}</Link>
     </li>
  })
  return   <div>
      <ul>
       {listNode}
      </ul>
      <Routes>
        <Route path="/" element={<News/>} />
        <Route path="/create" element={<Create/>}/>
        <Route path="/trade" element={<Trade/>} />
      </Routes>
  </div>
};
export default App;