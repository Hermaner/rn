import React from 'react';
import { AppRegistry, AsyncStorage, Platform } from 'react-native';
import StatusBarAndroid from 'react-native-android-statusbar';
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
    if (Platform.OS === 'android') {
      StatusBarAndroid.hideStatusBar();
      StatusBarAndroid.setHexColor('#AB1223');
    }
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
