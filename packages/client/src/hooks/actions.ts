import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { userAction } from '@/store/stores/storeUser';
import { mainAction } from "@/store/stores/storeMain";

const actions = {
  ...userAction,
  ...mainAction
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
