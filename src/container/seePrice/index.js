import React from 'react';
import { View, Text } from 'react-native';
import { Container, Content, Icon, Input } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header } from '../../components';
import { pushRoute, popRoute } from '../../actions';
import seePriceBase from './base';
import styles from './styles';

class SeePrice extends seePriceBase {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      swiperData: [],
    };
  }
  componentDidMount() {
  }
  goRoute = (key) => {
    this.props.push(key);
  }
  _renderBody() {
    const { push, pop } = this.props;
    const { name } = this.props.navigation.state.params;
    return (
      <View style={styles.pagebody}>

      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="取现" />
        <Content>
          {this._renderBody()}
        </Content>
      </Container>
    );
  }
}

SeePrice.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(SeePrice);
