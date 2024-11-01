/*
 * @Author: shengqun.zhu shengqun2022@gmail.com
 * @Date: 2024-09-19 16:30:16
 * @LastEditors: shengqun.zhu shengqun2022@gmail.com
 * @LastEditTime: 2024-11-01 16:48:23
 * @FilePath: /myapp/front/src/views/Mine.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import React, { useEffect, useState } from "react";
import { message,Button,Spin,Input } from "antd";
import { request } from "../../utils/request";
import api from "../../api/index";
import "./trade.css";
import * as dayjs from "dayjs";
import { useAccount} from 'wagmi'
import { ethers} from "ethers";
import { abi } from '../../config/abi'
import contractAddress from  '../../config/contract'
import {TvTabs} from '../../components/tabs'
const { Search } = Input;
const App = () => {
  const [messageApi,contextHolder] = message.useMessage();
  const [data, setData] = useState([]);
  const [defaultData, setDefaultData] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const { address } = useAccount()
  useEffect(() => {
    getNewsData()
    if(address) {
      listenr()
    }
  }, []);

  const listenr = async ()=> {
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner();
    const guideContract = await new ethers.Contract(contractAddress, abi, signer)
    guideContract.addListener("NFTBought", (eventAddress) => {
      if(eventAddress ===  address) {
        getNewsData()
        setSpinning(false)
      }
     })
  }

  const getNewsData = async () => {
    setSpinning(true)
    const res = await request({
      type: "get",
      url: api.guideRec,
    });
    if(res) {
      const result = res.data.filter(item=> item.sales_status ===1).filter(x=> x.owner !== address)
      setDefaultData(result)
      setData(result);
      setSpinning(false)
    }
  };
  const searchHandler =  (key) => {
    setData(defaultData.filter(item=> item.title.includes(key)))
  };
  
  const buy = async (item)=> {
    if(!address) {
      messageApi.open({
        type: "warning",
        content: "请先链接钱包",
      });
      return 
    }
    setSpinning(true)
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner();
    const guideContract = await new ethers.Contract(contractAddress, abi, signer)
    await guideContract?.buyNFT(item.id,{ value: Number(item.price) })

  }
  let listNode = data.map((item, key) => {
    return (
      <li className="width-100" key={key}>
          <div className="width-100">
            <p
              className="title text-bold"
            >
              {item.title}
            </p>
            <p className="desc width-100 text-line-1">{item.content}</p>
          </div>
          <div className="flex justify-between items-center">
              <div className="font-12 dark-text">
                {dayjs(item.create_time * 1000).format("YYYY-MM-DD HH:MM:ss")}
              </div>
             <div>
                <span className="danger text-bold">价格 {Number(item.price) || '-'} Wei</span>
                <Button type="primary" className="m-l-24" onClick={()=> buy(item)} >购买</Button> 
            </div>
          </div>
      </li>
    );
  });

  return (
    <div>
      {contextHolder}
      <TvTabs></TvTabs>
      <div className="flex justify-end">
        <Search placeholder="输入关键字搜索" enterButton="搜索" style={{width: '400px'}} onSearch={(vaule)=> {
          searchHandler(vaule)
        }} />
      </div>
     
      <ul className="news">{listNode}</ul>
      <Spin spinning={spinning}  fullscreen />
    </div>
  );
};
export default App;
