/*
 * @Author: shengqun.zhu shengqun2022@gmail.com
 * @Date: 2024-09-19 16:30:16
 * @LastEditors: shengqun.zhu shengqun2022@gmail.com
 * @LastEditTime: 2024-10-31 16:37:52
 * @FilePath: /myapp/front/src/views/Mine.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import React, { useEffect, useState } from "react";
import { Divider } from "antd";
import { request } from "../../utils/request";
import { UserOutlined } from "@ant-design/icons";
import api from "../../api/index";
import { useSelector } from "react-redux";
import qs from "qs";
import * as dayjs from "dayjs";
import { useSearchParams } from 'react-router-dom';
import './user.css'
const App = () => {
  const [userInfo, setUserInfo] = useState({});
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const common = useSelector((state) => state.common);
  const [searchParams] = useSearchParams();
  useEffect(() => {
    // getUserInfo();
    getNewsData();
  }, []);

  useEffect(() => {
    // getUserInfo();
  }, [count]);
  const getUserInfo = async () => {
    const params = {
      id: searchParams.get('id')
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
  const getNewsData = async () => {
    const params = {
      owner:  searchParams.get('id')
    }
    const paramsStr = qs.stringify(params)
    const res = await request({
      type: "get",
      url: `${api.listByOwner}?${paramsStr}`
    });
    if (res) {
      setData(res.data);
    }
  };

  const follow = async (address,type) => {
    const params = {
      from: common.account,
      to: address,
      status:type
    }
    const paramsStr = qs.stringify(params)
    const res = await request({
      type: "get",
      url: `${api.userFollow}?${paramsStr}`
    });
    if (res) {
      setCount(prev=> prev+1)
    }
  };

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
         <span className={`m-l-8 ${count > 0 ? 'danger': ''}`} onClick={()=> follow(userInfo.id,'1')}>
          <UserOutlined />
          {userInfo.fans_count}
         </span>
        </p>
      <p className="text-center m-t-8 font-14">{userInfo.description}</p>
      <Divider />
      <ul className="news">{listNode}</ul>
    </div>
  );
};
export default App;
