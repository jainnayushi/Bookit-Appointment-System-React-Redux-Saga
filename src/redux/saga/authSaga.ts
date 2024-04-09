import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import {
  LOGIN,
  LOGIN_SAGA,
  LOGOUT,
  LOGOUT_SAGA,
} from '../constant/authConstant';
import { LoginActionType, LogoutActionType } from '../types/authType';
import { SagaIterator } from 'redux-saga';

function* loginSaga(action: LoginActionType): SagaIterator {
  try {
    const response = yield call(
      axios.post,
      'https://psl-test2-b8593d29856b.herokuapp.com/api/v1/session',
      action.payload,
    );
    yield put({
      type: LOGIN_SAGA,
      token: response?.data?.user?.authentication?.token,
      role: response?.data?.user?.role,
    });
  } catch (error) {
    if (error.response && error.response.status === 401)
      yield put({
        type: LOGIN_SAGA,
        status: 'invalid',
        message: 'Unauthorized access. Please login again!',
      });
    console.error('Error fetching login details:', error);
  }
}

function* logoutSaga(action: LogoutActionType): SagaIterator {
  try {
    yield call(
      axios.delete,
      'https://psl-test2-b8593d29856b.herokuapp.com/api/v1/session',
      {
        headers: {
          Authorization: `Bearer ${action.token}`,
        },
      },
    );
    yield put({
      type: LOGOUT_SAGA,
      token: '',
      role: '',
    });
  } catch (error) {
    console.error('Error logging out :', error);
  }
}

function* productSaga() {
  yield takeEvery(LOGIN, loginSaga);
  yield takeEvery(LOGOUT, logoutSaga);
}

export default productSaga;
