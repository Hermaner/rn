import React from 'react';
import { TouchableOpacity, View, Image, Text, Modal, TouchableWithoutFeedback } from 'react-native';
import { Container, Content, Icon, Input } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { Header, TFeedback, Loading } from '../../components';
import base from './base';
import styles from './styles';

class HuinongConsultDetail extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      swiperData: [],
    };
  }
  componentDidMount() {
    this.getInit();
  }
  goRoute = (key) => {
    this.props.push(key);
  }
  _renderBody() {
    const { push } = this.props;
    const { newsInfo } = this.state;
    return (
      <View style={styles.pagebody}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>提示：推送关键词来源于您发布的供应信息，系统将向您推送以下几类商机</Text>
        </View>
        <View style={[styles.flexRow, styles.rowBox]}>
          <View style={styles.flexRow}>
            <Text style={[styles.time, styles.normalNineText]}>{newsInfo.postDate}</Text>
            <Text style={[styles.normalNineText, styles.zixun]}>行情咨询</Text>
          </View>
          <TFeedback
            content={
              <View style={[styles.flexRow, styles.flexRight]}>
                <Icon style={styles.icn} name="arrow-back" />
                <Text style={styles.normalNineText}>听语音</Text>
              </View>}
            onPress={() => { push({ key: 'User' }); }}
          />
        </View>
        <View style={[styles.flexRow, styles.rowBox]}>
          <Text style={[styles.normalNineText, styles.marginR]}>{newsInfo.author}</Text>
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
          <Text>{newsInfo.content}</Text>
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
      </View>
    );
  }
  renderNews() {
    const { push } = this.props;
    return (
      <View style={styles.allNews}>
        <View>
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
            <TouchableOpacity style={styles.button}>
              <View style={styles.buttonBox}>
                <Text style={styles.buttonText}>发供应</Text>
                {/* <Button title='显示Modal' onPress={()=>{this.setState({visible:true})}}/> */}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  renderModal() {
    const { label } = this.state;
    return (
      <View>
        <Modal
          visible={this.state.visible}
          transparent={this.state.transparent}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}
        >
          <TouchableWithoutFeedback onPress={() => { this.setState({ visible: false }); }}>
            <View
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
            >
              <TouchableWithoutFeedback>
                <View style={styles.modalBox}>
                  <View style={styles.modalTitleBox}>
                    <Text style={styles.modalTitleText}>发表评论</Text>
                    <TFeedback
                      content={
                        <Icon style={{ fontSize: 34, color: '#333', flex: 1, textAlign: 'right' }} name="close" />}
                      onPress={() => { this.setState({ visible: false }); }}
                    />
                  </View>
                  <View>
                    <Input
                      style={styles.inputText}
                      value={label}
                      onChangeText={text => this.saveLabel(text)}
                      multiline
                      placeholder="我来说两句"
                      placeholderTextColor="#000"
                    />
                    <Text style={{ textAlign: 'right', color: '#666', fontSize: 14 }}>0/100</Text>
                  </View>
                  <TFeedback
                    content={
                      <View style={styles.submitBox}>
                        <Text style={styles.submitText}>我写好了</Text>
                      </View>}
                    onPress={() => this.CreateNewsCommentService()}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    );
  }
  renderFooter() {
    return (
      <View style={[styles.flexBox, styles.footerBox]}>
        <TFeedback
          content={
            <View style={styles.plBox}>
              <Text style={styles.footerText}>写评论...</Text>
            </View>}
          onPress={() => { this.setState({ visible: true }); }}
        />
        <View style={[styles.flexBox, { flex: 1, justifyContent: 'flex-end' }]}>
          <View style={styles.flexBox}>
            <Icon style={{ fontSize: 18, color: '#666', marginRight: 4 }} name="chatboxes" />
            <Text style={styles.footerText}>2</Text>
          </View>
          <View style={[styles.flexBox, { marginLeft: 10 }]}>
            <Icon style={{ fontSize: 18, color: '#666', marginRight: 4 }} name="thumbs-up" />
            <Text style={styles.footerText}>2</Text>
          </View>
        </View>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    const { newsInfo } = this.state;
    return (
      <Container>
        <Header back={pop} title={newsInfo.title} />
        <Content contentContainerStyle={{ flex: 1 }} style={{ backgroundColor: '#fff' }}>
          {this._renderBody()}
          {this.renderNews()}
          {
            this.renderModal()
          }
        </Content>
        {this.renderFooter()}
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

HuinongConsultDetail.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(HuinongConsultDetail);
