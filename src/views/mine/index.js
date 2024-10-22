/*
 * @Author: shengqun.zhu shengqun2022@gmail.com
 * @Date: 2024-09-19 16:30:16
 * @LastEditors: shengqun.zhu shengqun2022@gmail.com
 * @LastEditTime: 2024-10-22 15:23:26
 * @FilePath: /myapp/front/src/views/Mine.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import React, { useEffect, useState } from "react";
import { request } from "../../utils/request";
import { UserOutlined } from "@ant-design/icons";
import api from "../../api/index";
import { useSelector } from "react-redux";
import qs from "qs";
import './mine.css'
import { ethers } from 'ethers';
const App = () => {
  const [userInfo, setUserInfo] = useState({});
  const [balance, setBalance] = useState('');
  const common = useSelector((state) => state.common);
  useEffect(() => {
    setBalance(ethers.parseUnits(common.balance, 18))
    getUserInfo();
  }, []);
  const getUserInfo = async () => {
    const params = {
      id: common.account
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
      <p className="text-center m-t-8 font-14">Balance: {balance}</p>
    </div>
  );
};
export default App;
