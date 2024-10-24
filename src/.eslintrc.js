/*
 * @Author: shengqun.zhu shengqun2022@gmail.com
 * @Date: 2024-10-23 22:40:53
 * @LastEditors: shengqun.zhu shengqun2022@gmail.com
 * @LastEditTime: 2024-10-23 22:42:40
 * @FilePath: /web3-travel/src/.eslintrc.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 在 .eslintrc.js 文件中添加以下配置
module.exports = {
  rules: {
    "no-restricted-globals": ["error", "name", "fdescribe"]  // 仅限制特定的全局变量
  }
}