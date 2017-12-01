import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
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
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageView}>
          <Text style={styles.version}>当前版本：mine{this.state.type}</Text>
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
