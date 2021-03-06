import React from 'react';
import { View, Text, Modal, ScrollView, BackHandler } from 'react-native';
import { CachedImage } from 'react-native-img-cache';
import { Container, Content, Icon, Input } from 'native-base';
import AutoHeightImage from 'react-native-auto-height-image';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { Header, TFeedback, Loading } from '../../components';
import base from './base';
import { deviceW } from '../../utils';
import styles from './styles';

class HuinongConsultDetail extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    this.getInit();
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  _renderBody() {
    const { push } = this.props;
    const { newsInfo, newsList } = this.state;
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
        </View>
        <View style={[styles.flexRow, styles.rowBox]}>
          <Text style={[styles.normalNineText, styles.marginR]}>{newsInfo.author}</Text>
          <Text style={[styles.normalNineText, styles.marginR]}>来源：慧包网</Text>
          <Text style={[styles.normalNineText, styles.marginR]}>阅读：{newsInfo.lookCount}</Text>
        </View>
        <View style={[styles.daodu, styles.rowBox]}>
          <Text style={styles.normalSixText}>
            导读：{newsInfo.introduction}
          </Text>
        </View>
        {
          newsInfo.newsImages &&
          <View style={styles.imgView}>
            {
              newsInfo.newsImages.map((item, index) => (
                <AutoHeightImage
                  key={index}
                  style={{ marginTop: 10 }}
                  width={deviceW - 20}
                  imageURL={`${item.imgUrl}?imageView2/1/w/420`}
                />
              ))
            }
          </View>
        }
        <View style={styles.content}>
          <Text style={styles.contentText}>{newsInfo.content}</Text>
        </View>
        <View style={[styles.rowBox, { flex: 1, flexDirection: 'row', flexWrap: 'wrap' }]}>
          <Text style={{ fontSize: 14, color: '#EC2539' }}>备注：以上所有信息来自慧包行情中心，如需了解更多，</Text>
          <TFeedback
            content={
              <View>
                <Text style={{ fontSize: 12, color: '#EC2539', marginTop: 4 }}>点击进入行情大厅。</Text>
              </View>
              }
            onPress={() => { push({ key: 'Home' }); }}
          />
        </View>
        <View style={styles.allNews}>
          <View style={styles.relatedNewsBox}>
            <Text style={styles.relatedNews}>相关资讯</Text>
          </View>
          <View>
            {
              newsList &&
              newsList.map((item, index) => (
                <TFeedback
                  key={index}
                  content={
                    <View style={{ marginBottom: 10 }}>
                      <Text style={styles.normalThreeText}>{item.title}</Text>
                      <Text style={styles.normalNineText}>{item.postDate.substring(5, 10)}</Text>
                    </View>}
                  onPress={() => { push({ key: 'HuinongConsultDetail', params: { newsId: item.newsId } }); }}
                />
              ))
            }
          </View>
        </View>
      </View>
    );
  }
  renderNews() {
    const { newsInfo, isReadAll } = this.state;
    return (
      <View style={styles.allNews}>
        <View>
          <View style={styles.relatedNewsBox}>
            <Text style={styles.relatedNews}>热门评论</Text>
          </View>
          <View style={styles.commentItems}>
            {
              newsInfo.allLength > 0 &&
              this.renderComment()
            }
            <TFeedback
              content={
                !isReadAll ?
                  <View style={{ marginBottom: 10 }}>
                    <Text style={styles.readAll}>查看全部{newsInfo.length}条评论</Text>
                  </View>
                :
                  <View style={{ marginBottom: 10 }}>
                    <Text style={styles.readAll}>
                      显示{newsInfo.length < 3 ? newsInfo.length : 3}条评论
                    </Text>
                  </View>
                }
              onPress={() => this.readAll()}
            />
          </View>
        </View>
      </View>
    );
  }
  renderComment() {
    const { newsInfo, isReadAll } = this.state;
    return (
      <ScrollView>
        {
          (isReadAll ? newsInfo.newsComments : newsInfo.firstPL).map((item, index) => (
            <View style={styles.commentItem} key={index}>
              <CachedImage
                style={styles.userImg}
                source={{ uri: `${item.memberImgUrl}?imageView2/1/w/40` }}
              />
              <View style={styles.flexOne}>
                <View style={styles.flexRow}>
                  <Text style={styles.userName}>{item.memberName}</Text>
                  <View style={[styles.flexRow, styles.rightPart]}>
                    <TFeedback
                      content={
                        <Icon style={{ fontSize: 18, color: '#666' }} name="chatboxes" />}
                      onPress={() => { this.setState({ visible: true }); }}
                    />
                    <TFeedback
                      content={
                        <View style={[styles.flexRow, styles.upvote]}>
                          <Icon style={{ fontSize: 18, color: '#666', marginRight: 4 }} name="thumbs-up" />
                          <Text>{item.praiseCount}</Text>
                        </View>}
                      onPress={() => { this.CreateCommentPraiseService(item.newsCommentId); }}
                    />
                  </View>
                </View>
                <Text style={styles.commentTime}>{item.postDate}</Text>
                <Text style={styles.normalThreeText}>{item.label}</Text>
              </View>
            </View>
          ))
        }
      </ScrollView>
    );
  }
  renderModal() {
    const { label, labelLength } = this.state;
    return (
      <View>
        <Modal
          visible={this.state.visible}
          transparent={this.state.transparent}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}
        >
          <TFeedback
            content={
              <View
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
              >
                <TFeedback
                  content={
                    <View style={styles.modalBox}>
                      <View style={styles.modalTitleBox}>
                        <Text style={styles.modalTitleText}>发表评论</Text>
                        <TFeedback
                          content={
                            <Icon style={{ fontSize: 34, color: '#333', flex: 1, textAlign: 'right' }} name="close" />}
                          onPress={() => { this.setState({ visible: false }); }}
                        />
                      </View>
                      <View style={{ height: 100 }}>
                        <Input
                          style={styles.inputText}
                          value={label}
                          onChangeText={text => this.saveLabel(text)}
                          multiline
                          placeholder="我来说两句"
                          placeholderTextColor="#777"
                        />
                        <Text style={{ textAlign: 'right', color: '#666', fontSize: 14 }}>{labelLength || 0}/100</Text>
                      </View>
                      <TFeedback
                        content={
                          <View style={styles.submitBox}>
                            <Text style={styles.submitText}>我写好了</Text>
                          </View>}
                        onPress={() => this.CreateNewsCommentService()}
                      />
                    </View>}
                  onPress={() => { console.log('modal'); }}
                />
              </View>}
            onPress={() => { this.setState({ visible: false }); }}
          />
        </Modal>
      </View>
    );
  }
  renderFooter() {
    const { newsInfo } = this.state;
    return (
      <View style={[styles.flexBox, styles.footerBox]}>
        <TFeedback
          content={
            <View style={styles.plBox}>
              <Text style={styles.footerText}>写评论...</Text>
            </View>}
          onPress={() => { this.writeThink(); }}
        />
        <View style={[styles.flexBox, { flex: 1, justifyContent: 'flex-end' }]}>
          <View style={styles.flexBox}>
            <Icon style={{ fontSize: 18, color: '#666', marginRight: 4 }} name="chatboxes" />
            <Text style={styles.footerText}>{newsInfo.allLength}</Text>
          </View>
          <TFeedback
            content={
              <View style={[styles.flexBox, { marginLeft: 10 }]}>
                <Icon style={{ fontSize: 18, color: '#666', marginRight: 4 }} name="thumbs-up" />
                <Text style={styles.footerText}>{newsInfo.startLength}</Text>
              </View>}
            onPress={() => { this.CreateNewsPraiseService(newsInfo.newsId); }}
          />
        </View>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    const { newsInfo } = this.state;
    const title = newsInfo.title && newsInfo.title.length > 8 ? `${newsInfo.title.substr(0, 8)}…` : newsInfo.title;
    return (
      <Container>
        <Header back={pop} title={title} />
        <Content style={{ backgroundColor: '#fff' }}>
          {this._renderBody()}
          {
            this.renderNews()
          }
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
