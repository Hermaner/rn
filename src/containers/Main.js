import React from 'react';
import Toast from 'react-native-simple-toast';
import { BackHandler, View, Text } from 'react-native';
import TabsScreen from './TabsScreen';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }
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
  }
  midPress = () => {
    this.setState({
      show: true,
    });
  }
  _renderModal() {
    const { show } = this.state;
    return (
      <View>
        {
          show ?
            <Text>12313123123</Text>
            :
            <Text>11111</Text>
        }
      </View>
    );
  }
  render() {
    return <TabsScreen midPress={this.midPress} />;
  }
}
Main.navigationOptions = {
  header: null,
};

export default Main;
