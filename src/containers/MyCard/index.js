import React from 'react';
import { View, Image, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Text, Content, Icon, Footer } from 'native-base';
import { connect } from 'react-redux';
import { observer } from 'mobx-react/native';
import { CachedImage } from 'react-native-img-cache';
import { popRoute, pushRoute } from '../../actions';
import { Loading, TOpacity, Header, UserSocket, TitleItem } from '../../components';
import base from './base';
import styles from './styles';

@observer
class MyCard extends base {
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
  }
  _renderTop() {
    const { userData: { imgUrl, phone } } = UserSocket;
    return (
      <View style={styles.top}>
        <View style={styles.cardView}>
          <Image source={require('../../assets/img/card.png')} style={styles.cardbg} />
          <CachedImage
            source={
              imgUrl ? { uri: imgUrl } : require('../../assets/img/tx.png')}
            style={styles.cardLogo}
          />
          <View style={styles.cardContentView}>
            <View style={styles.isMemView}>
              <Icon name="logo-vimeo" style={styles.glod} />
              <Text style={styles.memText}>普通会员</Text>
            </View>
            {
              phone ?
                <Text style={styles.memText}>卡号：{phone}</Text>
                :
                <TOpacity
                  content={
                    <Text style={styles.tapText}>请先绑定手机号</Text>
                  }
                  onPress={() => this.props.push({ key: 'BindPhone' })}
                />
            }
          </View>
        </View>
        <View style={styles.tips}>
          <Text style={styles.tipsText}>充值达1000成平台会员</Text>
          <Text style={styles.tipsText}>平台会员可享生日优惠、商品优惠、限时优惠等</Text>
        </View>
      </View>
    );
  }
  _renderIcons() {
    return (
      <View style={styles.icons}>
        <View style={styles.iconList}>
          <Icon name="ios-flame" style={styles.iconType} />
          <View style={styles.iconBom}>
            <Text style={styles.text}>余额</Text>
            <Text style={styles.text}>22元</Text>
          </View>
        </View>
        <View style={styles.iconList}>
          <Icon name="ios-list-box-outline" style={styles.iconType} />
          <Text style={styles.text}>充值记录</Text>
        </View>
        <View style={styles.iconList}>
          <Icon name="ios-settings-outline" style={styles.iconType} />
          <Text style={styles.text}>密码设置</Text>
        </View>
      </View>
    );
  }
  _renderLists() {
    const { items } = this.state;
    return (
      <View>
        <TitleItem text="充值列表" />
        <View style={styles.lists}>
          {
            items.map((item, index) => (
              <TOpacity
                style={styles.list}
                key={index}
                content={
                  <View style={[styles.listView, item.cur && styles.listCur]}>
                    <Text style={styles.listTextCur}>充{item.salesPrice}得{item.amount}</Text>
                    <Text style={styles.listViewText}>售价{item.salesPrice}元</Text>
                  </View>
                }
                onPress={() => this.changeTab(index)}
              />
            ))
          }
        </View>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header
          back={pop}
          title="我的会员卡"
        />
        <Content>
          {this._renderTop()}
          {this._renderIcons()}
          {this._renderLists()}
        </Content>
        <Footer style={styles.footer}>
          <TOpacity
            style={styles.btnView}
            content={
              <Text style={styles.btnText}>立即充值</Text>
            }
            onPress={this.CreateRechargeOrderService}
          />
        </Footer>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

MyCard.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MyCard);
