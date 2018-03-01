import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { CachedImage } from 'react-native-img-cache';
import { Container, Text, Content } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { Loading, BHeader, TitleItem, ImageLook } from '../../components';
import base from './base';
import styles from './styles';
import { deviceW } from '../../utils';

class MgMasterSetting extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  _renderList() {
    const { info } = this.state;
    return (
      <View>
        <View style={styles.listView}>
          <Text style={styles.listLabel}>真实姓名</Text>
          <View style={styles.listRight}>
            <Text style={styles.listText}>
              {info.realName}
            </Text>
          </View>
        </View>
        <View style={styles.listView}>
          <Text style={styles.listLabel}>身份证号</Text>
          <View style={styles.listRight}>
            <Text style={styles.listText}>
              {info.identityCard}
            </Text>
          </View>
        </View>
        <View style={styles.listView}>
          <Text style={styles.listLabel}>性别</Text>
          <View style={styles.listRight}>
            <Text style={styles.listText}>
              {info.memberInfo.sex === 1 ? '男' : '女'}
            </Text>
          </View>
        </View>
        <View style={styles.listView}>
          <Text style={styles.listLabel}>注册日期</Text>
          <View style={styles.listRight}>
            <Text style={styles.listText}>
              {info.postDate}
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
          <CachedImage source={{ uri: info.imgUrl }} style={styles.logo} />
        </View>
      </View>
    );
  }
  _renderCard() {
    const { info } = this.state;
    return (
      <View>
        <TitleItem text="我的身份证照" />
        <ImageLook
          width={(deviceW / 3) - 30}
          images={[info.firstImage, info.twoImage, info.threeImage]}
        />
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <BHeader back={pop} title="我的基本信息" />
        <Content style={styles.content}>
          {this._renderLogo()}
          {this._renderList()}
          {this._renderCard()}
        </Content>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

MgMasterSetting.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MgMasterSetting);
