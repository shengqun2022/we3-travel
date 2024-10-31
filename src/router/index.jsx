/*
 * @Author: shengqun.zhu shengqun2022@gmail.com
 * @Date: 2024-10-18 16:56:32
 * @LastEditors: shengqun.zhu shengqun2022@gmail.com
 * @LastEditTime: 2024-10-30 23:39:02
 * @FilePath: /web3-travel/src/router/index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// src/router/index.jsx
import { createBrowserRouter } from "react-router-dom";
import Home from "../views/home/index";
import Login from "../views/login/index";
import Mine from "../views/mine/index";
import Detail from "../views/detail/index";
import User from "../views/user/index";
import Trade from "../views/trade/index";
import News from "../views/news/index";
import Create from "../views/create/index";
 
const router = createBrowserRouter([
    // {
    //     path:'/',
    //     element:  <Home />,
    // },
    {
        path:'/login',
        element: <Login/>,
    },
    {
        path:'/mine',
        element: <Mine/>,
    },
    {
        path:'/detail',
        element: <Detail/>,
    },
    {
        path:'/user',
        element: <User/>,
    },
    {
        path:'/',
        element: <News/>,
    },
    {
        path:'/create',
        element: <Create/>,
    },
    {
        path:'/trade',
        element: <Trade/>,
    },
])
 
export default router