import { REGISTER, LOGIN_SAGA, LOGOUT_SAGA } from '../constant/authConstant';
import { UserType } from '../types/authType';

const initialState = {
  token: '',
  role: '',
};

const authReducer = (state = initialState, action: UserType) => {
  switch (action.type) {
    case REGISTER:
      return {
        // ...state,
        // userData: [...state.userData, action.payload],
      };
    case LOGIN_SAGA:
      return {
        ...state,
        token: action.token,
        role: action.role,
      };
    case LOGOUT_SAGA:
      return {
        ...state,
        token: action.token,
        role: action.role,
      };
    default:
      return state;
  }
};

export default authReducer;
