/*
 * @Author: shengqun.zhu shengqun2022@gmail.com
 * @Date: 2024-09-19 16:30:16
 * @LastEditors: shengqun.zhu shengqun2022@gmail.com
 * @LastEditTime: 2024-10-20 16:15:16
 * @FilePath: /myapp/front/src/views/Mine.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import React from 'react';
import {  Input,Button } from 'antd';
import "./create.css"
const { TextArea } = Input;
const App = () => {
  return  <div>
    <Input className='my-input' placeholder="输入文字生成攻略" />
    <br/>
    <TextArea rows={10} />
    <Button className="btn" type="primary">生成攻略</Button>
  </div>
};
export default App;