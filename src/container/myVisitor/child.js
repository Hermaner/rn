import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute } from '../../actions';
import { TFeedback } from '../../components';
import myVisitorBase from './base';
import styles from './styles';

// class Child extends React.Component {
class Child extends myVisitorBase {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  render() {
    const { push, data } = this.props;
    return (
      <View>
        {
          data.map((item, index) => (
            <View style={styles.visitorInfo} key={index}>
              <View style={styles.rowBoxList}>
                <View style={styles.rowItem}>
                  <TFeedback
                    content={
                      <View style={styles.rowBox}>
                        <Text style={styles.flexOneleft} numberOfLines={1}>
                          {item.postDate.substring(5, 16)}
                        </Text>
                        <Text style={styles.flexOneCenter} numberOfLines={1}>
                          {item.member.nickName}
                        </Text>
                        <Text style={styles.flexOneRight} numberOfLines={1}>
                          {item.supply.brandName}{item.supply.categoryName}
                        </Text>
                      </View>}
                    onPress={() => { this.clickHidden(index); }}
                  />
                  <View style={styles.isHidden}>
                    <View style={styles.userBox}>
                      <View style={styles.leftPart}>
                        <View style={styles.flexRow}>
                          <Image
                            style={styles.userImg}
                            source={{ uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513849497983&di=f3f3fb38de9b5b7d7f41f1063cbc4767&imgtype=0&src=http%3A%2F%2Fd.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F8ad4b31c8701a18bb4b1f022942f07082838fe01.jpg' }}
                          />
                          <View>
                            <View style={styles.flexRow}>
                              <Text style={styles.userName}>刘德华</Text>
                            </View>
                            <Text style={styles.time}>注册时间: 2017年05月14日 批发商</Text>
                          </View>
                        </View>
                        <Text style={styles.userAdress}>湖南省长沙市天心区黄兴中路84</Text>
                      </View>
                      <Icon style={styles.rightIcn} name="play" />
                    </View>
                    <View style={[styles.btnList, styles.btnLeft]}>
                      <TouchableOpacity style={styles.btn} onPress={() => { push({ key: 'VisitDetail' }); }}>
                        <Text style={[styles.btnText, styles.btnLeftText]}>他浏览过什么</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[styles.btn, styles.btnCenter]}>
                        <Text style={styles.btnText}>打电话</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[styles.btn, styles.btnRight]} onPress={() => { push({ key: 'TalkBusiness' }); }}>
                        <Text style={styles.btnText}>聊生意</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ))
        }
      </View>
    );
  }
}
Child.propTypes = {
  push: PropTypes.func,
  data: PropTypes.array,
};
export default connect(null, { push: pushRoute })(Child);
