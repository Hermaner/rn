import { NavigationActions, StateUtils } from 'react-navigation';

import { AppNavigator } from '../navigators/AppNavigator';


const initialNavState = {
  index: 0,
  routes: [
    { key: 'Login', routeName: 'Login' },
  ],
};
function nav(state = initialNavState, action) {
  let nextState;
  switch (action.type) {
    case 'pop':
      nextState = AppNavigator.router.getStateForAction(NavigationActions.back(), state);
      break;
    case 'push':
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate(
        { routeName: action.routes.key, params: action.routes.params }), state);
      break;
    case 'resetTwo':
      state.routes.splice(state.routes.length - 2, 2);
      nextState = StateUtils.reset(state, [...state.routes]);
      break;
    case 'Login':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.back(),
        state,
      );
      break;
    case 'Logout':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Login' }),
        state,
      );
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}
export default nav;
