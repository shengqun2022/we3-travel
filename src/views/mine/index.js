/*
 * @Author: shengqun.zhu shengqun2022@gmail.com
 * @Date: 2024-09-19 16:30:16
 * @LastEditors: shengqun.zhu shengqun2022@gmail.com
 * @LastEditTime: 2024-11-03 19:23:27
 * @FilePath: /myapp/front/src/views/Mine.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import React, { useEffect, useState } from "react";
import { request } from "../../utils/request";
import { Button,Modal,Input,Divider,Spin } from "antd";
import api from "../../api/index";
import qs from "qs";
import './mine.css'
import * as dayjs from "dayjs";
import { ethers , parseUnits} from "ethers";
import { useAccount } from 'wagmi'
import { getBalance } from '@wagmi/core'
import { config } from '../../components/config'
import { formatEther } from 'ethers';
import { abi } from '../../config/abi'
import contractAddress from  '../../config/contract'
import { useNavigate } from 'react-router-dom';

const App = () => {
  const [userInfo, setUserInfo] = useState({});
  const [balance, setBalance,] = useState('');
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [price, setPrice] = useState('');
  const [spinning, setSpinning] = useState(false);
  const navigate = useNavigate();
  const account = useAccount()
  
  useEffect(() => {
    if(account.address) {
      // getBalanceFun()
      getNewsData()
      getUserInfo()
      listenr()
  }
  }, []);
  const onChange = ((e)=> {
    setPrice(e.target.value)
  })

  const listenr = async ()=>  {
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner();
    const guideContract = await new ethers.Contract(contractAddress, abi, signer)
    guideContract.addListener("NFTDelisted", (eventAddress) => {
      if(eventAddress ===  account.address) {
        getNewsData()
        setSpinning(false)
      }
     })
     guideContract.addListener("NFTListed", (eventAddress) => {
      if(eventAddress ===  account.address) {
        getNewsData()
        setSpinning(false)
      }
     })
  }

  // 获取账户余额
  // const getBalanceFun =  async()=> {
  //    const result = await getBalance(config,{address:account.address,chainId:account.chainId})
  //    setBalance(formatEther(result.value))
  // }

   //获取账户详情
   const getUserInfo = async () => {
    const params = {
      id: account.address
    };
    const paramsStr = qs.stringify(params);
    const res = await request({
      type: "get",
      url: `${api.userDetail}?${paramsStr}`,
    });
    if (res && res.data) {
      setUserInfo(res.data);
    }
  };

  // 获取账户攻略
  const getNewsData = async () => {
    setSpinning(true)
    setData([])
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner();
    const guideContract = await new ethers.Contract(contractAddress, abi, signer)
    const params = {
      owner: account.address
    }
    const paramsStr = qs.stringify(params)
    const res = await request({
      type: "get",
      url: `${api.listByOwner}?${paramsStr}`
    });
    if (res) {
      setData(res.data);
      setSpinning(false)
    }
  };


  const showModal = (id) => {
    setSelectedId(id)
    setIsModalOpen(true);
  };

  const handleOk = () => {
    onShelf()
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false); 
  };
  const back = ()=> {
    navigate(-1)
  }
  const onShelf= async()=> {
    setSpinning(true)
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner();
    const guideContract = await new ethers.Contract(contractAddress, abi, signer)
    console.log(price.toString(),'price.toString()')
    await guideContract?.listNFT(selectedId,parseUnits(price.toString(),"wei"))
  }
  const offShelf= async(id)=> {
    setSpinning(true)
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner();
    const guideContract = await new ethers.Contract(contractAddress, abi, signer)
    await guideContract?.deListNFT(id)
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
             <div className="flex items-center">
                <span className="danger text-bold">价格: {item.price? Number(item.price) : '-' }  Wei</span>
                <div className="m-l-24">
                { item.sales_status===1 ?  <Button danger  onClick={()=>offShelf(item.id)}>下架</Button> : <Button type="primary" onClick={()=>showModal(item.id)}>上架</Button>   }
                </div>
            </div>
          </div>
      </li>
    );
  });
  return (
    <div>
      <div className="width-100 flex justify-center items-center">
       <div className="avatar flex justify-center items-center text-bold" >{account.address ? account.address.slice(-4) : '-'}</div>
      </div>
      {/* <p className="text-center m-t-8 font-14">个性签名:{userInfo.description || "-"}</p> */}
      <p className="text-center m-t-8 font-14">粉丝:{userInfo.fans_count || 0}</p>
      {/* <p className="text-center m-t-8 font-14 balance text-bold">账户余额: {balance} ETH</p> */}
      <Divider />
      <ul className="news">{listNode}</ul>
      <Modal title="上架信息" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
         <Input className='my-input' value={price} placeholder="输入价格" onChange={onChange} />
      </Modal>
      {/* <Modal title="更换头像" open={isAvatarOpen} onOk={handleOk} onCancel={handleCancel}>
         <Input className='my-input' value={price} placeholder="输入价格" onChange={onChange} />
      </Modal> */}
      <Spin spinning={spinning}  fullscreen />
      <div className="flex justify-center width-100 buy-box">
        <div className="flex justify-center items-center  buy-bar">
            <Button onClick={back}>返回</Button> 
        </div>
      </div>
    </div>
  );
};
export default App;
