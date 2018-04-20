import React from 'react';
import { View, Text, BackHandler } from 'react-native';
import { Container, Content } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header, TOpacity } from '../../components';
import { pushRoute, popRoute } from '../../actions';
import seePriceBase from './base';
import styles from './styles';

class SeePrice extends seePriceBase {
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
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  _renderBody() {
    const { info } = this.state;
    return (
      <View style={styles.pagebody}>
        {
          info &&
          info.map((item, index) => (
            <View key={index} style={styles.listInem}>
              <View style={styles.rowBox}>
                <Text style={styles.normalText}>{decodeURI(item.nickName)}</Text>
                <Text style={[styles.normalText, styles.textRight]}>{item.postDate}</Text>
              </View>
              <View style={styles.rowBox}>
                <Text style={styles.normalText}>采购：{item.brandName}/{item.categoryName}</Text>
              </View>
              <View style={styles.rowBox}>
                <View style={styles.flexRow}>
                  <Text style={styles.normalText}>价格：</Text>
                  <Text style={styles.dText}>{item.price}</Text>
                  <Text style={styles.normalText}>元/{item.unit}</Text>
                </View>
                <View style={[styles.flexRow, styles.boxRight]}>
                  <Text style={styles.normalText}>供应量：</Text>
                  <Text style={styles.dText}>{item.supplCount}</Text>
                  <Text style={styles.normalText}>{item.unit}</Text>
                </View>
              </View>
              <View style={styles.rowBox}>
                <Text style={styles.normalText}>
                  供货地：{item.supplyProvinceName}{item.supplyCityName}</Text>
              </View>
              <View style={styles.rowBox}>
                <Text style={styles.normalText}>联系方式：{item.phone}</Text>
              </View>
              <View style={[styles.rowBox, styles.boxRight]}>
                <TOpacity
                  style={styles.btnRightBox}
                  content={
                    <Text style={styles.btnText}>
                      查看供应信息
                    </Text>
                  }
                  onPress={() => { this.props.push({ key: 'GoodDetail', params: { supplyId: item.supplyId, memberId: item.memberId } }); }}
                />
                <View style={styles.btnRightBox}>
                  <Text style={styles.btnText}>聊生意</Text>
                </View>
              </View>
            </View>
          ))
        }
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="查看报价" />
        <Content>
          {this._renderBody()}
        </Content>
      </Container>
    );
  }
}

SeePrice.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(SeePrice);
