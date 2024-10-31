/*
 * @Author: shengqun.zhu shengqun2022@gmail.com
 * @Date: 2024-09-20 10:51:51
 * @LastEditors: shengqun.zhu shengqun2022@gmail.com
 * @LastEditTime: 2024-10-31 15:37:50
 * @FilePath: /myapp/front/src/redux/store.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import orderSlice from './slice/orderSlice.js'
const persistConfig = {
  key: 'root',
  storage,
};
const persistedOrderReducer = persistReducer(persistConfig, orderSlice);
const store  = configureStore({
  reducer: {
    order:persistedOrderReducer
  }
})
export const persistor = persistStore(store);
export default store