import { useSelector } from 'react-redux';
import { StateType } from '../utils/types';

function useAuthRole() {
  const role = useSelector((state: StateType) => state.authData.role);
  return role;
}

export default useAuthRole;
