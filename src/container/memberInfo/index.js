import React from 'react';
import { View, BackHandler } from 'react-native';
import { Container, Content, Text, Input, Icon } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { Header, TFeedback, Loading, UploadLogo, Select, TOpacity } from '../../components';
import memberInfo from './base';
import styles from './styles';

class MemberInfo extends memberInfo {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      swiperData: [],
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    this.getInit();
    this.initData();
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    this.getDelete();
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  _renderBody() {
    const { push } = this.props;
    const { userInfo, set, myAdress, role, identityName, sex, name } = this.state;
    const type = role === '1' ? '买家' : role === '2' ? '卖家' : '';
    return (
      <View style={styles.pagebody}>
        <View style={styles.rowBox}>
          <Text style={styles.leftText}>姓名</Text>
          <Input
            value={name}
            onChangeText={(text) => {
              this.setState({
                name: text,
              });
            }}
            style={styles.inputs}
          />
        </View>
        <View style={styles.rowBox}>
          <Text style={styles.leftText}>性别</Text>
          <TOpacity
            style={styles.listOp}
            content={
              <View style={styles.tabView}>
                <Text style={sex ? styles.tabTextCur : styles.tabText}>{sex || '请选择性别'}</Text>
                <Icon name="md-arrow-dropright" style={styles.arr} />
              </View>
            }
            onPress={this.chooseType}
          />
        </View>
        <View style={styles.rowBox}>
          <Text style={styles.leftText}>身份</Text>
          <TOpacity
            style={styles.listOp}
            content={
              <View style={styles.tabView}>
                {
                  type ?
                    <Text style={styles.tabTextCur}>{type}{identityName}</Text>
                  :
                    <Text style={styles.tabText}>点击选择身份</Text>
                }
                <Icon name="md-arrow-dropright" style={styles.arr} />
              </View>
            }
            onPress={() => { push({ key: 'AdjectiveInfo', params: { type: 'memberInfoEmitUserType', userType: userInfo.role, identityName: userInfo.identityName } }); }}
          />
        </View>
        <View style={styles.rowBox}>
          <Text style={styles.leftText}>绑定手机号</Text>
          <TOpacity
            style={styles.listOp}
            content={
              <View style={styles.tabView}>
                <Text style={userInfo.phone ? styles.tabTextCur : styles.tabText}>{userInfo.phone || '点击绑定手机号'}</Text>
                <Icon name="md-arrow-dropright" style={styles.arr} />
              </View>
            }
            onPress={() => { push({ key: 'RevisePhone' }); }}
          />
        </View>
        <View style={styles.rowBox}>
          <Text style={styles.leftText}>联系地址</Text>
          <TOpacity
            style={styles.listOp}
            content={
              <View style={styles.tabView}>
                {
                  set ?
                    <Text numberOfLines={1} style={styles.tabTextCur}>
                      {myAdress === '' ? userInfo.provinceName + userInfo.cityName + userInfo.districtName : myAdress}
                    </Text>
                  :
                    <Text numberOfLines={1} style={myAdress === '' ? styles.tabText : styles.tabTextChoose}>{myAdress === '' ? '点击选择您的地址' : myAdress}</Text>
                }
                <Icon name="md-arrow-dropright" style={styles.arr} />
              </View>
            }
            onPress={() => { push({ key: 'CgyCitys', params: { type: 'memberInfoEmit' } }); }}
          />
        </View>
        <View style={styles.rowBox}>
          <Text style={styles.leftText}>密码修改</Text>
          <TOpacity
            style={styles.listOp}
            content={
              <Text style={styles.setPassword}>设置登录密码</Text>
            }
            onPress={() => push({ key: 'RevisePassword', params: { phone: userInfo.phone } })}
          />
        </View>
      </View>
    );
  }
  _renderLogo() {
    const { initImage } = this.state;
    return (
      <View>
        <UploadLogo
          initImage={initImage}
          getImages={this.getImages}
        />
      </View>
    );
  }
  _renderSelect() {
    const { sex, options, selectShow } = this.state;
    return (
      <Select
        selectShow={selectShow}
        value={sex}
        items={options}
        title="请选择性别"
        closeModal={this.closeModal}
        onValueChange={value => this.selectModel(value)}
      />
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="个人信息" />
        <Content style={{ backgroundColor: '#fff', paddingBottom: 30 }}>
          {this._renderLogo()}
          {this._renderBody()}
          <TFeedback
            content={
              <View style={styles.button}>
                <Text style={styles.buttonText}>提交</Text>
              </View>}
            onPress={() => this.reviseUserInfo()}
          />
        </Content>
        {this._renderSelect()}
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

MemberInfo.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MemberInfo);
