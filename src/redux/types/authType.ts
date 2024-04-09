export type ActionLoginDataType = {
  user: {
    email: string;
    password: string;
    role: string;
  };
};

export type LoginActionType = {
  type: string;
  user: string;
  payload: ActionLoginDataType;
};

export type LogoutActionType = {
  type: string;
  token: string;
};

export type UserType = {
  type: string;
  token: string;
  role: string;
};

export type LoginUserType = (data: ActionLoginDataType) => void;

// export type AuthReducerType = (
//   state: UserType,
//   action: LoginActionType,
// ) => UserType;
