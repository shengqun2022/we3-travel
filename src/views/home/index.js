/*
 * @Author: shengqun.zhu shengqun2022@gmail.com
 * @Date: 2024-09-19 16:30:16
 * @LastEditors: shengqun.zhu shengqun2022@gmail.com
 * @LastEditTime: 2024-10-22 10:47:08
 * @FilePath: /myapp/front/src/views/Mine.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import React, { useEffect } from 'react';
import { Tabs } from 'antd';
import { useNavigate,useLocation,useHistory } from "react-router-dom"
import News from './components/News'
import Create from './components/Create'
import Trade from './components/Trade'
import "./home.css"
const App = () => {
  const navigate = useNavigate()
  const location = useLocation();
  useEffect(()=> {
     console.log(location,'location')
  },[])
  const onChange = (key) => {
    
    // history.push(`${history.location.pathname}#home`);
    // navigate('/mine', { replace: false })
  };
  const items = [
    {
      key: '/',
      label: '新闻',
      children: <News/>,
    },
    {
      key: '/#/create',
      label: '创建攻略',
      children: <Create/>,
    },
    {
      key: '/#/mine',
      label: '我的攻略',
      children:<Trade/>,
    },
  ];
  return  <Tabs className='home' defaultActiveKey="1" centered={true} items={items} onChange={onChange} />;
};
export default App;