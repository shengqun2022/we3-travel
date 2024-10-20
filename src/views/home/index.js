/*
 * @Author: shengqun.zhu shengqun2022@gmail.com
 * @Date: 2024-09-19 16:30:16
 * @LastEditors: shengqun.zhu shengqun2022@gmail.com
 * @LastEditTime: 2024-10-20 16:18:37
 * @FilePath: /myapp/front/src/views/Mine.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import React from 'react';
import { Tabs } from 'antd';
import { useNavigate } from "react-router-dom"
import News from './components/News'
import Create from './components/Create'
import Trade from './components/Trade'
import "./home.css"
const App = () => {
  const navigate = useNavigate()
  const onChange = (key) => {
    // navigate('/mine', { replace: false })
  };
  const items = [
    {
      key: '1',
      label: '新闻',
      children: <News/>,
    },
    {
      key: '2',
      label: '创建攻略',
      children: <Create/>,
    },
    {
      key: '3',
      label: '我的攻略',
      children:<Trade/>,
    },
  ];
  return  <Tabs className='home' defaultActiveKey="1" centered={true} items={items} onChange={onChange} />;
};
export default App;