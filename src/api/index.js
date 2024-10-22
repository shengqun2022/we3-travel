/*
 * @Author: shengqun.zhu shengqun2022@gmail.com
 * @Date: 2024-10-20 18:12:35
 * @LastEditors: shengqun.zhu shengqun2022@gmail.com
 * @LastEditTime: 2024-10-21 23:28:16
 * @FilePath: /web3-travel/src/api/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const api = {
  // 新闻
  guideRec :"/guide/rec",
  thumbsUp :"/guide/thumbsUp",

  // 创建攻略
   createGuide:"/guide/create",
   generateGuide :"/ai/generateGuideSSE",

  // 我的攻略
  listByOwner :"/guide/listByOwner",
}

export default api