/*
 * @Author: shengqun.zhu shengqun2022@gmail.com
 * @Date: 2024-09-19 16:30:16
 * @LastEditors: shengqun.zhu shengqun2022@gmail.com
 * @LastEditTime: 2024-11-01 10:39:45
 * @FilePath: /myapp/front/src/views/Mine.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import React, { useState } from 'react';
import {  Input,Button,Space,message} from 'antd';
import "./create.css"
import api from '../../api/index'
import { request } from '../../utils/request';
import { BASE_URL } from '../../config/constant'
import { useAccount} from 'wagmi'
import {TvTabs} from '../../components/tabs'


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
  const [messageApi,contextHolder] = message.useMessage();
  const { address } = useAccount()
  const [guideKey, setGuideKey] = useState('');
  const [disable, setDisable] = useState(false);
  const [guideContent, setGuideContent] = useState('');
  const [index, setIndex] = useState(0);
  const onChange = ((e)=> {
    setGuideKey(e.target.value)
  })

  const refresh= () => {
    setIndex(0)
    setGuideContent("")
    setDisable(true)
  }
  const createGuide = async()=> {
      refresh()
      const reader = await sseRequest(`${BASE_URL}${api.generateGuide}?cueWord=${guideKey}`);
      const decoder = new TextDecoder();
      while (true) {
          const { done, value } = await reader.read();
          if (done) {
            setDisable(false)
            break;
          }
          const chunk = decoder.decode(value, { stream: true });
          setGuideContent(prev=> prev+ chunk )
          displayText()
      }
      
  }
  const saveGuide = async()=> {
    if(!address) {
      messageApi.open({
        type: "warning",
        content: "请先链接钱包",
      });
      return 
    }
    if(!guideContent) {
      messageApi.open({
        type: "warning",
        content: "请先生成攻略再保存",
      });
      return 
    }
    const params= {
      owner: address,
      title:guideKey,
      content:guideContent
    }
    const res = await request({
      type:"post",
      url: api.createGuide,
      data:params
    })
    if(res && res.data) {
      messageApi.open({
        type: "success",
        content: "攻略创建成功",
      });
    }
}
  const displayText = ()=> {
    if (index < guideContent.length-1) {
      setGuideContent((prevContent) => prevContent + guideContent[index]); 
      setTimeout(()=> {
        setIndex((prevIndex) => prevIndex + 1); 
      }, 500); // 每500毫秒显示一个字
    } 
  }
  return  <div>
    <TvTabs></TvTabs>
    <Space.Compact
      style={{
        width: '100%',
      }}
    >
      <Input className='my-input' value={guideKey} placeholder="输入文字生成攻略" onChange={onChange} />
      <Button type="primary" disabled={disable} onClick={createGuide}> 生成攻略</Button>
    </Space.Compact>
    {/* <Input /> */}
    <br/>
    <TextArea  value={guideContent} rows={10} />
    <div className='flex justify-center'>
      <Button className="btn" disabled={disable}  type="primary" onClick={saveGuide}>保存</Button>
    </div>
    {contextHolder}
  </div>
};
export default App;