import React from 'react';
import { View } from 'react-native';
import { Container, Content, Input, Icon, Text } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { Header } from '../../components';
import talkBusinessBase from './base';
import styles from './styles';

class TalkBusiness extends talkBusinessBase {
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
    return (
      <View style={styles.pagebody}>
        <View style={styles.isConcern}>
          <Text style={styles.isConcernLeft}>你们是陌生人,关注他,方便联系</Text>
          <Text style={styles.isConcernRight}>立即联系</Text>
        </View>
      </View>
    );
  }
  _rendFooter() {
    return (
      <View style={styles.footer}>
        <View style={styles.talkRow}>
          <View>
            <Icon style={styles.voice} name="arrow-back" />
          </View>
          <Input
            style={styles.inputs}
            placeholder="请输入消息"
          />
          <Icon style={styles.look} name="arrow-back" />
          <Icon style={styles.addImg} name="arrow-back" />
        </View>
        {
          true &&
          <View style={styles.add}>
            <View style={styles.flexOne}>
              <Icon style={styles.addIcn} name="arrow-back" />
              <Text style={styles.addText}>相册</Text>
            </View>
            <View style={styles.flexOne}>
              <Icon style={styles.addIcn} name="arrow-back" />
              <Text style={styles.addText}>拍摄</Text>
            </View>
            <View style={styles.flexOne}>
              <Icon style={styles.addIcn} name="arrow-back" />
              <Text style={styles.addText}>快捷短语</Text>
            </View>
            <View style={styles.flexOne}>
              <Icon style={styles.addIcn} name="arrow-back" />
              <Text style={styles.addText}>发送货品</Text>
            </View>
          </View>
        }
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="姓名" />
        <Content contentContainerStyle={{ flex: 1 }}>
          {this._renderBody()}
          {this._rendFooter()}
        </Content>
      </Container>
    );
  }
}

TalkBusiness.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(TalkBusiness);
