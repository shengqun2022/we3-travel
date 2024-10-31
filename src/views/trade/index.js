/*
 * @Author: shengqun.zhu shengqun2022@gmail.com
 * @Date: 2024-09-19 16:30:16
 * @LastEditors: shengqun.zhu shengqun2022@gmail.com
 * @LastEditTime: 2024-10-31 09:49:14
 * @FilePath: /myapp/front/src/views/Mine.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import React, { useEffect, useState } from "react";
import { message,Button,Modal,Input } from "antd";
import { request } from "../../utils/request";
import api from "../../api/index";
import "./trade.css";
import * as dayjs from "dayjs";
import { ethers} from "ethers";
import { useSelector } from "react-redux";
import { useAccount,useWriteContract} from 'wagmi'
import qs from "qs";
import { abi } from '../../config/abi'
import contractAddress from  '../../config/contract'
import {TvTabs} from '../../components/tabs'

const App = () => {
  const [contextHolder] = message.useMessage();
  const [data, setData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const { writeContract } = useWriteContract()
  const { address } = useAccount()
  const order = useSelector((state) => state.order);
  useEffect(() => {
    getNewsData()
  }, []);

  useEffect(() => {
    setOrderData([])
    setTimeout(()=> {
      getGuideOrderData()
    },10)
  }, [data]);

  const getNewsData = async () => {
    const res = await request({
      type: "get",
      url: api.guideRec,
    });
    if(res) {
      setData(res.data);
    }
  };
  
  const getGuideOrderData = async ()=> {
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner();
    const guideContract = await new ethers.Contract(contractAddress, abi, signer)
    data.forEach(async (element) => {
        const row = await guideContract?._tokenInfos(element.id)
        if(row.isListed) {
          const newRow = {
            ...element,
            price:Number(row.price)
          }
          setOrderData((prevData) => [...prevData,newRow ]);
        }
     });

  }
  const buy = async (item)=> {
    console.log(item, 11)
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner();
    const guideContract = await new ethers.Contract(contractAddress, abi, signer)
    await guideContract?.buyNFT(item.id,{ value: Number(item.price) })

  }
  let listNode = orderData.map((item, key) => {
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
                <span>{Number(item.price)}</span>
                <Button type="primary" onClick={()=> buy(item)} >购买</Button> 
            </div>
          </div>
      </li>
    );
  });

  return (
    <div>
      {/* {contextHolder} */}
      <TvTabs></TvTabs>
      <ul className="news">{listNode}</ul>
    </div>
  );
};
export default App;
