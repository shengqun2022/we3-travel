/*
 * @Author: shengqun.zhu shengqun2022@gmail.com
 * @Date: 2024-09-19 16:30:16
 * @LastEditors: shengqun.zhu shengqun2022@gmail.com
 * @LastEditTime: 2024-10-22 10:29:10
 * @FilePath: /myapp/front/src/views/Mine.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import React, { useState,useEffect } from 'react';
import {  Input,Button,Space} from 'antd';
import "./create.css"
import api from '../../../api/index'
import { request } from '../../../utils/request';
import DEFAULT_ADDRESS,{ BASE_URL } from '../../../config/constant'
import {useSelector} from 'react-redux'
const { TextArea } = Input;

async function sseRequest(url) {
  const response = await fetch(url, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
      },
  });

  if (!response.ok) {
      throw new Error('Network response was not ok');
  }

  return response.body.getReader();
}

const App = () => {
  const common = useSelector(state=> state.common)
  const [guideKey, setGuideKey] = useState('');
  const [guideContent, setGuideContent] = useState('');
  const [index, setIndex] = useState(0);
  const onChange = ((e)=> {
    setGuideKey(e.target.value)
  })
  const createGuide = async()=> {
      const reader = await sseRequest(`${BASE_URL}${api.generateGuide}?cueWord=${guideKey}`);
      const decoder = new TextDecoder();
      while (true) {
          const { done, value } = await reader.read();
          console.log(done, value ,111)
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          console.log(chunk); // 处理接收到的数据
          setGuideContent(prev=> prev+ chunk )
          displayText()
      }
      
  }
  const saveGuide = async()=> {
    const params= {
      owner: DEFAULT_ADDRESS,
      content: guideContent
    }
    const res = await request({
      type:"post",
      url: api.createGuide,
      data:params
    })
    if(res && res.status===200) {
       alert('保存成功')
    }
}
  const displayText = ()=> {
    if (index < guideContent.length-1) {
      setGuideContent((prevContent) => prevContent + guideContent[index]); // 正确地使用 setState
      setTimeout(()=> {
        setIndex((prevIndex) => prevIndex + 1); 
      }, 500); // 每100毫秒显示一个字
    }
  }
  return  <div>
    <Space.Compact
      style={{
        width: '100%',
      }}
    >
      <Input className='my-input' value={guideKey} placeholder="输入文字生成攻略" onChange={onChange} />
      <Button type="primary" onClick={createGuide}> 生成攻略</Button>
    </Space.Compact>
    {/* <Input /> */}
    <br/>
    <TextArea  value={guideContent} rows={10} />
    <Button className="btn" type="primary" onClick={saveGuide}>保存</Button>
  </div>
};
export default App;