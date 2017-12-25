import { NavigationActions } from 'react-navigation';

import { AppNavigator } from '../navigators/AppNavigator';


const initialNavState = {
  index: 0,
  routes: [
    { key: 'Main', routeName: 'Main' },
  ],
};
function nav(state = initialNavState, action) {
  let nextState;
  const newRoutes = [];
  switch (action.type) {
    case 'pop':
      nextState = AppNavigator.router.getStateForAction(NavigationActions.back(), state);
      break;
    case 'push':
      nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate(
        { routeName: action.routes.key, params: action.routes.params }), state);
      break;
    case 'resetTo':
      state.routes.forEach((item, index) => {
        if (index < state.routes.length - action.routes.num) {
          newRoutes.push(item);
        }
      });
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.reset({
          index: state.index - action.routes.num,
          actions: newRoutes.map(item => NavigationActions.navigate(
            { routeName: item.routeName, params: item.params || {} },
          )),
        })
      , state);
      break;
    case 'resetHome':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.reset(initialNavState)
      , state);
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}
export default nav;
