import { LOGIN, LOGOUT } from '../constant/authConstant';
import { ActionLoginDataType } from '../types/authType';

// export const registerUser = (data) => ({
//   type: REGISTER,
//   payload: data,
// });

export const loginUser = (data: ActionLoginDataType) => ({
  type: LOGIN,
  payload: data,
});

export const logoutUser = (token: string) => ({
  type: LOGOUT,
  token: token,
});
