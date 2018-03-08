import React from 'react';
import { View, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { CachedImage } from 'react-native-img-cache';
import { Container, Text, Content } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { Loading, BHeader } from '../../components';
import base from './base';
import styles from './styles';

class MgDecorateSetting extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
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
  _renderList() {
    const { info } = this.state;
    return (
      <View>
        <View style={styles.listView}>
          <Text style={styles.listLabel}>公司名称</Text>
          <View style={styles.listRight}>
            <Text style={styles.listText}>
              {info.decorationName}
            </Text>
          </View>
        </View>
        <View style={styles.listView}>
          <Text style={styles.listLabel}>公司地址</Text>
          <View style={styles.listRight}>
            <Text style={styles.listText}>
              {info.address}
            </Text>
          </View>
        </View>
        <View style={styles.listView}>
          <Text style={styles.listLabel}>联系人</Text>
          <View style={styles.listRight}>
            <Text style={styles.listText}>
              {info.contacts}
            </Text>
          </View>
        </View>
        <View style={styles.listView}>
          <Text style={styles.listLabel}>手机号</Text>
          <View style={styles.listRight}>
            <Text style={styles.listText}>
              {info.phone}
            </Text>
          </View>
        </View>
      </View>
    );
  }
  _renderLogo() {
    const { info } = this.state;
    return (
      <View style={styles.logoMidView}>
        <View style={styles.logoView}>
          <CachedImage source={{ uri: `${info.imgUrl}?imageView2/1/w/100` }} style={styles.logo} />
        </View>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <BHeader back={pop} title="公司基本信息" />
        <Content style={styles.content}>
          {this._renderLogo()}
          {this._renderList()}
        </Content>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

MgDecorateSetting.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MgDecorateSetting);
