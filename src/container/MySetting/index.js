import React from 'react';
import { View, BackHandler, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Text, Content, Icon } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { Loading, Header, TLight, TOpacity } from '../../components';
import base from './base';
import styles from './styles';

class MySetting extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  _renderList() {
    const { push } = this.props;
    const { items } = this.state;
    return (
      <View>
        <TOpacity
          style={{ flex: 1 }}
          content={
            <View style={styles.list}>
              <Text style={styles.name}>消息设置</Text>
              <View style={styles.right}>
                <Icon name="md-arrow-dropright" style={styles.arr} />
              </View>
            </View>
          }
          onPress={() => push({ key: 'MessageSet' })}
        />
        {/* {
          Platform.OS !== 'android' &&
          <View style={styles.promptTextBox}>
            <Text style={styles.promptText}>
              如果您要关闭或者开启手机慧包网的新消息通知，请在iphone的“设置” - “通知”功能中，找到应用程序‘手机慧包’更改
            </Text>
          </View>
        } */}
        {
          items.map((item, index) => (
            <TLight
              key={index}
              content={
                <View style={styles.list}>
                  <Text style={styles.name}>{item.name}</Text>
                  <View style={styles.right}>
                    <Icon name="md-arrow-dropright" style={styles.arr} />
                  </View>
                </View>
              }
              onPress={() => push({ key: item.page })}
            />
          ))
        }
        <TOpacity
          style={styles.flexOne}
          content={
            <View style={styles.btnBox}>
              <Text style={styles.BtnText}>退出登陆</Text>
            </View>
          }
          onPress={this.logOut}
        />
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header
          back={pop}
          title="设置"
        />
        <Content>
          {this._renderList()}
        </Content>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

MySetting.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MySetting);
