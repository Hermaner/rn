import React from 'react';
import { View, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Input, Button, Text, Icon, Footer } from 'native-base';
import { connect } from 'react-redux';
import Modal from 'react-native-modalbox';
import { popRoute, pushRoute } from '../../actions';
import { Header, Loading, TitleItem, TOpacity, UploadFile } from '../../components';
import base from './base';
import styles from './styles';

class ApplyMaster extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.pop();
      return true;
    });
    this.getInit();
  }
  componentWillUnmount() {
    this.deleteInit();
  }
  _renderUser() {
    const { realName, identityCard, phone, code, addressTitle, address, sec } = this.state;
    return (
      <View style={styles.mainList}>
        <TitleItem text="用户信息" />
        <View style={styles.listView}>
          <Text style={styles.listLabel}>真实姓名</Text>
          <View style={styles.listRight}>
            <Input
              style={styles.listInput}
              placeholderTextColor="#999"
              placeholder="至少2字"
              clearButtonMode="while-editing"
              value={realName}
              onChangeText={value => this.setState({ realName: value })}
            />
          </View>
        </View>
        <View style={styles.listView}>
          <Text style={styles.listLabel}>身份证号</Text>
          <View style={styles.listRight}>
            <Input
              style={styles.listInput}
              placeholderTextColor="#999"
              placeholder="请输入身份证号"
              clearButtonMode="while-editing"
              value={identityCard}
              onChangeText={value => this.setState({ identityCard: value })}
            />
          </View>
        </View>
        <View style={styles.listView}>
          <Text style={styles.listLabel}>手机号</Text>
          <View style={styles.listRight}>
            <Input
              style={styles.listInput}
              placeholderTextColor="#999"
              placeholder="11位手机号"
              clearButtonMode="while-editing"
              value={phone}
              onChangeText={value => this.setState({ phone: value })}
            />
          </View>
        </View>
        <View style={styles.listView}>
          <Text style={styles.listLabel}>验证码</Text>
          <View style={styles.listRight}>
            <Input
              style={styles.listInput}
              placeholderTextColor="#999"
              placeholder="请输入验证码"
              clearButtonMode="while-editing"
              value={code}
              onChangeText={value => this.setState({ code: value })}
            />
            <View>
              <Button light style={styles.sendBtn} disabled={this.isSend} onPress={this.sendCode}>
                <Text style={[styles.sendBtnText, this.isSend && styles.sendBtnCur]}>{this.isSend ? `${sec}s可重发` : '获取验证码'}</Text>
              </Button>
            </View>
          </View>
        </View>
        <View style={styles.listView}>
          <Text style={styles.listLabel}>所在地区</Text>
          <TOpacity
            style={styles.listRight}
            content={
              <View style={styles.areaView}>
                <Text style={[styles.areaText, { color: addressTitle.length > 0 ? '#333' : '#999' }]}>{addressTitle || '选择所在地区'}</Text>
                <Icon name="md-arrow-dropright" style={styles.arr} />
              </View>
            }
            onPress={() => this.props.push({ key: 'GetCitys', params: { type: 'emitArea' } })}
          />
        </View>
        <View style={styles.listView}>
          <Text style={styles.listLabel}>所在地址</Text>
          <View style={styles.listRight}>
            <Input
              style={styles.listInput}
              placeholderTextColor="#999"
              placeholder="至少5字"
              clearButtonMode="while-editing"
              value={address}
              onChangeText={value => this.setState({ address: value })}
            />
          </View>
        </View>
      </View>
    );
  }
  _renderService() {
    const { detail, masterTypeCount } = this.state;
    return (
      <View style={styles.mainList}>
        <TitleItem text="服务信息" />
        <View style={styles.listView}>
          <Text style={styles.listLabel}>擅长技能</Text>
          <TOpacity
            style={styles.listRight}
            content={
              <View style={styles.areaView}>
                <Text style={[styles.areaText, { color: masterTypeCount > 0 ? '#333' : '#999' }]}>{masterTypeCount > 0 ? `已选${masterTypeCount}项` : '请选择技能'}</Text>
                <Icon name="md-arrow-dropright" style={styles.arr} />
              </View>
            }
            onPress={() => this.setState({ ModalOpen: true })}
          />
        </View>
        <View style={[styles.listView, styles.memoView]}>
          <Text style={styles.memoLabel}>相关介绍</Text>
          <View style={styles.listRight}>
            <Input
              multiline
              style={styles.listMemo}
              placeholderTextColor="#999"
              placeholder="至少10字"
              clearButtonMode="while-editing"
              value={detail}
              onChangeText={value => this.setState({ detail: value })}
            />
          </View>
        </View>
      </View>
    );
  }
  _renderImages() {
    return (
      <View style={[styles.mainList, { paddingBottom: 10 }]}>
        <TitleItem text="上传认证图片" />
        <Text style={styles.cardTips}>请上传身份证正、反面及手持身份共3张（上身免冠照，五官清晰，身份证号码清晰）</Text>
        <UploadFile
          getImages={this.getImages}
          label="上传3张身份证照"
          imageCount={3}
        />
      </View>
    );
  }
  _renderModal() {
    const { ModalOpen, masterTypes } = this.state;
    return (
      <Modal
        style={styles.ModalStyle}
        position="top"
        onRequestClose={() => {}}
        entry="bottom"
        swipeToClose={false}
        animationDuration={250}
        onClosed={this.closeModal}
        isOpen={ModalOpen}
        coverScreen
        ref={(o) => { this.ModalView = o; }}
      >
        <Content style={styles.modalView}>
          {
            masterTypes.map((item, index) => (
              <View key={index} style={styles.list}>
                <View style={styles.title}>
                  <View style={styles.titleColor}>
                    <Icon name="md-apps" style={styles.titleIcon} />
                  </View>
                  <Text style={styles.listName}>{item.name}</Text>
                </View>
                <View style={styles.tabs}>
                  {
                    item.childs.map((list, i) => (
                      <TOpacity
                        key={i}
                        style={[styles.tab, list.cur && styles.tabCur]}
                        content={
                          <Text style={[styles.tabText, list.cur && styles.tabTextCur]}>
                            {list.name}
                          </Text>
                        }
                        onPress={() => this.tabTec(index, i)}
                      />
                    ))
                  }
                </View>
              </View>
            ))
          }
        </Content>
      </Modal>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="平台师傅申请" />
        <Content>
          {this._renderUser()}
          {this._renderService()}
          {this._renderImages()}
        </Content>
        <Footer style={styles.footer}>
          <TOpacity
            style={styles.btnView}
            content={
              <Text style={styles.btnText}>{'立即申请'}</Text>
            }
            onPress={this.AuthMasterService}
          />
        </Footer>
        {this._renderModal()}
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

ApplyMaster.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(ApplyMaster);
