import React from 'react';
import { View, BackHandler } from 'react-native';
import { Container, Content, Text } from 'native-base';
import { CachedImage } from 'react-native-img-cache';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { BHeader, TFeedback, Loading } from '../../components';
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
    const { goodsItems } = this.state;
    return (
      <View style={styles.pagebody}>
        {/* {
          img !== null && img !== null && img.split(',').length > 0 &&
          <CachedImage style={styles.image} source={{ uri: img.split(',')[0] }} />
        } */}
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
        <BHeader back={pop} title="慧包在线交易新手指导" />
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
