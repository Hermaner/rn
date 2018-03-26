import React from 'react';
import { View, BackHandler } from 'react-native';
import { Container, Content } from 'native-base';
import { CachedImage } from 'react-native-img-cache';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { Header, Loading } from '../../components';
import base from './base';
import styles from './styles';

import Child from './child';

class NewcomerStudy extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    this.getData();
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  _renderBody() {
    const { goodsItems, backImg } = this.state;
    return (
      <View style={styles.pagebody}>
        {
          backImg !== '' &&
          <CachedImage resizeMode="stretch" style={styles.image} source={{ uri: backImg }} />
        }
        <View style={{ flex: 1 }}>
          <Child
            data={goodsItems}
          />
        </View>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="慧包在线交易新手指导" />
        <Content>
          {this._renderBody()}
        </Content>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

NewcomerStudy.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(NewcomerStudy);
