import React from 'react';
import { View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Text, Button } from 'native-base';
import { connect } from 'react-redux';
import { popRoute } from '../../actions';
import { Header, TFeedback } from '../../components';
import base from './base';
import { Global } from '../../utils';
import styles from './styles';

class CgCitys extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
  }
  _renderAddressContent() {
    const { citys, leftIndex, midIndex } = this.state;
    const { push } = this.props;
    return (
      <View style={styles.maskerContentView}>
        <View style={styles.maskerTitle}>
          <Text style={styles.maskerTitleText}>自动定位</Text>
        </View>
        <TouchableOpacity style={styles.usedCityView}>
          <Text style={styles.nousedCity}>您的地址：上海</Text>
        </TouchableOpacity>
        <View style={styles.maskerTitle}>
          <Text style={styles.maskerTitleText}>省、市</Text>
        </View>
        <View style={{ flex: 1 }}>
          {
            citys.length > 0 &&
            <View style={[styles.f1, styles.fr]}>
              <View style={[{ flex: 5 }, { backgroundColor: '#f2f2f2' }]}>
                <Content>
                  {
                    citys.map((item, index) => (
                      <TFeedback
                        key={index}
                        content={
                          <View style={[styles.addressLeftList, item.cur && styles.addressLeftListCur]}>
                            <Text
                              style={[styles.leftNavText, item.cur && styles.leftNavTextCur]}
                              numberOfLines={1}
                            >
                              {item.name}
                            </Text>
                          </View>}
                        onPress={() => { this.changeLeftTab(index); }}
                      />
                    ))
                  }
                </Content>
              </View>
              <View style={[{ flex: 4 }, { backgroundColor: '#f9f9f9' }]}>
                <Content>
                  {
                    citys[leftIndex].citys.map((item, index) => (
                      <TFeedback
                        key={index}
                        content={
                          <View style={[styles.addressRightList, item.cur && styles.addressRightListCur]}>
                            <Text
                              style={[styles.leftNavText, item.cur && styles.leftNavTextCur]}
                              numberOfLines={1}
                            >
                              {item.name}
                            </Text>
                          </View>}
                        onPress={() => { this.selectCity(index); }}
                      />
                    ))
                  }
                </Content>
              </View>
              <View style={{ flex: 5 }}>
                <Content>
                  {
                    citys[leftIndex].citys[midIndex].districts.map((item, index) => (
                      <TFeedback
                        key={index}
                        content={
                          <View style={styles.addressRightList}>
                            <Text
                              style={styles.leftNavText}
                              numberOfLines={1}
                            >
                              {item.name}
                            </Text>
                          </View>}
                        onPress={() => { this.selectDistrict(index); }}
                      />
                    ))
                  }
                </Content>
              </View>
            </View>
          }
        </View>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="选择地区" />
        {this._renderAddressContent()}
      </Container>
    );
  }
}

CgCitys.propTypes = {
  pop: PropTypes.func,
};
export default connect(null, { pop: popRoute })(CgCitys);
