import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Input, Button, Text, Icon, Footer } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { Header, Loading, TitleItem, TOpacity, UploadFile } from '../../components';
import base from './base';
import styles from './styles';

class ApplyBmMarket extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    this.getInit();
  }
  componentWillUnmount() {
    this.deleteInit();
  }
  _renderUser() {
    const { contacts, phone, code, sec } = this.state;
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
              value={contacts}
              onChangeText={value => this.setState({ contacts: value })}
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
      </View>
    );
  }
  _renderStore() {
    const { bmMarketName, detail, businessHours, addressTitle, address } = this.state;
    return (
      <View style={styles.mainList}>
        <TitleItem text="店铺信息" />
        <View style={styles.listView}>
          <Text style={styles.listLabel}>店铺名称</Text>
          <View style={styles.listRight}>
            <Input
              style={styles.listInput}
              placeholderTextColor="#999"
              placeholder="至少5字"
              clearButtonMode="while-editing"
              value={bmMarketName}
              onChangeText={value => this.setState({ bmMarketName: value })}
            />
          </View>
        </View>
        <View style={styles.listView}>
          <Text style={styles.listLabel}>营业时间</Text>
          <View style={styles.listRight}>
            <Input
              style={styles.listInput}
              placeholderTextColor="#999"
              placeholder="例：周一到周日 8:00-22:00"
              clearButtonMode="while-editing"
              value={businessHours}
              onChangeText={value => this.setState({ businessHours: value })}
            />
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
        <View style={[styles.listView, styles.memoView]}>
          <Text style={styles.memoLabel}>店铺介绍</Text>
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
        <TitleItem text="上传店铺图片" />
        <Text style={styles.cardTips}>至少上传2张您的店铺图片</Text>
        <UploadFile
          getImages={this.getImages}
          label="上传店铺图片"
          imageCount={3}
        />
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="建材市场入驻" />
        <Content>
          {this._renderUser()}
          {this._renderStore()}
          {this._renderImages()}
        </Content>
        <Footer style={styles.footer}>
          <TOpacity
            style={styles.btnView}
            content={
              <Text style={styles.btnText}>{'立即申请'}</Text>
            }
            onPress={this.AuthBmMarketService}
          />
        </Footer>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

ApplyBmMarket.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(ApplyBmMarket);
