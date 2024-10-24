/*
 * @Author: shengqun.zhu shengqun2022@gmail.com
 * @Date: 2024-09-19 16:30:16
 * @LastEditors: shengqun.zhu shengqun2022@gmail.com
 * @LastEditTime: 2024-10-23 23:15:46
 * @FilePath: /myapp/front/src/views/Mine.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import React from "react";
import { ethers } from 'ethers';
import './header.css'
import {useDispatch,useSelector} from 'react-redux'
import { fetchWallet,updateConnetStatus } from '../redux/slice/common'
import { useAccount, useConnect} from 'wagmi'
import { Account } from './account'
import { WalletOptions } from './wallet-options'
// 配置客户端，启用 autoConnect

function ConnectWallet() {
  const { isConnected } = useAccount()
  if (isConnected) return <Account />
  return <WalletOptions />
}
const App = (router) => {
  const [spinning, setSpinning] = React.useState(false);
  const initWallet= async ()=> {
    setSpinning(true)
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
  const toHome = () => {
    router.router.navigate('/');
  };
  // const items = [
  //   {
  //     label: <div onClick={handleNavigate}>我的账户</div>,
  //     key: '1',
  //   },
  //   {
  //     label: <div onClick={disconnetWallet}>断开链接</div>,
  //     key: '2',
  //   },
  // ];
  return (
    <div className="header flex justify-between items-center">
       <img alt="insights-logo" src="https://www.web3insights.news/insights-logo.svg" height="40" onClick={toHome} />
       <ConnectWallet />
    </div>
  )
};
export default App;
