import React from 'react';
import { View, BackHandler, Text, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Input, Icon } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { TOpacity, Loading, Header, NoData } from '../../components';
import base from './base';
import styles from './styles';


class SearchPeople extends base {
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
  _readerHeader() {
    const { userInfo } = this.state;
    return (
      <View style={styles.box}>
        <View style={styles.HeaderMain}>
          <Icon name="ios-search-outline" style={styles.HeaderIcon} />
          <Input
            style={styles.HeaderInput}
            placeholderTextColor="#999"
            placeholder="手机号/姓名"
            autoFocus
            clearButtonMode="while-editing"
            value={userInfo}
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
      </View>
    );
  }
  _renderSearchList() {
    const { push } = this.props;
    const { searchList, userInfo } = this.state;
    return (
      <View style={styles.listBox}>
        {
          searchList.length > 0 ?
            <ScrollView>
              {
                searchList.length > 0 &&
                searchList.map((item, index) => (
                  <TOpacity
                    key={index}
                    style={styles.flexBox}
                    content={
                      <View>
                        <View style={styles.flexRow}>
                          <Text style={styles.myText}>{decodeURI(item.nickName)}</Text>
                          {
                            item.phone !== null && item.phone !== '' &&
                            <Text style={styles.myText}>({item.phone})</Text>
                          }
                        </View>
                        {
                          item.provinceName !== null &&
                          item.provinceName.length > 0 &&
                          <Text style={[styles.myText]}>
                            {item.provinceName}{item.cityName}{item.districtName}
                          </Text>
                        }
                      </View>
                    }
                    onPress={() => push({ key: item.memberVerifs !== null && item.memberVerifs !== '' && item.memberVerifs.length > 0 ? 'StoreDetail' : 'MyInfo', params: { memberId: item.memberId } })}
                  />
                ))
              }
            </ScrollView>
          :
            userInfo.length > 0 &&
            <NoData
              label="没有相关数据"
            />
        }
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="查找客户" />
        {this._readerHeader()}
        {
          this._renderSearchList()
        }
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

SearchPeople.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(SearchPeople);
