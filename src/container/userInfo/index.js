import React from 'react';
import { TouchableHighlight, TouchableOpacity, View, TextInput, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { Container, Content, Picker, Item, Text, Input, Label } from 'native-base';
import PropTypes from 'prop-types';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { Header } from '../../components';
import userInfoBase from './base';
import styles from './styles';

class UserInfo extends userInfoBase {
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
        <View style={styles.rowBox}>
          <Text style={styles.leftText}>姓名</Text>
          <Text style={{ height: 40, lineHeight: 40 }}>刘德华</Text>
        </View>
        <View style={styles.rowBox}>
          <Text style={styles.leftText}>手机</Text>
          <Input placeholderTextColor="#999" style={styles.inputs} placeholder="请输入手机号码" />
        </View>
        <View style={styles.rowBox}>
          <Text style={styles.leftText}>联系地址</Text>
          <Text style={styles.chooseAdress}>点击选择您的地址</Text>
        </View>
        <View style={styles.rowBox}>
          <Input placeholderTextColor="#999" style={styles.inputs} placeholder="请输入详细地址，不超过30个字" />
        </View>
      </View>
    )
  }
  render() {
    const { pop, push } = this.props;
    return (
      <Container>
        <Header back={pop} title="个人信息" />
        <Content style={{ backgroundColor: '#fff' }}>
          {this._renderBody()}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>提交</Text>
          </TouchableOpacity>
        </Content>
      </Container>
    );
  }
}

UserInfo.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(UserInfo);
