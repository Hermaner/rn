import React from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    padding: 12,
    backgroundColor: '#000',
    borderRadius: 8,
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinnerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    marginTop: 4,
  },
});

export default class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
    };
  }
  toggle() {
    this.setState({
      isShow: !this.state.isShow,
    });
  }
  render() {
    if (this.state.isShow) {
      return (
        <View style={styles.container}>
          <View style={styles.loadingContainer}>
            <View style={styles.spinnerContainer}>
              <ActivityIndicator
                animating
                size="large"
                color="#fff"
              />
            </View>
          </View>
        </View>
      );
    }
    return null;
  }
}
