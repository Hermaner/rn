import React from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import { Container, Content, Picker, Item, Icon, Text, CheckBox, Input } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header } from '../../components';
import { pushRoute, popRoute } from '../../actions';
import cashRuleBase from './base';
import styles from './styles';

class CashRule extends cashRuleBase {
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
        <View>
          <Text style={styles.title}>一) 提现流程</Text>
          <Text style={styles.normalText}>1.登录手机慧包APP</Text>
          <Text style={styles.normalText}>2.进入个人中心-账户中心-点击提现按钮；</Text>
          <Text style={styles.normalText}>3.进入提现界面后，先选择收款账户；</Text>
          <Text style={styles.normalText}>4.填写提现金额，点击确认提交提现申请成功；</Text>
          <Text style={styles.normalText}>5.提现审核通过后，慧包网将于1-3个工作日打款到指定的收款账号。</Text>
        </View>
        <View>
          <Text style={styles.title}>二) 提现规则</Text>
          <Text style={styles.normalText}>1.提现次数：功能体验期间，每个账户每日可提现2次，提现费率为0；</Text>
          <Text style={styles.normalText}>2.提现金额：提现金额每笔最高10000元；</Text>
          <Text style={styles.normalText}>3.申请提现审核通过后，账户中心明细可查询到提现成功或提现失败的结果；</Text>
          <Text style={styles.normalText}>4.提现到账时间：提现成功后一般将在1-3个工作日到账，如逾期未到账，请查询账户余额是否有退回；</Text>
          <Text style={styles.normalText}>5.因用户绑定的账户异常原因，导致提现失败，变更或修改收款账户后可重新发起提现。</Text>
        </View>
        <View>
          <Text style={styles.title}>三) 提现流程</Text>
          <Text style={styles.normalText}>1.若用户未设置支付密码则提示先设置支付密码；</Text>
          <Text style={styles.normalText}>2.若用户未完成实人认证则提示先设置实人认证；</Text>
          <Text style={styles.normalText}>3.若超过提现次数则无法操作提现；</Text>
          <Text style={styles.normalText}>4.若用户账户异常则无法操作提现 ；</Text>
          <Text style={styles.normalText}>5.提现账户为支付宝账户或微信账户时，以第三方转账限制金额为准：支付宝转账收款日限2万/单笔2万，微信转账收款日限2万/单笔2万。</Text>
        </View>
        <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
          <Text style={styles.normalText}>
            如在提现过程中有任何疑问，请致慧包网客服电话：
          </Text>
          <TouchableOpacity>
            <Text style={{ fontSize: 14, color: '#302CCD' }}>400-008-8688</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="提现流程和规则" />
        <Content style={{ backgroundColor: '#fff' }}>
          {this._renderBody()}
        </Content>
      </Container>
    );
  }
}

CashRule.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(CashRule);
