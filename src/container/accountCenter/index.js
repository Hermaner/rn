import React from 'react';
import { TouchableOpacity, BackHandler, View } from 'react-native';
import { CachedImage } from 'react-native-img-cache';
import { Container, Content, Icon, Text } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { Header, TFeedback } from '../../components';
import AccountCenterBase from './base';
import styles from './styles';

class AccountCenter extends AccountCenterBase {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      swiperData: [],
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
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
    const { push } = this.props;
    const { items, backGround1, isValidate, money } = this.state;
    return (
      <View style={styles.pagebody}>
        <View style={styles.headerImgBox}>
          <CachedImage style={styles.headerImg} source={backGround1} />
        </View>
        <View style={{ height: 150 }}>
          <View style={styles.accountMoney}>
            <Text style={styles.textBackground}>账户资金</Text>
            <TFeedback
              content={
                <View style={styles.rightBtn}>
                  <Text style={styles.textBackground}>提现</Text>
                </View>}
              onPress={() => { push({ key: isValidate ? 'ValidatePhone' : 'ChooseGatheringAccountNumbers' }); }}
            />
          </View>
          <Text style={[styles.textBackground, styles.textMoney]}>￥{money}</Text>
        </View>
        <View style={styles.detailInfo}>
          {
            items.map((item, index) => (
              <TouchableOpacity onPress={() => { push({ key: item.push }); }} key={index}>
                <View style={styles.infoBox}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: '#666', fontSize: 16 }}>{item.title}</Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Text style={{ color: '#999', fontSize: 14 }}>{item.label}</Text>
                    <Icon style={{ marginLeft: 10, fontSize: 20, color: '#666' }} name="md-arrow-dropright" />
                  </View>
                </View>
              </TouchableOpacity>
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
        <Header back={pop} title="账户中心" />
        <Content style={{ backgroundColor: '#fff' }}>
          {this._renderBody()}
        </Content>
      </Container>
    );
  }
}

AccountCenter.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(AccountCenter);
