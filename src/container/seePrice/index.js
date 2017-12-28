import React from 'react';
import { View, Text } from 'react-native';
import { Container, Content, Icon, Input } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header, TFeedback } from '../../components';
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
  }
  goRoute = (key) => {
    this.props.push(key);
  }
  _renderBody() {
    const { push, pop } = this.props;
    return (
      <View style={styles.pagebody}>
        <View style={styles.listInem}>
          <View style={styles.rowBox}>
            <Text style={styles.normalText}>向东</Text>
            <Text style={[styles.normalText, styles.textRight]}>2017-12-23</Text>
          </View>
          <View style={styles.rowBox}>
            <Text style={styles.normalText}>采购：八月瓜/青皮八月瓜</Text>
          </View>
          <View style={styles.rowBox}>
            <View style={styles.flexRow}>
              <Text style={styles.normalText}>价格：</Text>
              <Text style={styles.dText}>10.00</Text>
              <Text style={styles.normalText}>元/斤</Text>
            </View>
            <View style={[styles.flexRow, styles.boxRight]}>
              <Text style={styles.normalText}>供应量：</Text>
              <Text style={styles.dText}>10000</Text>
              <Text style={styles.normalText}>斤</Text>
            </View>
          </View>
          <View style={styles.rowBox}>
            <Text style={styles.normalText}>供货地：湖南省常德市</Text>
          </View>
          <View style={styles.rowBox}>
            <Text style={styles.normalText}>联系方式：*******</Text>
          </View>
          <View style={[styles.rowBox, styles.boxRight]}>
            <TFeedback
              content={
                <View style={styles.btnLeftBox}>
                  <Text style={styles.btnText}>查看详情</Text>
                </View>}
              onPress={() => { push({ key: 'PriceDetail' }); }}
            />
            <View style={styles.btnRightBox}>
              <Text style={styles.btnText}>聊生意</Text>
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
