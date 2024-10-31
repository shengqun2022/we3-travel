/*
 * @Author: shengqun.zhu shengqun2022@gmail.com
 * @Date: 2024-10-22 23:24:37
 * @LastEditors: shengqun.zhu shengqun2022@gmail.com
 * @LastEditTime: 2024-10-30 23:46:17
 * @FilePath: /web3-travel/src/components/wallet-option.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState }  from 'react'
import { useNavigate,useLocation } from "react-router-dom";
import { Tabs} from 'antd';
import './tabs.css'
export function TvTabs() {
  const navigate = useNavigate();
  const location = useLocation();
  const [path, setPath] = useState('/');
  React.useEffect(()=> {
    setPath(location.pathname)
    console.log(location.pathname)
  },[])
  // React.useEffect(()=> {
   
  // },[path])

  const onChange= (activeKey)=> {
    navigate(activeKey)
    setPath(activeKey)
  }
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
  return  <Tabs
  activeKey={path}
  centered
  onChange={onChange}
  items={items}></Tabs>
}

