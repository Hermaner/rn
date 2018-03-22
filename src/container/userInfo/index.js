import React from 'react';
import { View, BackHandler } from 'react-native';
import { Container, Content, Text, Input } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { Header, TFeedback, Loading, PeopleUploadFile } from '../../components';
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
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    this.getInit();
    this.initData();
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  _renderBody() {
    const { phone, fullAddress, myAdress, name } = this.state;
    const { info, set } = this.props.navigation.state.params;
    const { push } = this.props;
    return (
      <View style={styles.pagebody}>
        <View style={styles.rowBox}>
          <Text style={styles.leftText}>头像</Text>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
            {/* <CachedImage style={styles.lookForImg} source={{ uri: info.imgUrl }} /> */}
            <PeopleUploadFile
              getImages={this.getImages1}
              label=""
              imageCount={100}
            />
          </View>
        </View>
        <View style={styles.rowBox}>
          <Text style={styles.leftText}>姓名</Text>
          <Input
            value={name}
            onChangeText={text => this.saveName(text)}
            placeholderTextColor="#999"
            style={styles.inputs}
            placeholder={info.nickName}
          />
        </View>
        <View style={styles.rowBox}>
          <Text style={styles.leftText}>手机</Text>
          <Input
            value={phone}
            onChangeText={text => this.savePhone(text)}
            placeholderTextColor="#999"
            style={styles.inputs}
            editable={false}
          />
        </View>
        <TFeedback
          content={
            <View style={styles.rowBox}>
              <Text style={styles.leftText}>联系地址</Text>
              {
                set ?
                  <Text style={styles.chooseAdress}>
                    {myAdress === '' ? info.provinceName + info.cityName + info.districtName : myAdress}
                  </Text>
                :
                  <Text style={styles.chooseAdress}>{myAdress === '' ? '点击选择您的地址' : myAdress}</Text>
              }
            </View>}
          onPress={() => { push({ key: 'CgyCitys', params: { type: 'userInfoEmit' } }); }}
        />
        <View style={styles.rowBox}>
          <Input
            value={fullAddress}
            onChangeText={text => this.saveFullAddress(text)}
            placeholderTextColor="#999"
            style={styles.inputs}
            placeholder={set ? info.address : '请输入详细地址，不超过30个字'}
          />
        </View>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="个人信息" />
        <Content style={{ backgroundColor: '#fff' }}>
          {this._renderBody()}
          <TFeedback
            content={
              <View style={styles.button}>
                <Text style={styles.buttonText}>提交</Text>
              </View>}
            onPress={() => this.reviseUserInfo()}
          />
        </Content>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

UserInfo.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(UserInfo);
