import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute } from '../actions';
import TabsScreen from './TabsScreen';

class Main extends React.Component {
  componentDidMount() {
  }
  render() {
    return <TabsScreen />;
  }
}
Main.navigationOptions = {
  header: null,
};

Main.propTypes = {
  push: PropTypes.func,
};

export default connect(null, { push: pushRoute })(Main);
