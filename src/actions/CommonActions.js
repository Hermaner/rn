import * as ActionsTypes from './types';

export const SleekShow = () => (
  {
    type: ActionsTypes.LOADING_SLEEK_SHOW,
  }
);

export const SleekHide = () => (
  {
    type: ActionsTypes.LOADING_SLEEK_HIDE,
  }
);
export const popRoute = () => (
  {
    type: 'pop',
  }
);
export const resetTwo = () => (
  {
    type: 'resetTwo',
  }
);
export const pushRoute = value => (
  {
    type: 'push',
    routes: value,
  }
);
export const CommonError = value => (
  {
    type: ActionsTypes.COMMON_ERROR,
    payload: value,
  }
);
export const TextUpdate = ({ prop, value }) => (
  {
    type: 'TEXT_UPDATE',
    payload: { prop, value },
  }
);
export const TextClear = () => (
  {
    type: 'TEXT_CLEAR',
  }
);
