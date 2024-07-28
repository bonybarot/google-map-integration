import { createSlice } from '@reduxjs/toolkit';
export interface SocketState {
  isEstablishingConnection: boolean;
  isConnected: boolean;
}

const initialState: SocketState = {
  isEstablishingConnection: false,
  isConnected: false,
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    startConnecting: (state: SocketState) => {
      state.isEstablishingConnection = true;
    },
    disconnect: (state: SocketState) => {
      state.isEstablishingConnection = false;
      state.isConnected = false;
    },
    sendMessage: (state: SocketState) => {
      return state;
    },
  },
});

export const socketReducer = socketSlice.reducer;

export const { sendMessage } = socketSlice.actions;
export const socketActions = socketSlice.actions;

export default socketSlice;
