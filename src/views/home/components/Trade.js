/*
 * @Author: shengqun.zhu shengqun2022@gmail.com
 * @Date: 2024-09-19 16:30:16
 * @LastEditors: shengqun.zhu shengqun2022@gmail.com
 * @LastEditTime: 2024-10-20 15:32:55
 * @FilePath: /myapp/front/src/views/Mine.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import React from 'react';
import { useNavigate } from "react-router-dom"
import {  List } from 'antd';
import "./trade.css"
const App = () => {
  const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ];
  const navigate = useNavigate()
  return  <List
    size="large"
    header={<div>Header</div>}
    footer={<div>Footer</div>}
    bordered
    dataSource={data}
  renderItem={(item) => <List.Item>{item}</List.Item>}
/>
};
export default App;