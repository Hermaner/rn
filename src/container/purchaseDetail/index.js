import React from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import { Container, Content, Icon, Text } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { Header } from '../../components';
import purchaseDetailBase from './base';
import styles from './styles';

class PurchaseDetail extends purchaseDetailBase {
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
        <View style={styles.endTime}>
          <Text style={{ color: '#333', fontSize: 14 }}>报价结束时间：</Text>
          <Text style={{ color: '#FC801B', fontSize: 18 }}>36天</Text>
          <Icon style={styles.closeIcon} name="arrow-back" />
        </View>
        <View style={styles.userImg}>
          <Image style={styles.img} source={require('../app/resource/imgs/avatar.jpg')} />
          <View style={styles.userInfo}>
            <Text style={styles.purchaseCount}>江苏省南京市</Text>
          </View>
        </View>
        <View style={styles.needGoodsDetail}>
          <View style={styles.rowBox}>
            <View style={[styles.boderOne, styles.diffentBackground]}>
              <Text style={styles.flexOne}>采购货品</Text>
            </View>
            <View style={styles.boderTwo}>
              <Text style={[styles.flexTwo, styles.text6]}>枫树</Text>
            </View>
          </View>
          <View style={styles.rowBox}>
            <View style={[styles.boderOne, styles.diffentBackground]}>
              <Text style={styles.flexOne}>期望价格</Text>
            </View>
            <View style={styles.boderTwo}>
              <Text style={[styles.flexTwo, styles.text7]}>面议</Text>
            </View>
          </View>
          <View style={styles.rowBox}>
            <View style={[styles.boderOne, styles.diffentBackground]}>
              <Text style={styles.flexOne}>需求量</Text>
            </View>
            <View style={styles.boderTwo}>
              <Text style={[styles.flexTwo, styles.text7]}>400棵</Text>
            </View>
          </View>
          <View style={styles.rowBox}>
            <View style={[styles.boderOne, styles.diffentBackground]}>
              <Text style={styles.flexOne}>期望货源地</Text>
            </View>
            <View style={styles.boderTwo}>
              <Text style={[styles.flexTwo, styles.text6]}>江苏省南京市</Text>
            </View>
          </View>
          <View style={styles.rowBox}>
            <View style={[styles.boderOne, styles.diffentBackground]}>
              <Text style={styles.flexOne}>所在地</Text>
            </View>
            <View style={styles.boderTwo}>
              <Text style={[styles.flexTwo, styles.text6]}>江苏省南京市</Text>
            </View>
          </View>
          <View style={styles.rowBox}>
            <View style={[styles.boderOne, styles.diffentBackground]}>
              <Text style={styles.flexOne}>补充说明</Text>
            </View>
            <View style={styles.boderTwo}>
              <Text style={[styles.flexTwo, styles.text6]}>
                求购胸径10公分五角松,2.2至2.5分枝,杆直冒圆,一级货源,土球75公分,数量400棵,有货速度联系我
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="采购详情" />
        <Content>
          {this._renderBody()}
        </Content>
        {
          false &&
          <TouchableOpacity style={styles.footerBtn}>
            <Text style={styles.footerBtnText}>立即报价</Text>
          </TouchableOpacity>
        }
        {
          true &&
          <View style={styles.btnList}>
            <TouchableOpacity style={[styles.btnListOne, styles.leftBtn]}>
              <Text style={styles.footerBtnText}>立即报价</Text>
            </TouchableOpacity>
          </View>
        }
      </Container>
    );
  }
}

PurchaseDetail.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(PurchaseDetail);
