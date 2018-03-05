import React from 'react';
import { View, Image, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Text, Footer } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { Header, Loading, TitleItem, TOpacity } from '../../components';
import base from './base';
import styles from './styles';

class MgSecurity extends base {
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
  _renderTop() {
    const { topbg } = this.state;
    return (
      <View style={styles.top}>
        <Image source={topbg} style={styles.topbg} />
        <View style={styles.topView}>
          <Text style={styles.midText}>已缴纳</Text>
          <Text style={styles.midText}>保障金3000元</Text>
        </View>
      </View>
    );
  }
  _renderMid() {
    return (
      <View style={styles.mid}>
        <Text style={styles.midTitle}>可享受权益如下</Text>
        <Text style={styles.midLabel}>可享受权益如下</Text>
        <Text style={styles.midLabel}>可享受权益如下</Text>
      </View>
    );
  }
  _renderList() {
    const { items } = this.state;
    return (
      <View>
        <TitleItem text="押金充值" />
        <View style={styles.lists}>
          {
            items.map((item, index) => (
              <TOpacity
                key={index}
                style={[styles.list, item.cur && styles.listCur]}
                content={
                  <Text style={styles.listLabel}>{item.label}</Text>
                }
                onPress={() => this.changeTab(index)}
              />
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
        <Header back={pop} title="我的押金" />
        <Content>
          {this._renderTop()}
          {this._renderMid()}
          {this._renderList()}
        </Content>
        <Footer style={styles.footer}>
          <TOpacity
            style={styles.btnView}
            content={
              <Text style={styles.btnText}>{'立即充值'}</Text>
            }
            onPress={this.save}
          />
        </Footer>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

MgSecurity.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MgSecurity);
