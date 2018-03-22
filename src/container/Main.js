import React from 'react';
import Toast from 'react-native-simple-toast';
import { BackHandler } from 'react-native';
import TabsScreen from './TabsScreen';

class Main extends React.Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
      BackHandler.exitApp();
      return false;
    }
    this.lastBackPressed = Date.now();
    Toast.show('再按一次退出应用');
    return true;
  };
  render() {
    return <TabsScreen />;
  }
}
Main.navigationOptions = {
  header: null,
};

export default Main;
