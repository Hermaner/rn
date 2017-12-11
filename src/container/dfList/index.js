import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Header, Container, Icon, Content, Input, Button, Text } from 'native-base';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
import { popRoute, pushRoute } from '../../actions';
import { Header } from '../../components';
import base from './base';
import styles from './styles';

class MainScreen extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
  }
  _randerHeader() {
    const { pop } = this.props;
    const { searchVal } = this.state;
    return (
      <Header>
        <TouchableOpacity onPress={pop} style={styles.Headerleft}>
          <Icon name="arrow-back" />
        </TouchableOpacity>
      </Header>
    )
  }
  render() {
    const { phone, code, sec } = this.state;
    const { pop, push } = this.props;
    return (
      <Container>
      </Container>
    );
  }
}

MainScreen.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MainScreen);
