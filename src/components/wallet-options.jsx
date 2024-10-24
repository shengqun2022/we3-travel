/*
 * @Author: shengqun.zhu shengqun2022@gmail.com
 * @Date: 2024-10-22 23:24:37
 * @LastEditors: shengqun.zhu shengqun2022@gmail.com
 * @LastEditTime: 2024-10-24 12:17:54
 * @FilePath: /web3-travel/src/components/wallet-option.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as React from 'react'
import { Button } from 'antd';
import { useConnect } from 'wagmi'

export function WalletOptions({onOk}) {
  const { connectors, connect } = useConnect()
  return connectors.map((connector) => (
    <WalletOption
      key={connector.uid}
      connector={connector}
      onClick={async() =>  {
          await connect({ connector })
          onOk()
        }
      }
    />
  ))
}

function WalletOption({
  connector,
  onClick,
}) {
  const [ready, setReady] = React.useState(false)
  React.useEffect(() => {
    ;(async () => {
      const provider = await connector.getProvider()
      setReady(!!provider)
    })()
  }, [connector])

  return (
    <Button type="primary"  className='block m-b-8 width-100 wallet-option' disabled={!ready} onClick={onClick}>{connector.name}</Button>
  )
}