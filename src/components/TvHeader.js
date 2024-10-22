/*
 * @Author: shengqun.zhu shengqun2022@gmail.com
 * @Date: 2024-09-19 16:30:16
 * @LastEditors: shengqun.zhu shengqun2022@gmail.com
 * @LastEditTime: 2024-10-22 15:53:03
 * @FilePath: /myapp/front/src/views/Mine.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import React, { useEffect ,useState} from "react";
import { ethers } from 'ethers';
import './header.css'
import { Button, Dropdown,Space,Spin} from "antd";
import {useDispatch,useSelector} from 'react-redux'
import { fetchWallet,updateConnetStatus } from '../redux/slice/common'
const App = (router) => {
  const dispatch = useDispatch()
  const common = useSelector(state=> state.common)
  const [spinning, setSpinning] = React.useState(false);
  const initWallet= async ()=> {
    setSpinning(true)
    // 创建一个新的 provider 实例
    const provider = new ethers.BrowserProvider(window.ethereum);
    // 获取签名者（用户的账户）
    const signer = await provider.getSigner();
    // 获取钱包地址
    const address = await signer.getAddress();
    // 获取钱包余额
    const balance = await provider.getBalance(address)
    const params= {
        account: address,
        provider:provider,
        signer:signer,
        balance:balance
    }
    dispatch(fetchWallet(params))
    dispatch(updateConnetStatus(true))
    setTimeout(()=> {
      setSpinning(false)
    },1000)
  }
  const connectWallet = async () => {
    setSpinning(true)
    // 检查用户是否安装了 MetaMask 或其他以太坊钱包扩展
    if (typeof window.ethereum !== 'undefined') {
      try {
        // 请求用户连接钱包
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if(accounts.length> 0) {
          initWallet()
        }
      } catch (error) {
        console.error('User rejected the connection request:', error);
        setSpinning(false)
      }
    } else {
      console.error('No wallet detected! Please install MetaMask or another wallet.');
      setSpinning(false)
    }
  }
  const disconnetWallet = async () => {
    setSpinning(true)
    const params= {
      account: "",
      provider:null,
      signer:null, 
    }
    dispatch(fetchWallet(params))
    dispatch(updateConnetStatus(false))
    setTimeout(()=> {
      setSpinning(false)
    },1000)
  }
  const handleNavigate = () => {
    router.router.navigate('/mine');
  };
  const toHome = () => {
    router.router.navigate('/');
  };
  const items = [
    {
      label: <div onClick={handleNavigate}>我的账户</div>,
      key: '1',
    },
    {
      label: <div onClick={disconnetWallet}>断开链接</div>,
      key: '2',
    },
  ];
  return (
    <div>
      <Spin spinning={spinning} fullscreen />
      <div className="flex justify-between items-center header">
      <img alt="insights-logo" src="https://www.web3insights.news/insights-logo.svg" height="40" onClick={toHome} />
      {common.connected ?
        <Dropdown
          menu={{
            items,
          }}
          trigger={['click']}
        >
            <Space>
            <Button className="account text-line-1">{common.account}</Button>
            </Space>
        </Dropdown> : <Button type="primary" onClick={connectWallet}>链接钱包</Button>}
    </div>
    </div>
  );
};
export default App;
