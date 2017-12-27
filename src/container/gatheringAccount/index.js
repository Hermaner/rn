import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Container, Content, Icon, Text } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { Header } from '../../components';
import gatheringAccountBase from './base';
import styles from './styles';

class GatheringAccount extends gatheringAccountBase {
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
    const { push } = this.props;
    const { items } = this.state;
    return (
      <View style={styles.pagebody}>
        {
          items.map((item, index) => (
            <View
              key={index}
              style={[styles.accountBox, { backgroundColor: item.title === '支付宝账号' ? '#52C3F7' : item.title === '微信账号' ? '#6CC05C' : '#F38260' }]}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image style={styles.accountImg} source={{ uri: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2495803215,2562259820&fm=173&s=DA383EC754026CEE0E2E89200300704B&w=218&h=146&img.JPEG' }} />
                <Text style={{ fontSize: 14, color: '#fff' }}>{item.title}</Text>
              </View>
              <View style={{ flex: 1, marginTop: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={styles.accountImg} />
                  <Text style={{ fontSize: 16, color: '#fff' }}>{item.name}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                  <View style={{ flex: 1 }} />
                  <TouchableOpacity
                    style={[styles.labelTextBox, !item.isDefault && styles.labelTextBoxChange]}
                  >
                    <Text
                      style={[styles.labelText, !item.isDefault && styles.labelTextChange]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        }
        <TouchableOpacity style={styles.addBtn} onPress={() => { push({ key: 'AccountNumberType' }); }}>
          <Icon style={{ marginRight: 20, color: '#5DA942' }} name="arrow-back" />
          <Text style={{ textAlign: 'center', color: '#666', fontSize: 18 }}>添加新账号</Text>
        </TouchableOpacity>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="收款账号" />
        <Content style={{ backgroundColor: '#fff' }}>
          {this._renderBody()}
        </Content>
      </Container>
    );
  }
}

GatheringAccount.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(GatheringAccount);
