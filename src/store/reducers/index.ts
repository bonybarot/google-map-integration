import { AnyAction, Reducer, combineReducers } from 'redux';
import { RootState } from '../../store/index';
import { authReducer } from './auth.reducer';
import { themeReducer } from './theme.reducer';
import { socketReducer } from './socketReducer';

export const reducer: Reducer<RootState, AnyAction> = (state, action) => {
  return rootReducer(state, action);
};

export const rootReducer = combineReducers({
  auth: authReducer,
  socket: socketReducer,
  theme: themeReducer,
});

export default rootReducer;
