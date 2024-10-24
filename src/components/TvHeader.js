/*
 * @Author: shengqun.zhu shengqun2022@gmail.com
 * @Date: 2024-09-19 16:30:16
 * @LastEditors: shengqun.zhu shengqun2022@gmail.com
 * @LastEditTime: 2024-10-24 14:13:28
 * @FilePath: /myapp/front/src/views/Mine.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import React,{ useState,useEffect }  from "react";
import './header.css'
import { Button,Dropdown,Space ,Modal,Spin} from 'antd';
import { WalletOptions } from './wallet-options'
import { useAccount,useDisconnect} from 'wagmi'

const App = (router) => {
  const { address,isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    setTimeout(()=> {
      setSpinning(false)
    },500)
  }, [isConnected]);
  
  const showModal = ()=> {
    setIsModalOpen(true)
  }
  const toHome = () => {
    router.router.navigate('/');
  };
  const handleNavigate = () => {
    router.router.navigate('/mine');
  };
  const handleOk = ()=> {
    setIsModalOpen(false)
    setSpinning(true)
  }
  const  disconnectHandler= ()=> {
    setSpinning(true)
    disconnect()
  }
  const items = [
    {
      label: <div onClick={handleNavigate}>我的账户</div>,
      key: '1',
    },
    {
      label: <div onClick={disconnectHandler}>断开链接</div>,
      key: '2',
    },
  ];
  return (
    <div>
      <div className="header flex justify-between items-center">
        <img alt="insights-logo" src="https://www.web3insights.news/insights-logo.svg" height="40" onClick={toHome} />
        {isConnected ?<Dropdown
            menu={{
              items,
            }}
            trigger={['click']}
          >
              <Space>
              <Button className="account text-line-1">{address}</Button>
              </Space>
          </Dropdown> :  <Button type="primary" onClick={showModal} >链接钱包</Button>}
      </div>
      <Modal title="钱包链接" open={isModalOpen}  footer={null} width={200} closable maskClosable={true} onCancel={()=> {
          setIsModalOpen(false)
      }}>
         <WalletOptions onOk={handleOk} />
      </Modal>
      <Spin spinning={spinning}  fullscreen />
    </div>
  )
};
export default App;
