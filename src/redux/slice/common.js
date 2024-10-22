/*
 * @Author: shengqun.zhu shengqun2022@gmail.com
 * @Date: 2024-09-20 10:53:09
 * @LastEditors: shengqun.zhu shengqun2022@gmail.com
 * @LastEditTime: 2024-10-22 16:04:57
 * @FilePath: /myapp/front/src/redux/slice/blanceSlice.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { ethers } from "ethers";
const commonSlice = createSlice({
  name: "common",
  initialState: {
    account: '',
    provider: {},
    signer: {},
    connected: false,
    balance:"0"
  },
  reducers: {
    setAccount(state,action) {
      state.account = action.payload;
    },
    setProvider(state, action) {
      state.provider = action.payload;
    },
    setSigner(state, action) {
      state.signer = action.payload;
    },
    setConnected(state, action) {
      state.connected = action.payload;
    },
    setBalance(state, action) {
      state.balance = action.payload;
    },
  },
});
export const { setAccount, setProvider, setSigner,setConnected,setBalance } =
commonSlice.actions;
export default commonSlice.reducer;

export const fetchWallet = createAsyncThunk(
  "common/fetchWallet",
  async (data, { dispatch }) => {
    const { signer, provider, account,balance } = data;
    dispatch(setAccount(account));
    dispatch(setProvider(provider));
    dispatch(setSigner(signer));
    dispatch(setBalance(balance));  
  }
);
export const updateConnetStatus = createAsyncThunk(
  "common/updateConnetStatus",
  async (data, { dispatch }) => {
      dispatch(setConnected(data));
  }
);

export const updateBalance = createAsyncThunk(
  "common/updateBalance",
  async (data, { dispatch }) => {
     if(data) {
      dispatch(setBalance(data));
     }
  }
);


