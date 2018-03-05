import React from 'react';
import { View, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { CachedImage } from 'react-native-img-cache';
import { Container, Content, Text, Icon, Footer } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { Loading, TFeedback, Header, TOpacity, TitleItem, InputNumber } from '../../components';
import base from './base';
import styles from './styles';

class ServiceDetail extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    this.getInit();
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  _renderMain() {
    const { bz, count, info } = this.state;
    return (
      <View style={styles.mainView}>
        <View style={styles.nameView}>
          <Text style={styles.nameText}>
            {info.name}
          </Text>
          <InputNumber
            onChange={c => this.setState({ count: c })}
            value={count}
            min={1}
          />
        </View>
        <View style={styles.priceView}>
          <Text style={styles.priceText}>
            {info.salesPrice}元/次
          </Text>
          <Text style={styles.salesText}>
            已售出{info.sales || 0}
          </Text>
        </View>
        <View style={styles.bzView}>
          {
            bz.map((item, index) => (
              <View key={index} style={styles.bzList}>
                <Icon ref={(component) => { this._stepDownText = component; }} name="ios-checkmark-circle" style={styles.bzIcon} />
                <Text style={styles.bzText}>
                  {item.label}
                </Text>
              </View>
            ))
          }
        </View>
      </View>
    );
  }
  _renderIntr() {
    const { info } = this.state;
    return (
      <View style={styles.intrView}>
        <TitleItem text="服务介绍" />
        <View style={styles.intrTextView}>
          <Text style={styles.intrText}>
            {info.detail}
          </Text>
        </View>
        <TitleItem text="订购须知" />
        <View style={styles.intrTextView}>
          <Text style={styles.intrText}>
            1.下单成功后，“孙猴上门”的师傅会在30分钟内联系客户，与客户确认订单;</Text><Text style={styles.intrText}>
2.此价格仅为师傅上门的人工服务费，不包含配件及材料费；可根据您的需求选择服务类型及数量下单；如需其他服务，可重新下单；</Text><Text style={styles.intrText}>
      3.师傅上门后，如因客户原因取消订单的，则扣除30元/单（空单费），因此请您谨慎下单；</Text><Text style={styles.intrText}>
      如因师傅原因，上门后取消订单的，则退回客户全部相关费用；</Text><Text style={styles.intrText}>
4.为了保障您的权益，所有订单请通过“孙猴上门”平台下单支付；如需现场增加服务项目，可根据服务项目价格，在原有订单上补差价；如客户与师傅私下商定服务交易，平台不承担相应的责任和后续的质保服务；
          </Text>
        </View>
      </View>
    );
  }
  _renderFooter() {
    const { footIcons, isColl } = this.state;
    return (
      <Footer style={styles.footer}>
        <View style={styles.footIcons}>
          {
            footIcons.map((item, index) => (
              <TFeedback
                key={index}
                content={
                  <View style={styles.footIconView}>
                    <Icon
                      name={item.icon}
                      style={[styles.footIcon, index === 2 && isColl && styles.footIconCur]}
                    />
                    <Text
                      style={[styles.footIconText, index === 2 && isColl && styles.footIconTextCur]}
                    >
                      {index === 2 && isColl ? '已收藏' : item.label}
                    </Text>
                  </View>
                }
                onPress={() => { this.footAction(index); }}
              />
            ))
          }
        </View>
        <TOpacity
          style={styles.footBtn}
          content={
            <View style={styles.footBtnView}>
              <Text style={styles.footBtnText}>购买服务</Text>
            </View>
          }
          onPress={this.createService}
        />
      </Footer>
    );
  }
  render() {
    const { info } = this.state;
    const { pop } = this.props;
    if (!info) {
      return (<Loading ref={(c) => { this.sleek = c; }} />);
    }
    return (
      <Container>
        <Header back={pop} title="服务详情" />
        <Content>
          <View style={styles.topView}>
            <CachedImage source={{ uri: info.imgUrl.split(',')[0] }} style={styles.topImg} />
          </View>
          {this._renderMain()}
          {this._renderIntr()}
        </Content>
        {this._renderFooter()}
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

ServiceDetail.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(ServiceDetail);
