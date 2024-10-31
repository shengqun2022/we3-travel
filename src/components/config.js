/*
 * @Author: shengqun.zhu shengqun2022@gmail.com
 * @Date: 2024-10-22 17:59:28
 * @LastEditors: shengqun.zhu shengqun2022@gmail.com
 * @LastEditTime: 2024-10-31 14:29:49
 * @FilePath: /web3-travel/src/config/createConfig.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { http, createConfig } from 'wagmi'
import { base, mainnet, optimism } from 'wagmi/chains'
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors'

const projectId = '31337'

const localChain = {
  id: 31337, // 自定义链的ID
  name: 'Localhost',
  network: 'localhost',
  nativeCurrency: {
      decimals: 18,
      name: 'Ether',
      symbol: 'ETH',
  },
  rpcUrls: {
      default: { http: ['http://127.0.0.1:8545'] },
      public: { http: ['http://127.0.0.1:8545'] },
  },
  // 添加其他必要的配置
  transports: {
    default: http(), // 使用 http 作为传输方式
  },
};
// Sepolia 测试网配置
const sepolia = {
  id: 11155111, // Sepolia 的链ID
  name: 'Sepolia',
  network: 'sepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: { http: ['https://sepolia.infura.io/v3/b4d1db33e3044dc3ab8b42778d3c3027'] }, // 使用你的 Infura 项目 ID
    public: { http: ['https://sepolia.infura.io/v3/b4d1db33e3044dc3ab8b42778d3c3027'] },
  },
  transports: {
    default: http(), // 使用 http 作为传输方式
  },
};

export const config = createConfig({
  chains: [mainnet, base,localChain,sepolia],
  syncConnectedChain: true, 
  connectors: [
    metaMask({ projectId }),
    walletConnect({ projectId }),
    injected(),
    safe()
  ],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
    [localChain.id]: http(),
  },
})