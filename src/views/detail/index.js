/*
 * @Author: shengqun.zhu shengqun2022@gmail.com
 * @Date: 2024-09-19 16:30:16
 * @LastEditors: shengqun.zhu shengqun2022@gmail.com
 * @LastEditTime: 2024-10-22 11:19:15
 * @FilePath: /myapp/front/src/views/Mine.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import React, { useEffect, useState } from "react";
import { message, Button } from "antd";
import { request } from "../../utils/request";
import { LikeOutlined } from "@ant-design/icons";
import api from "../../api/index";
import "./detail.css";
import * as dayjs from "dayjs";
import { useSelector } from "react-redux";
import qs from "qs";
import { useSearchParams } from 'react-router-dom';
const App = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [guideInfo, setGuideInfo] = useState({});
  const common = useSelector((state) => state.common);
  const [searchParams] = useSearchParams();
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
  return (
    <div>
      {contextHolder}
      <div className="width-100">
        <p className="">
          <span className="title  text-bold"> {guideInfo.content} </span>
          <span className="m-l-8 font-12">
            <LikeOutlined /> {guideInfo.like_count}
          </span>
        </p>
        <p className="font-12 dark-text">
          {" "}
          {dayjs(guideInfo.create_time * 1000).format("YYYY-MM-DD HH:MM:ss")}
        </p>
        <p className="desc width-100 text-line-1">{guideInfo.description}</p>
      </div>
      <div className="flex justify-end items-center">
          <span className="danger text-bold">Price: {guideInfo.price || '-'} ETH</span>
          <Button className="m-l-24" type="primary">购买</Button> 
      </div>
      
    </div>
  );
};
export default App;
