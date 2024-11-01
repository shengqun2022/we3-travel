/*
 * @Author: shengqun.zhu shengqun2022@gmail.com
 * @Date: 2024-09-19 16:30:16
 * @LastEditors: shengqun.zhu shengqun2022@gmail.com
 * @LastEditTime: 2024-11-01 15:40:52
 * @FilePath: /myapp/front/src/views/Mine.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import React, { useEffect, useState } from "react";
import { Divider,Button,Spin} from "antd";
import { request } from "../../utils/request";
import api from "../../api/index";
import { useSelector } from "react-redux";
import qs from "qs";
import * as dayjs from "dayjs";
import { useSearchParams,useNavigate } from 'react-router-dom';
import './user.css'
const App = () => {
  const [userInfo, setUserInfo] = useState({});
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const common = useSelector((state) => state.common);
  const [spinning, setSpinning] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {
    getNewsData();
  }, []);

  useEffect(() => {
  }, [count]);
  const toDetail =  (id)=> {
    navigate(`/detail?id=${id}`)
  }
  const back = ()=> {
    navigate(-1)
  }
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
    setSpinning(true)
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
      setSpinning(false)
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
      <li className="width-100" key={key}  onClick={() => {
        toDetail(item.id)
      }}>
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
        <div className="avatar flex justify-center items-center text-bold" >{searchParams.get('id') ? searchParams.get('id').slice(-4) : '-'}</div>
      </div>
      <p className="text-center m-t-8 font-14">{userInfo.description}</p>
      <Divider />
      <ul className="news">{listNode}</ul>
      <div className="flex justify-center width-100 buy-box">
        <div className="flex justify-center items-center  buy-bar">
            {/* <span className="danger text-bold">价格: {Number(guideInfo.price) || '-'} Wei</span> */}
            <Button onClick={back}>返回</Button> 
        </div>
      </div>
      <Spin spinning={spinning}  fullscreen />
    </div>
  );
};
export default App;
