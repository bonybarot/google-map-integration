import {
  AnyAction,
  AsyncThunk,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';
import { LOGGED_IN } from '../../common/constants';
import { ICurrency } from '../../interfaces/common';
import {
  IChangePassword,
  IForgotPassword,
  ILogin,
  IRegister2,
  IResendOTP,
  ISignUp,
  IUpdateProfileImage,
  IUpdateUser,
  IUser,
  IVerifyOtp,
} from '../../interfaces/user';
import authService from '../../services/auth.service';
import { setAsyncStorageData } from '../../utils/helpers';
import { RootState } from '../index';
// import { Conversation } from '../../db/schemas/conversation.model';
// import { Message } from '../../db/schemas/message.model';

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;

export const loginUser: any = createAsyncThunk(
  `auth/login`,
  async (payload: ILogin) => {
    try {
      const { data } = await authService.login(payload);
      setAsyncStorageData(LOGGED_IN, true);
      return data;
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: error.response.data.message,
      });
      throw error;
    }
  },
);

export const signUpUser: any = createAsyncThunk(
  `auth/signUp`,
  async (payload: ISignUp) => {
    try {
      const { data } = await authService.signUp(payload);
      return data;
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: error.response.data.message,
      });
      throw error.response.data.message;
    }
  },
);

export const signUpUser2: any = createAsyncThunk(
  `auth/signUp`,
  async (payload: IRegister2) => {
    try {
      const { data } = await authService.register2(payload);
      return data;
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: error.response.data.message,
      });
      throw error.response.data.message;
    }
  },
);

export const resendOTP: any = createAsyncThunk(
  `auth/signUp`,
  async (payload: IResendOTP) => {
    try {
      const { data } = await authService.resendOTP(payload);
      return data;
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: error.response.data.message,
      });
      throw error.response.data.message;
    }
  },
);

export const verifyOTP: any = createAsyncThunk(
  `auth/verifyOTP`,
  async (payload: IVerifyOtp) => {
    try {
      const { data } = await authService.verifyOTP(payload);
      return data;
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: error.response.data.message,
      });
      throw error.response.data.message;
    }
  },
);

export const forgotPassword: any = createAsyncThunk(
  `auth/forgot`,
  async (payload: IForgotPassword) => {
    try {
      const { data } = await authService.forgotPassword(payload);
      return data;
    } catch (error: any) {
      throw error.response.data.message;
    }
  },
);

export const changePassword: any = createAsyncThunk(
  `auth/changePassword`,
  async (payload: IChangePassword) => {
    try {
      const { data } = await authService.changePassword(payload);
      return data;
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: error.response.data.message,
      });
      throw error.response.data.message;
    }
  },
);

export const whoAmI = createAsyncThunk(`auth/whoAmI`, async () => {
  try {
    const { data } = await authService.whoAmI();

    return data;
  } catch (error: any) {
    Toast.show({
      type: 'error',
      text1: error.response.data.message,
    });
    throw error;
  }
});

export const getUserDetail = createAsyncThunk(
  `auth/getUserDetail`,
  async () => {
    try {
      const { data } = await authService.userDetail();
      return data;
    } catch (error: any) {
      throw error;
    }
  },
);

export const getAllConversations = createAsyncThunk(
  `auth/getAllConversations`,
  async () => {
    try {
      const { data } = await authService.getAllConversations();

      console.log('------------getAllConversations data', JSON.stringify(data));
      // await Conversation.createBulk(data.data, globalThis.realm);
      return data;
    } catch (error: any) {
      console.log('------------error', error);
      throw error;
    }
  },
);

export const createNewConversation = createAsyncThunk(
  `auth/createNewConversation`,
  async (id: number) => {
    try {
      const { data } = await authService.createNewConversation(id);

      // await Conversation.create(data.data, globalThis.realm);
      return data;
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: error.response.data.message,
      });
      throw error;
    }
  },
);

export const getMessagesByConversationId = createAsyncThunk(
  `auth/getAllMessages`,
  async (id: number) => {
    try {
      const { data } = await authService.getMessageByConversationId(id);
      // await Message.createBulk(data.data, globalThis.realm);
      return data;
    } catch (error: any) {
      console.log('------------error', error);
      throw error;
    }
  },
);

export const createPaymentIntent = createAsyncThunk(
  `auth/createPaymentIntent`,
  async (payload: any) => {
    try {
      const { data } = await authService.createPaymentIntent(payload);
      return data;
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: error.response.data.message,
      });
      throw error;
    }
  },
);

export const getCurrency = createAsyncThunk(`auth/getCurrency`, async () => {
  try {
    const { data } = await authService.getCurrency();
    return data;
  } catch (error: any) {
    Toast.show({
      type: 'error',
      text1: error.response.data.message,
    });
    throw error;
  }
});

export const updateUserDetail = createAsyncThunk(
  `auth/updateUserDetail`,
  async (payload: IUpdateUser) => {
    try {
      const { data } = await authService.updateUserDetail(payload);
      return data;
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: error.response.data.message,
      });
      throw error;
    }
  },
);

export const updateProfileImage = createAsyncThunk(
  `auth/updateProfileImage`,
  async (payload: IUpdateProfileImage) => {
    try {
      const { data } = await authService.updateProfileImage(payload);
      return data;
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: error.response.data.message,
      });
      throw error;
    }
  },
);

export const logout: any = createAsyncThunk(`auth/logout`, async () => {
  try {
    const { data } = await authService.logOut();
    return data;
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: error.response.data.message,
    });

    throw error;
  }
});

interface State {
  userData: IUser | null;
  loading: boolean;
  sessionExpired: boolean;
  currencies: ICurrency[];
  module_type: string;
  defaultEmail: string;
  defaultPassword: string;
  deviceToken: string;
}
const initialState: State = {
  userData: null,
  loading: false,
  sessionExpired: false,
  currencies: [],
  module_type: '',
  defaultEmail: '',
  defaultPassword: '',
  deviceToken: '',
};

const isPendingAction = (action: AnyAction): action is PendingAction =>
  action.type.startsWith(authSlice.name) && action.type.endsWith('/pending');
const isRejectedAction = (action: AnyAction): action is RejectedAction =>
  action.type.startsWith(authSlice.name) && action.type.endsWith('/rejected');

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOutFromApi: () => {
      return { ...initialState, sessionExpired: true };
    },
    setDeviceToken: (state: State, action: PayloadAction<string>) => {
      return { ...state, deviceToken: action.payload };
    },
    setModule: (state: State, action: PayloadAction<string>) => {
      return { ...state, module_type: action.payload };
    },
    setDefaultEmailPassword: (state: State, action: PayloadAction<any>) => {
      return {
        ...state,
        defaultEmail: action.payload.email,
        defaultPassword: action.payload.password,
      };
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(loginUser.fulfilled, (state: State, action: any) => {
        Toast.show({
          type: 'success',
          text1: action.payload.message,
        });
        return {
          ...state,
          loading: false,
          sessionExpired: false,
          userData: action.payload.data,
        };
      })
      .addCase(getUserDetail.fulfilled, (state: State, action: any) => {
        return {
          ...state,
          loading: false,
          userData: action.payload.data,
        };
      })

      .addCase(getAllConversations.fulfilled, (state: State) => {
        return {
          ...state,
          loading: false,
        };
      })
      .addCase(createNewConversation.fulfilled, (state: State) => {
        return {
          ...state,
          loading: false,
        };
      })
      .addCase(changePassword.fulfilled, (state: State, action: any) => {
        Toast.show({
          type: 'success',
          text1: action.payload.message,
        });
        return {
          ...state,
          loading: false,
        };
      })
      .addCase(getCurrency.fulfilled, (state: State, action: any) => {
        return {
          ...state,
          loading: false,
          currencies: action.payload.data.map(e => {
            return { value: e.id, label: e.key };
          }),
        };
      })
      .addCase(updateUserDetail.fulfilled, (state: State, action: any) => {
        Toast.show({
          type: 'success',
          text1: action.payload.message,
        });
        return {
          ...state,
          loading: false,
        };
      })
      .addCase(signUpUser.fulfilled, (state: State, action: any) => {
        Toast.show({
          type: 'success',
          text1: action.payload.message,
        });
        return {
          ...state,
          loading: false,
        };
      })
      .addCase(forgotPassword.fulfilled, (state: State, action: any) => {
        Toast.show({
          type: 'success',
          text1: action.payload.message,
        });
        return {
          ...state,
          loading: false,
        };
      })
      .addCase(verifyOTP.fulfilled, (state: State, action: any) => {
        Toast.show({
          type: 'success',
          text1: action.payload.message,
        });
        return {
          ...state,
          loading: false,
        };
      })
      .addCase(whoAmI.fulfilled, (state: State, action: any) => {
        return {
          ...state,
          loading: false,
          userData: action.payload.data,
        };
      })
      .addCase(logout.fulfilled, (state: State) => {
        return {
          ...state,
          loading: false,
          userData: null,
        };
      })
      .addMatcher(isPendingAction, (state: State) => {
        return { ...state, loading: true };
      })
      .addMatcher(isRejectedAction, (state: State) => {
        state.loading = false;
      });
  },
});

export const authReducer = authSlice.reducer;
export const authSelector = (state: RootState) => state.auth;
export const {
  logOutFromApi,
  setModule,
  setDefaultEmailPassword,
  setDeviceToken,
} = authSlice.actions;
