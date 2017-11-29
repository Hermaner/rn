import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute } from '../actions';

import AuthButton from './AuthButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

const MainScreen = ({ push }) => (
  <View style={styles.container}>
    <View>
      <Text style={styles.welcome}>
        {'You are "logged in" right now'}
      </Text>
      <Button
        onPress={() => push({ key: 'Home' })}
        title="Profile"
      />
    </View>
    <AuthButton />
  </View>
);

MainScreen.navigationOptions = {
  header: null,
};

MainScreen.propTypes = {
  push: PropTypes.func,
};

export default connect(null, { push: pushRoute })(MainScreen);
