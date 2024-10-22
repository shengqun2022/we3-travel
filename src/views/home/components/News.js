/*
 * @Author: shengqun.zhu shengqun2022@gmail.com
 * @Date: 2024-09-19 16:30:16
 * @LastEditors: shengqun.zhu shengqun2022@gmail.com
 * @LastEditTime: 2024-10-21 23:25:04
 * @FilePath: /myapp/front/src/views/Mine.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { List, message } from "antd";
import { LikeOutlined } from "@ant-design/icons";
import { request } from "../../../utils/request";
import api from "../../../api/index";
import "./news.css";
import * as dayjs from "dayjs";
import { useSelector } from "react-redux";
import qs from "qs";
const App = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const common = useSelector((state) => state.common);
  const navigate = useNavigate();
  useEffect(() => {
    getNewsData();
  }, [count]);
  const getNewsData = async () => {
    const res = await request({
      type: "get",
      url: api.guideRec,
    });
    if (res) {
      setData(res.data);
    }
  };
  const thumbsUpHandler = (item, type) => {
    if (!common.account) {
      messageApi.open({
        type: "error",
        content: "请先链接钱包!",
      });
      return;
    }
    if (common.account === item.owner) {
      messageApi.open({
        type: "error",
        content: "不能给自己的攻略点赞",
      });
      return;
    }
    thumbsUp(item, type);
  };
  const thumbsUp = async (item, type) => {
    const params = {
      id: item.id,
      from: common.account,
      status: type,
    };
    const paramsStr = qs.stringify(params);
    const res = await request({
      type: "get",
      url: api.thumbsUp + "?" + paramsStr,
    });
    if (res) {
      setCount((prev) => prev + 1);
      messageApi.open({
        type: "success",
        content: "点赞成功",
      });
    }
  };

  let listNode = data.map((item, key) => {
    return (
      <li className="width-100" key={key}>
        <div className="width-100">
          <div className="flex justify-between items-center">
            <div className="user flex items-center">
              <img className="avatar" src={item.avatar} />
              <p className="user-name text-bold">{item.owner}</p>
            </div>
            <div className="">
              <div>
                {dayjs(item.create_time * 1000).format("YYYY-MM-DD HH:MM:ss")}
              </div>
              <div
                className="cursor-pointer"
                onClick={() => thumbsUpHandler(item, "1")}
              >
                {" "}
                <LikeOutlined /> {item.like_count}
              </div>
            </div>
          </div>
          <div className="width-100">
            <p
              className="title text-bold"
              onClick={() => {
                navigate("/mine");
              }}
            >
              {item.content}
            </p>
            <p className="desc width-100 text-line-1">{item.description}</p>
          </div>
        </div>
      </li>
    );
  });
  return (
    <div>
      {contextHolder}
      <ul className="news">{listNode}</ul>
    </div>
  );
};
export default App;
