import React from 'react';
import { TouchableOpacity, View, Image, Text } from 'react-native';
import { Container, Content, Icon } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { Header } from '../../components';
import huinongConsultDetailBase from './base';
import styles from './styles';

class HuinongConsultDetail extends huinongConsultDetailBase {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      swiperData: [],
    };
  }
  componentDidMount() {
  }
  goRoute = (key) => {
    this.props.push(key);
  }
  _renderBody() {
    const { push } = this.props;
    return (
      <View style={styles.pagebody}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>提示：推送关键词来源于您发布的供应信息，系统将向您推送以下几类商机</Text>
        </View>
        <View style={[styles.flexRow, styles.rowBox]}>
          <View style={styles.flexRow}>
            <Text style={[styles.time, styles.normalNineText]}>2017-09-10 13:22:54</Text>
            <Text style={[styles.normalNineText, styles.zixun]}>行情咨询</Text>
          </View>
          <View style={[styles.flexRow, styles.flexRight]}>
            <Icon style={styles.icn} name="arrow-back" />
            <Text style={styles.normalNineText}>听语音</Text>
          </View>
        </View>
        <View style={[styles.flexRow, styles.rowBox]}>
          <Text style={[styles.normalNineText, styles.marginR]}>惠农网小丸子</Text>
          <Text style={[styles.normalNineText, styles.marginR]}>来源：惠农网</Text>
          <Text style={[styles.normalNineText, styles.marginR]}>阅读：1226</Text>
        </View>
        <View style={[styles.daodu, styles.rowBox]}>
          <Text style={styles.normalSixText}>
            导读：目前多个山东生姜生产区的面酱，小姜，已经上市，课上积极性搞，走货稳，货源多，预计后市价格看平，
            下面是小编整理2017年10月22日山东生产区价格行情
          </Text>
        </View>
        <View style={styles.content}>
          <Text>那就留着女性从空心菜vkl</Text>
        </View>
        <View style={styles.rowBox}>
          <Text style={{ color: '#EC2539' }}>备注：以上所有信息来自惠农行情中心，如需了解更多，点击进入行情大厅。</Text>
        </View>
        <View style={styles.allNews}>
          <View style={styles.relatedNewsBox}>
            <Text style={styles.relatedNews}>相关资讯</Text>
          </View>
          <View>
            <View style={{ marginBottom: 10 }}>
              <Text style={styles.normalThreeText}>12月22日畜牧行情：猪价保持平稳，鸡蛋，牛奶，面包，西瓜</Text>
              <Text style={styles.normalNineText}>12-22</Text>
            </View>
            <View style={{ marginBottom: 10 }}>
              <Text style={styles.normalThreeText}>2018年养殖业的路该怎么走？</Text>
              <Text style={styles.normalNineText}>12-22</Text>
            </View>
          </View>
        </View>
        <View style={styles.allNews}>
          <View style={styles.relatedNewsBox}>
            <Text style={styles.relatedNews}>热门评论</Text>
          </View>
          <View style={styles.commentItems}>
            <View style={styles.commentItem}>
              <Image
                style={styles.userImg}
                source={{ uri: 'http://p11md08oo.bkt.clouddn.com/201812115032101.jpg?imageView2/2/w/600' }}
              />
              <View style={styles.flexOne}>
                <View style={styles.flexRow}>
                  <Text style={styles.userName}>游客5Injnkl</Text>
                  <View style={[styles.flexRow, styles.rightPart]}>
                    <TouchableOpacity onPress={() => { push({ key: 'Comment' }); }}>
                      <Icon style={{ fontSize: 12, color: '#666' }} name="arrow-back" />
                    </TouchableOpacity>
                    <View style={[styles.flexRow, styles.upvote]}>
                      <Icon style={{ fontSize: 12, color: '#666' }} name="arrow-back" />
                      <Text>1</Text>
                    </View>
                  </View>
                </View>
                <Text style={styles.commentTime}>2017-10-22</Text>
                <Text style={styles.normalThreeText}>年底了猪肉会涨价吗</Text>
              </View>
            </View>
            <Text style={styles.readAll}>查看全部3条评论</Text>
          </View>
        </View>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="2017年坎坎坷坷扩扩扩" />
        <Content contentContainerStyle={{ flex: 1 }} style={{ backgroundColor: '#fff' }}>
          {this._renderBody()}
          <TouchableOpacity style={styles.button}>
            <View style={styles.buttonBox}>
              <Text style={styles.buttonText}>发供应</Text>
            </View>
          </TouchableOpacity>
        </Content>
      </Container>
    );
  }
}

HuinongConsultDetail.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(HuinongConsultDetail);
