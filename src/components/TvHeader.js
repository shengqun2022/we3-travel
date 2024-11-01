/*
 * @Author: shengqun.zhu shengqun2022@gmail.com
 * @Date: 2024-09-19 16:30:16
 * @LastEditors: shengqun.zhu shengqun2022@gmail.com
 * @LastEditTime: 2024-11-01 11:06:41
 * @FilePath: /myapp/front/src/views/Mine.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import React,{ useState,useEffect }  from "react";
import './header.css'
import { Dropdown,Space ,Modal,Spin} from 'antd';
import { WalletOptions } from './wallet-options'
import { useAccount,useDisconnect} from 'wagmi'
import logo from '../assets/images/logo.png'

const App = ({router}) => {
  const { address,isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);

  useEffect(()=> {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', ()=> {
         location.reload()
      });
     }
  },[])
  useEffect(() => {
    setTimeout(()=> {
      setSpinning(false)
    },500)
    if(isConnected) {
    }
  }, [isConnected]);
  
  const showModal = ()=> {
    setIsModalOpen(true)
  }
  const toHome = () => {
    router.navigate('/');
  };
  const handleNavigate = () => {
    router.navigate('/mine');
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
        <img alt="travel-logo" src={logo} height="80" onClick={toHome} />
        {isConnected ?<Dropdown
            menu={{
              items,
            }}
            trigger={['click']}
          >
              <Space>
              <div className="wallet-btn text-center flex items-center justify-center cursor-pointer ">
                <div className="width-80 text-line-1 text-center">...{address.slice(-6)}</div>
              </div>
              </Space>
          </Dropdown> :  <div className="wallet-btn primary flex items-center justify-center cursor-pointer" onClick={showModal} >链接钱包</div>}
      </div>
      <Modal title="钱包链接" open={isModalOpen}  footer={null} width={250} closable maskClosable={true} onCancel={()=> {
          setIsModalOpen(false)
      }}>
         <div className="flex justify-center m-t-24">
          <WalletOptions onOk={handleOk} />
         </div>
      </Modal>
      <Spin spinning={spinning}  fullscreen />
    </div>
  )
};
export default App;
