import React from 'react';
import { View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Text, Header, Icon } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import base from './base';
import styles from './styles';

class MainScreen extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    // this.GetLedeCategoryService();
  }
  _readerHeader() {
    const { pop, push } = this.props;
    return (
      <Header style={{ alignItems: 'center' }}>
        <TouchableOpacity onPress={pop} style={styles.Headerleft}>
          <Icon name="arrow-back" />
        </TouchableOpacity>
        <TouchableWithoutFeedback onPress={() => { push({ key: 'MainSearcher' }); }}>
          <View style={styles.HeaderMain}>
            <Icon name="ios-search-outline" style={styles.HeaderIcon} />
            <Text style={styles.HeaderMainText}>输入货品名称</Text>
          </View>
        </TouchableWithoutFeedback>
      </Header>
    );
  }
  _renderLeft() {
    const { items } = this.state;
    return (
      <View style={styles.leftNav}>
        <Content>
          {
            items.map((item, index) => (
              <TouchableWithoutFeedback key={index} onPress={() => { this.changeLeftTab(index); }}>
                <View style={[styles.leftNavList, item.cur && styles.leftNavListCur]}>
                  <Text
                    style={[styles.leftNavText, item.cur && styles.leftNavTextCur]}
                  >
                    {item.name}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            ))
          }
        </Content>
      </View>
    );
  }
  _renderContent() {
    const { childItems } = this.state;
    const { push } = this.props;
    return (
      <View style={styles.rightContent}>
        <Content>
          <TouchableOpacity onPress={this.goPage}>
            <View style={styles.rightAll}>
              <Text style={styles.mainText}>全部</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.rightContentView}>
            {
              childItems.map((item, index) => (
                <TouchableWithoutFeedback key={index} onPress={() => { push({ key: 'MainList' }); }}>
                  <View style={styles.contetnTabView}>
                    <Text
                      style={styles.mainText}
                    >
                      {item.name}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              ))
            }
          </View>
        </Content>
      </View>
    );
  }
  render() {
    return (
      <Container>
        {this._readerHeader()}
        <View style={styles.mainView}>
          {this._renderLeft()}
          {this._renderContent()}
        </View>
      </Container>
    );
  }
}

MainScreen.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MainScreen);
