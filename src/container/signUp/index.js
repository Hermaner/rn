import React from 'react';
import { View, BackHandler } from 'react-native';
import { Container, Content, Text, Input } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { observer } from 'mobx-react/native';
import { TFeedback, Loading, Header, Iconfont, TOpacity } from '../../components';
import { pushRoute, popRoute } from '../../actions';
import Base from './base';
import { Mcolor } from '../../utils';
import styles from './styles';

@observer
class signUp extends Base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    this.getInit();
    this.initData();
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    this.getDelete();
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  _renderBody() {
    const { push } = this.props;
    const { list, myAdress, goodsName, topList } = this.state;
    return (
      <View style={styles.bodyBox}>
        <View style={styles.topBox}>
          {
            topList.map((item, index) => (
              <View key={index} style={styles.top}>
                <Text style={index === 0 ? styles.topTextChoose : styles.topText}>{item}</Text>
                <Iconfont
                  style={index === 0 ? styles.icnChoose : styles.icn}
                  name="icon-youjiantou-01"
                />
              </View>
            ))
          }
        </View>
        {
          list.map((item, index) => (
            <View key={index} style={styles.rowBox}>
              <Text style={styles.name}>{item.title}</Text>
              <Input
                style={styles.inputText}
                value={item.label}
                onChangeText={value => this.saveInfo(value, index)}
                placeholderTextColor={Mcolor}
              />
            </View>
          ))
        }
        <View style={styles.threeRowBox}>
          <Text style={styles.name}>地区</Text>
          <TFeedback
            content={
              <Text style={styles.threeText}>{myAdress || '点击选择地区'}</Text>}
            onPress={() => { push({ key: 'CgyCitys', params: { type: 'signUpEmit' } }); }}
          />
        </View>
        <View style={styles.threeRowBox}>
          <Text style={styles.name}>品类</Text>
          <TFeedback
            content={
              <Text style={styles.threeText}>{goodsName || '点击选择品类'}</Text>}
            onPress={() => { push({ key: 'MainSearch', params: { type: '6' } }); }}
          />
        </View>
      </View>
    );
  }
  _renderBtn() {
    return (
      <View>
        <TOpacity
          style={styles.btnBox}
          content={
            <Text style={styles.btnText}>提交</Text>
          }
          onPress={() => this.sumit()}
        />
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="商家报名" />
        <Content>
          {this._renderBody()}
          {this._renderBtn()}
        </Content>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

signUp.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(signUp);
