/*
 * @Author: shengqun.zhu shengqun2022@gmail.com
 * @Date: 2024-09-19 16:30:16
 * @LastEditors: shengqun.zhu shengqun2022@gmail.com
 * @LastEditTime: 2024-11-04 09:11:34
 * @FilePath: /myapp/front/src/views/Mine.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import React, { useEffect, useState } from "react";
import { message, Button,Spin } from "antd";
import { request } from "../../utils/request";
import api from "../../api/index";
import "./detail.css";
import * as dayjs from "dayjs";
import qs from "qs";
import { useSearchParams,useNavigate } from 'react-router-dom';
import { useAccount} from 'wagmi'
import { ethers} from "ethers";
import { abi } from '../../config/abi'
import contractAddress from  '../../config/contract'
const App = () => {
  const [messageApi,contextHolder] = message.useMessage();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [guideInfo, setGuideInfo] = useState({});
  const [spinning, setSpinning] = useState(false);
  const { address } = useAccount()
  useEffect(() => {
    getDetail();
    if(address){
      listenr()
    }
  }, []);
  const getDetail = async () => {
    setSpinning(true)
    const params = {
      id: searchParams.get('id')
    };
    const paramsStr = qs.stringify(params);
    const res = await request({
      type: "get",
      url: `${api.guideDetail}?${paramsStr}`,
    });
    if (res && res.data) {
      setGuideInfo(res.data);
      setSpinning(false)
    }
  };
  const listenr = async ()=> {
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner();
    const guideContract = await new ethers.Contract(contractAddress, abi, signer)
    guideContract.addListener("NFTBought", (eventAddress) => {
      if(eventAddress ===  address) {
        setSpinning(false)
      }
     })
  }
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
  const back = ()=> {
    navigate(-1)
  }
  return (
    <div>
      <div className="width-100">
        <p className="text-center">
          <span className="title  text-bold "> {guideInfo.title} </span>
        </p>
        <p className="font-12 dark-text">
          {dayjs(guideInfo.create_time * 1000).format("YYYY-MM-DD HH:MM:ss")}
        </p>
        <p className="desc width-100">{guideInfo.content}</p>
      </div>
      <div className="flex justify-center width-100 buy-box">
        <div className="flex justify-end items-center  buy-bar">
            <span className="danger text-bold m-r-24">价格: {Number(guideInfo.price) || '-'} Wei</span>
            {guideInfo.owner === address ?  <Button className="m-r-24"  variant="outlined" >已拥有</Button> : <Button className="m-r-24" disabled={guideInfo.sales_status === 0}  type="primary"  onClick={()=> buy(guideInfo)}> {guideInfo.sales_status === 0 ? "待售" : "购买"}</Button>   }
        </div>
      </div>
      <Spin spinning={spinning}  fullscreen />
      {contextHolder}
    </div>
  );
};
export default App;
