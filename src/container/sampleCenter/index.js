import React from 'react';
import { View, Image } from 'react-native';
import { Container, Input, Text, CheckBox } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loading, Header } from '../../components';
import { pushRoute, popRoute } from '../../actions';
import myBase from './base';
import styles from './styles';

class SampleCenter extends myBase {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      swiperData: [],
    };
  }
  componentDidMount() {
  }
  _renderBody() {
    const { push } = this.props;
    const { identity } = this.state;
    return (
      <View style={styles.pagebody}>
        <Image style={styles.userImg} source={require('../../assets/img/1.png')} />
        <View>
          <Text style={styles.title}>采购量/月</Text>
          <View style={styles.inputBox}>
            <Input
              style={styles.inputText}
              value={this.state.businessName}
              onChangeText={text => this.saveBuyCounts(text)}
            />
          </View>
          <Text style={styles.title}>您的采购身份</Text>
          <View style={styles.CheckBox}>
            {
              identity.map((item, index) => (
                <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <CheckBox
                    style={styles.check}
                    // onPress={() => this.defaultAdress(item.receiveAddressId)}
                    checked={item.isChoose}
                  />
                  <Text>{item.title}</Text>
                </View>
              ))
            }
          </View>
        </View>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="样品中心" />
        <View>
          {this._renderBody()}
        </View>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

SampleCenter.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(SampleCenter);
