/*
 * @Author: shengqun.zhu shengqun2022@gmail.com
 * @Date: 2024-09-19 16:30:16
 * @LastEditors: shengqun.zhu shengqun2022@gmail.com
 * @LastEditTime: 2024-10-31 09:40:59
 * @FilePath: /myapp/front/src/views/Mine.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import React, { useEffect, useState } from "react";
import { request } from "../../utils/request";
import { Button,Modal,Input,Divider } from "antd";
import { UserOutlined } from "@ant-design/icons";
import api from "../../api/index";
import { useSelector } from "react-redux";
import qs from "qs";
import './mine.css'
import * as dayjs from "dayjs";
import { ethers , parseUnits} from "ethers";
import { useAccount,useConnectorClient } from 'wagmi'
import { getBalance } from '@wagmi/core'
import { config } from '../../components/config'
import { formatEther } from 'ethers';
import { abi } from '../../config/abi'
import contractAddress from  '../../config/contract'

const App = () => {
  const [userInfo, setUserInfo] = useState({});
  const [balance, setBalance,] = useState('');
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [price, setPrice] = useState('');
  const onChange = ((e)=> {
    setPrice(e.target.value)
  })
  const account = useAccount()
  useEffect(() => {
    if(account.address) {
      getBalanceFun()
      getNewsData()
    }
    // getUserInfo();
  }, []);

  // 获取账户余额
  const getBalanceFun =  async()=> {
     const result = await getBalance(config,{address:account.address,chainId:account.chainId})
     setBalance(formatEther(result.value))
  }

  // 获取账户攻略
  const getNewsData = async () => {
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
      res.data.forEach(async (el)=> {
        const row = await guideContract?._tokenInfos(el.id)
        const newRow = {
          ...el,
          isListed:row.isListed
        }
        console.log(newRow,'newRow')
        setData((prevData) => [...prevData,newRow ]);
      })
    }
  };

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
  const onShelf= async()=> {
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner();
    const guideContract = await new ethers.Contract(contractAddress, abi, signer)
    await guideContract?.listNFT(selectedId,parseUnits(price.toString(),"wei"))
  }
  const offShelf= async(id)=> {
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
             <div>
                <span> {item.price}</span>
                <div>
                { item.isListed ?  <Button danger  onClick={()=>offShelf(item.id)}>下架</Button> : <Button type="primary" onClick={()=>showModal(item.id)}>上架</Button>   }
                </div>
            </div>
          </div>
      </li>
    );
  });
  return (
    <div>
      <div className="width-100 flex justify-center">
        <img className="avatar" src={userInfo.avatar} />
      </div>
      <p className="text-center m-t-8 flex items-center justify-center cursor-pointer">
         <span className="user-name text-bold ">{userInfo.id} </span>
         <span className="m-l-8">
          <UserOutlined />
          {userInfo.fans_count}
         </span>
        </p>
      <p className="text-center m-t-8 font-14">{userInfo.description}</p>
      <p className="text-center m-t-8 font-14 balance text-bold">余额: {balance} ETH</p>
      <Divider />
      <ul className="news">{listNode}</ul>
      <Modal title="上架信息" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
         <Input className='my-input' value={price} placeholder="输入价格" onChange={onChange} />
      </Modal>
    </div>
  );
};
export default App;
