import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IThemeColor, colors } from '../../themes';
import { RootState } from '../index';

interface State {
  current: IThemeColor;
}

const initialState: State = {
  current: colors.light,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeThemeAction: (state: State, action: PayloadAction<IThemeColor>) => {
      return { ...state, current: action.payload };
    },
  },
});

export const themeReducer = themeSlice.reducer;
export const themeSelector = (state: RootState) => state.theme;
export const { changeThemeAction } = themeSlice.actions;
