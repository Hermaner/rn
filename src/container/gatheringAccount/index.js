import React from 'react';
import { View, TouchableOpacity, BackHandler } from 'react-native';
import { Container, Content, Icon, Text } from 'native-base';
import { CachedImage } from 'react-native-img-cache';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { Header, TFeedback, Loading } from '../../components';
import gatheringAccountBase from './base';
import styles from './styles';

class GatheringAccount extends gatheringAccountBase {
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
  _renderBody() {
    const { push } = this.props;
    const { items, zhi, card } = this.state;
    return (
      <View style={styles.pagebody}>
        {
          items &&
          items.map((item, index) => (
            <View
              key={index}
              style={[styles.accountBox, { backgroundColor: item.type === '0' ? '#52C3F7' : '#F38260' }]}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CachedImage style={styles.accountImg} source={item.type === '0' ? zhi : card} />
                <Text style={{ fontSize: 14, color: '#fff' }}>{item.title}</Text>
                <Text style={{ flex: 1, fontSize: 14, color: '#fff', textAlign: 'right' }}>{item.name}</Text>
              </View>
              <View style={{ flex: 1, marginTop: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={styles.accountImg} />
                  <Text style={{ fontSize: 16, color: '#fff' }}>{item.number}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                  <View style={{ flex: 1 }} />
                  <TFeedback
                    content={
                      <View
                        style={[styles.labelTextBox, !item.isDefault && styles.labelTextBoxChange]}
                      >
                        <Text
                          style={[styles.labelText, !item.isDefault && styles.labelTextChange]}
                        >
                          {item.label}
                        </Text>
                      </View>}
                    onPress={() => { this.setDefult(index); }}
                  />
                </View>
              </View>
            </View>
          ))
        }
        <TouchableOpacity style={styles.addBtn} onPress={() => { push({ key: 'AccountNumberType', params: { where: '2' } }); }}>
          <Icon style={{ marginRight: 20, color: '#5DA942' }} name="add" />
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
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

GatheringAccount.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(GatheringAccount);
