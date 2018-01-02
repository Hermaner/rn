import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Container, Content, Icon, Text, Input } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { Header } from '../../components';
import addAddressBase from './base';
import styles from './styles';

class AddAddress extends addAddressBase {
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
        <View style={styles.rowBox}>
          <Text style={{ marginRight: 15, fontSize: 14, color: '#666' }}>所在地区:</Text>
          <View style={[styles.flexOne, styles.flexRight]}>
            <Text style={{ fontSize: 14, color: '#666' }} numberOfLines={1}>河北省石家庄充不上电就看不出空中小姐创造性健康才能看那就选择困难健康才能看那就选择困</Text>
            <Icon style={{ marginLeft: 10 }} name="arrow-back" />
          </View>
        </View>
        <View style={[styles.rowBox, styles.rowBoxMargin]}>
          <Input multiline placeholder="详细地址" style={styles.inputTextArea} />
        </View>
        <View style={[styles.rowBox, styles.rowBoxMargin]}>
          <Text style={{ marginRight: 15, fontSize: 14, color: '#666' }}>收货人姓名:</Text>
          <Input multiline placeholder="请填写收货人姓名" style={styles.inputs} />
        </View>
        <View style={[styles.rowBox, styles.rowBoxMargin]}>
          <Text style={{ marginRight: 15, fontSize: 14, color: '#666' }}>电话号码:</Text>
          <Input multiline placeholder="请填写手机号码" style={styles.inputs} />
        </View>
        <View style={[styles.rowBox, styles.rowBoxMargin]}>
          <Text style={{ marginRight: 15, fontSize: 14, color: '#666' }}>邮编:</Text>
          <Input multiline style={styles.inputs} />
        </View>
      </View>
    );
  }
  render() {
    const { title } = this.props.navigation.state.params;
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title={title} />
        <Content>
          {this._renderBody()}
          <TouchableOpacity style={styles.footerButton}>
            <Text style={styles.footerButtonText}>保存</Text>
          </TouchableOpacity>
        </Content>
      </Container>
    );
  }
}

AddAddress.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(AddAddress);
