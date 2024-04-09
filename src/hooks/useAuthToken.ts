import { useSelector } from 'react-redux';
import { StateType } from '../utils/types';

function useAuthToken() {
  const token = useSelector((state: StateType) => state.authData.token);
  return token;
}

export default useAuthToken;
