/*
 * @Author: shengqun.zhu shengqun2022@gmail.com
 * @Date: 2024-09-19 16:30:16
 * @LastEditors: shengqun.zhu shengqun2022@gmail.com
 * @LastEditTime: 2024-11-01 15:35:57
 * @FilePath: /myapp/front/src/views/Mine.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { message,Spin } from "antd";
import { LikeOutlined,UserOutlined } from "@ant-design/icons";
import { request } from "../../utils/request";
import api from "../../api/index";
import "./news.css";
import * as dayjs from "dayjs";
import qs from "qs";
import { useAccount} from 'wagmi'
import {TvTabs} from '../../components/tabs'
const App = () => {
  const { address } = useAccount()
  const [spinning, setSpinning] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [thumbsList, setThumbsList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getNewsData();
    if(address) {
      thumbsUped();
    }
  }, [count]);

  const getNewsData = async () => {
    setSpinning(true)
    const res = await request({
      type: "get",
      url: api.guideRec,
    });
    if (res) {
      setData(res.data);
      setSpinning(false)
    }
  };
  const thumbsUpHandler = (e,item, type) => {
    e.stopPropagation(); 
    if (!address) {
      messageApi.open({
        type: "error",
        content: "请先链接钱包!",
      });
      return;
    }
    if (address === item.owner) {
      messageApi.open({
        type: "error",
        content: "不能给自己的攻略点赞",
      });
      return;
    }
    thumbsUp(item, type);
  };
  const thumbsUp = async (item, type) => {
    setSpinning(true)
    const params = {
      id: item.id,
      from: address,
      status: type,
    };
    const paramsStr = qs.stringify(params);
    const res = await request({
      type: "get",
      url: api.thumbsUp + "?" + paramsStr,
    });
    if (res) {
      setCount((prev) => prev + 1);
      setSpinning(false)
      messageApi.open({
        type: "success",
        content: thumbsList?.includes(item.id.toString()) ? "取消成功": "点赞成功",
      });
    }
  };

  const thumbsUped = async () => {
    setSpinning(true)
    const params = {
      id: address,
    };
    const paramsStr = qs.stringify(params);
    const res = await request({
      type: "get",
      url: api.userThumbsUped + "?" + paramsStr,
    });
    if (res) {
      setSpinning(false)
      setThumbsList(res.data || [])
    }
  };



  const toDetail =  (id)=> {
    navigate(`/detail?id=${id}`)
  }

  const toUser =  (address)=> {
    navigate(`/user?id=${address}`)
  }

  let listNode = data?.map((item, key) => {
    return (
      <li className="width-100 cursor-pointer list-item" key={key}>
        <div className="width-100 flex justify-between items-center">
          <div className="flex justify-between items-center "  onClick={() => {
                toUser(item.owner)
              }}>
            <div className="user">
              <div className="avatar-box flex items-center justify-center">
                {item.avatar ? <img className="avatar" src={item.avatar} /> :  <UserOutlined className="font-20" />  }
              </div>
              <p className="user-name text-bold m-l-4 primary">{item.owner.slice(-6)}</p>
            </div>
            
          </div>
          <div className="width-100 m-l-24">
            <div className="flex items-center">
            <p
              className="title font-14 text-bold m-r-16"
              onClick={() => {
                toDetail(item.id)
              }}
            >
              {item.title}
            </p>
            <div
              className="cursor-pointer"
                onClick={(e) => thumbsList?.includes(item.id.toString())  ? thumbsUpHandler(e,item, "0"):thumbsUpHandler(e,item, "1")}
              >
                <LikeOutlined style={thumbsList?.includes(item.id.toString()) ? {color:'red'}: {}} /> {item.like_count}
              </div>
            </div>
            <p className="desc width-100 text-line-1">{item.content}</p>
            <div className="dark-text font-12">
              {dayjs(item.create_time * 1000).format("YYYY-MM-DD HH:MM:ss")}
            </div>
          </div>
        </div>
      </li>
    );
  });
  
  return (
    <div>
      {contextHolder}
      <TvTabs></TvTabs>
      <ul className="news">{listNode}</ul>
      <Spin spinning={spinning}  fullscreen />
    </div>
  );
};
export default App;
