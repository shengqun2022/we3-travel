/*
 * @Author: shengqun.zhu shengqun2022@gmail.com
 * @Date: 2024-09-19 16:30:16
 * @LastEditors: shengqun.zhu shengqun2022@gmail.com
 * @LastEditTime: 2024-11-01 11:30:59
 * @FilePath: /myapp/front/src/views/Mine.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import React, { useEffect, useState } from "react";
import { message, Button } from "antd";
import { request } from "../../utils/request";
import api from "../../api/index";
import "./detail.css";
import * as dayjs from "dayjs";
import qs from "qs";
import { useSearchParams,useNavigate } from 'react-router-dom';
const App = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [guideInfo, setGuideInfo] = useState({});
  useEffect(() => {
    getDetail();
  }, []);
  const getDetail = async () => {
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
    }
  };
  
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
        <div className="flex justify-center items-center  buy-bar">
            {/* <span className="danger text-bold">价格: {Number(guideInfo.price) || '-'} Wei</span> */}
            <Button onClick={back}>返回</Button> 
        </div>
      </div>
    </div>
  );
};
export default App;
