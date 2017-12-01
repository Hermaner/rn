import React from 'react';
import { AppRegistry, AsyncStorage } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import * as WeChat from 'react-native-wechat';
import {
  persistStore,
  autoRehydrate,
} from 'redux-persist';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';

import AppReducer from './src/reducers';
import AppWithNavigationState from './src/navigators/AppNavigator';

class App extends React.Component {
  componentDidMount() {
    SplashScreen.hide();
    WeChat.registerApp('wx26b5853e6e77d138');
    persistStore(this.store, { storage: AsyncStorage });
  }
  store = createStore(
    AppReducer,
    compose(
    applyMiddleware(
      thunk,
    ),
  ), autoRehydrate());
  render() {
    return (
      <Provider store={this.store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('App', () => App);

export default App;
