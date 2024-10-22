/*
 * @Author: shengqun.zhu shengqun2022@gmail.com
 * @Date: 2024-09-19 16:30:16
 * @LastEditors: shengqun.zhu shengqun2022@gmail.com
 * @LastEditTime: 2024-10-21 23:40:40
 * @FilePath: /myapp/front/src/views/Mine.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import React, { useEffect, useState } from "react";
import { message,Button } from "antd";
import { request } from "../../utils/request";
import api from "../../api/index";
import "./detail.css";
import * as dayjs from "dayjs";
import { useSelector } from "react-redux";
import qs from "qs";
const App = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const common = useSelector((state) => state.common);
  useEffect(() => {
    getNewsData();
  }, [count]);
  const getNewsData = async () => {
    const params = {
      owner: common.account
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
  let listNode = data.map((item, key) => {
    return (
      <li className="width-100" key={key}>
          <div className="width-100">
            <p
              className="title text-bold"
            >
              {item.content}
            </p>
            <p className="desc width-100 text-line-1">{item.description}</p>
          </div>
          <div className="flex justify-between items-center">
              <div className="font-12 dark-text">
                {dayjs(item.create_time * 1000).format("YYYY-MM-DD HH:MM:ss")}
              </div>
             <div>
                <span> {item.price}</span>
                <div>
                { item.sales_status=== 0 ?  <Button type="primary">上架</Button> : <Button type="danger">下架</Button>   }
                </div>
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
