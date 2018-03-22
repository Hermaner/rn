import React from 'react';
import { StyleSheet, Text, View, Button, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute } from '../../actions';
import base from './base';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

class MainScreen extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      condition: '',
      ip: '',
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageView}>
          <Text style={styles.version}>当前版本：carts{this.state.type}</Text>
        </View>
        <Button
          onPress={() => this.setState({
            type: 2,
          })}
          title="Profile"
        />
      </View>
    );
  }
}

MainScreen.propTypes = {
  push: PropTypes.func,
};
export default connect(null, { push: pushRoute })(MainScreen);
