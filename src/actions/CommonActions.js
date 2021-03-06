import * as ActionsTypes from './types';

export const showSleek = () => (
  {
    type: 'showSleek',
  }
);

export const closeSleek = () => (
  {
    type: 'closeSleek',
  }
);
export const popRoute = () => (
  {
    type: 'pop',
  }
);
export const resetHome = () => (
  {
    type: 'resetHome',
  }
);
export const resetTwo = () => (
  {
    type: 'resetTwo',
  }
);
export const resetTo = routes => (
  {
    type: 'resetTo',
    routes,
  }
);
export const pushRoute = routes => (
  {
    type: 'push',
    routes,
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
