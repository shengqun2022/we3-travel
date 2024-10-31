/*
 * @Author: shengqun.zhu shengqun2022@gmail.com
 * @Date: 2024-09-20 10:53:09
 * @LastEditors: shengqun.zhu shengqun2022@gmail.com
 * @LastEditTime: 2024-10-29 23:40:26
 * @FilePath: /myapp/front/src/redux/slice/blanceSlice.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { abi } from '../../config/abi'
import contractAddress from  '../../config/contract'
import { ethers } from "ethers";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    cancelOrders: [],
    successOrders: [],
    allOrders: [],
  },
  reducers: {
    setCancelOrders(state, action) {
      state.cancelOrders = action.payload;
    },
    setSuccessOrders(state, action) {
      state.successOrders = action.payload;
    },
    setAllOrders(state, action) {
      state.allOrders = action.payload;
    },
  },
});
export const { setCancelOrders, setSuccessOrders, setAllOrders } =
  orderSlice.actions;
export default orderSlice.reducer;

export const fetchCancelOrderData = createAsyncThunk(
  "order/fetchCancelOrderData",
  async (data, { dispatch }) => {
   
  }
);

export const fetchSuccessOrderData = createAsyncThunk(
  "order/fetchSuccessOrderData",
  async (data, { dispatch }) => {
  }
);

export const fetchAllOrdersData = createAsyncThunk(
  "order/fetchAllOrderData",
  async (data, { dispatch }) => {
    if(window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner();
      const guideContract = await new ethers.Contract(contractAddress, abi, signer)
      const orderData = await guideContract.queryFilter("NFTListed", 0, "latest");
      const allOrder = orderData.map((item) => item.args.toObject(item.args));
      console.log(allOrder,'allOrder')
      dispatch(setAllOrders(allOrder));
    }
  }
);
