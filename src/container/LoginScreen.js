import React from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 80,
    height: 80,
  },
  version: {
    fontSize: 14,
    color: '#444',
    marginTop: 12,
  },
});
class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      condition: '',
      ip: '',
    };
  }
  componentDidMount() {
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageView}>
          <Text style={styles.version}>当前版本：</Text>
        </View>
      </View>
    );
  }
}
LoginScreen.navigationOptions = {
  title: 'login Screen',
};

export default LoginScreen;
