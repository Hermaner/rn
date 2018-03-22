import React from 'react';
import { View, TouchableOpacity, BackHandler, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Input, Header, Icon } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { Iconfont, TOpacity, Loading } from '../../components';
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
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    this.getData();
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  _readerHeader() {
    const { pop } = this.props;
    const { searchVal } = this.state;
    return (
      <Header style={{ alignItems: 'center', backgroundColor: '#fff' }}>
        <TouchableOpacity onPress={pop} style={styles.Headerleft}>
          <Icon name="arrow-back" />
        </TouchableOpacity>
        <View style={styles.HeaderMain}>
          <Icon name="ios-search-outline" style={styles.HeaderIcon} />
          <Input
            style={styles.HeaderInput}
            placeholderTextColor="#999"
            placeholder="输入货品名称"
            autoFocus
            clearButtonMode="while-editing"
            value={searchVal}
            onChangeText={value => this.onSearchChange(value)}
            onSubmitEditing={this.login}
          />
          <TOpacity
            style={{ marginRight: 4 }}
            content={
              <View style={styles.okBtn}>
                <Text style={styles.okBtnText}>确定</Text>
              </View>
            }
            onPress={() => this.login()}
          />
        </View>
      </Header>
    );
  }
  _renderSearchList() {
    const { searchList } = this.state;
    return (
      <View style={styles.listBox}>
        {
          searchList.length > 0 &&
          searchList.map((item, index) => (
            <TOpacity
              key={index}
              style={styles.flexBox}
              content={
                <View style={styles.flexRow}>
                  <Text style={styles.myText}>{item.parent.name}</Text>
                  <Iconfont style={styles.myIcn} name="icon-youjiantou-01" />
                  <Text style={styles.myText}>{item.child.name}</Text>
                </View>
              }
              onPress={() => this.searchSubmit(item.child.categoryId, item.child.name)}
            />
          ))
        }
      </View>
    );
  }
  _renderHistorySearch() {
    const { historys } = this.state;
    return (
      <View style={styles.historyBox}>
        <View style={styles.flexRowBox}>
          <Text style={{ fontSize: 14, color: '#666' }}>历史搜索</Text>
          <TOpacity
            style={styles.flexOne}
            content={
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Icon name="trash" style={{ fontSize: 18, color: '#666' }} />
              </View>
            }
            onPress={() => this.cleanUpHistory()}
          />
        </View>
        <View style={styles.flexRowBox}>
          {
            historys.map((item, index) => (
              <TOpacity
                key={index}
                style={{ marginRight: 6 }}
                content={
                  <View style={styles.chooseBtn}>
                    <Text style={styles.btnText}>{item.label}</Text>
                  </View>
                }
                onPress={() => this.searchSubmit(item.categoryId, item.label)}
              />
            ))
          }
        </View>
      </View>
    );
  }
  _renderHotSearch() {
    const { hotList } = this.state;
    return (
      <View style={styles.historyBox}>
        <View style={styles.flexRowBox}>
          <Text style={{ fontSize: 14, color: '#666' }}>热门搜索</Text>
        </View>
        <View style={styles.flexRowBox}>
          {
            hotList.map((item, index) => (
              <TOpacity
                key={index}
                style={{ marginRight: 6 }}
                content={
                  <View style={styles.chooseBtn}>
                    <Text style={styles.btnText}>{item.name}</Text>
                  </View>
                }
                onPress={() => this.hotChoose(item.name)}
              />
            ))
          }
        </View>
      </View>
    );
  }
  render() {
    const { searchList, historys, hotList, hidden } = this.state;
    return (
      <Container>
        {this._readerHeader()}
        {
          !hidden &&
          historys.length > 0 &&
          this._renderHistorySearch()
        }
        {
          !hidden &&
          hotList &&
          hotList !== '' && hotList !== null &&
          hotList.length > 0 &&
          this._renderHotSearch()
        }
        {
          searchList.length > 0 &&
          this._renderSearchList()
        }
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

MainScreen.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MainScreen);
