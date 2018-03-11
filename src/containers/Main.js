import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { popRoute } from '../actions';
import TabsScreen from './TabsScreen';

class Main extends React.Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    const { navigation, pop } = this.props;
    const { index } = navigation.state;
    if (index !== 0) {
      pop();
      return true;
    }
    if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
      BackHandler.exitApp();
      return false;
    }
    this.lastBackPressed = Date.now();
    Toast.show('再按一次退出应用');
    return true;
  }
  render() {
    return <TabsScreen midPress={this.midPress} />;
  }
}
Main.navigationOptions = {
  header: null,
};
Main.propTypes = {
  pop: PropTypes.func,
  navigation: PropTypes.object,
};
export default connect(null, { pop: popRoute })(Main);
