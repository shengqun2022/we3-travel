/*
 * @Author: shengqun.zhu shengqun2022@gmail.com
 * @Date: 2024-09-20 10:51:51
 * @LastEditors: shengqun.zhu shengqun2022@gmail.com
 * @LastEditTime: 2024-10-20 20:43:27
 * @FilePath: /myapp/front/src/redux/store.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import commonSlice from './slice/common'
const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, commonSlice);
const store  = configureStore({
  reducer: {
    common: persistedReducer,
  }
})
export const persistor = persistStore(store);
export default store