import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { CachedImage } from 'react-native-img-cache';
import StarRating from 'react-native-star-rating';
import { Container, Content, Text, Icon, Footer, Input } from 'native-base';
import { connect } from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { popRoute, pushRoute } from '../../actions';
import { Loading, Header, SpotLine, TOpacity, TitleItem, UploadFile, Select, ImageLook } from '../../components';
import base from './base';
import styles from './styles';
import { Mcolor } from '../../utils';

class MgMasterOrderDetail extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    this.getInit();
  }
  componentWillUnmount() {
  }
  _renderTop() {
    const { status, masterLogs, info } = this.state;
    return (
      <View style={styles.top}>
        <Text style={styles.topText}>
          {
            status === 2 ? '请尽快联系客户' :
            status === 3 && masterLogs.bespeakStatus === 1 ? '已预约，请按约定时间上门' :
            status === 4 ? '服务中' :
            status === 5 ? '服务完成，请等待7天入账' :
            status === 7 ? '订单已取消' :
            status === 6 ? '钱已入账' : ''
          }
        </Text>
        {
          status === 2 && masterLogs.bespeakStatus && masterLogs.bespeakStatus !== 1 &&
          <Text style={styles.topText}>
            预约未成功，请重新预约
          </Text>
        }
        <Text style={styles.topText}>
          要求时间：{info.masterOrderItems[0].serviceDate}
        </Text>
        {
          masterLogs.bespeakStatus === 1 && status < 4 &&
          <Text style={styles.topText}>
            预约时间：{masterLogs.bespeakDate}
          </Text>
        }
        {
          status === 4 ? <Text style={styles.topText}>签到时间：{masterLogs.signDate}</Text>
          :
          status === 5 ? <Text style={styles.topText}>完工时间：{masterLogs.accountDate}</Text>
          :
          status === 6 && <Text style={styles.topText}>入账时间：{masterLogs.conpleteDate}</Text>
        }
      </View>
    );
  }
  _renderAddress() {
    const { info } = this.state;
    return (
      <View>
        <View style={styles.address}>
          <Icon name="ios-aperture-outline" style={styles.leftIco} />
          <View style={styles.addressRight}>
            <View style={styles.addressTop}>
              <Text style={styles.userName}>{info.memberName}</Text>
              <TOpacity
                content={
                  <Text style={styles.mainText}>{info.memberPhone}</Text>
                }
                onPress={() => this.call(info.memberPhone)}
              />
            </View>
            <Text style={styles.mainText}>
              {info.addressName}
            </Text>
          </View>
        </View>
        <SpotLine />
      </View>
    );
  }
  _renderProduct() {
    const { info } = this.state;
    return (
      <View>
        <TitleItem
          text="服务项目"
        />
        <View style={styles.mid}>
          {
            info.masterOrderItems.map((list, index) => (
              <View style={styles.product} key={index}>
                <CachedImage source={{ uri: list.imgUrl }} style={styles.img} />
                <Text style={styles.name}>
                  {list.servicesTypeName}
                </Text>
                <Text style={styles.count}>
                  x{list.count}
                </Text>
              </View>
            ))
          }
        </View>
        <View style={styles.memo}>
          <Text style={styles.memoText}>
            用户留言：{info.buyMessage || '无'}
          </Text>
          {
            info.orderImages.length > 0 && <ImageLook images={info.orderImages} />
          }
        </View>
        <View style={styles.totalView}>
          <View style={styles.totalLine}>
            <Text style={styles.totalLeft2}>
              订单金额
            </Text>
            <Text style={styles.totalRight2}>
              ￥{info.amount}
            </Text>
          </View>
        </View>
      </View>
    );
  }
  _renderOrderInfo() {
    const { info, masterLogs, status } = this.state;
    return (
      <View style={styles.infoView}>
        <TitleItem
          text="订单信息"
        />
        <View style={styles.infoList}>
          <Text style={styles.infoText}>订单编号：{info.orderNumber}</Text>
          <Text style={styles.infoText}>下单时间：{info.modiDate}</Text>
          {
            masterLogs.bespeakStatus &&
            <Text style={styles.infoText}>预约结果：{masterLogs.bespeakStatus === 1 ? '预约成功' : masterLogs.bespeakStatus === 2 ? '客户联系方式错误' : masterLogs.bespeakStatus === 3 ? '客户手机无法接听或关机' : '其他' }</Text>
          }
          {
            masterLogs.bespeakStatus === 4 &&
            <Text style={styles.infoText}>预约备注：{masterLogs.bespeakMemo}</Text>
          }
          {
            status > 3 &&
            <Text style={styles.infoText}>签到时间：{masterLogs.signDate}</Text>
          }
          {
            status > 4 &&
            <Text style={styles.infoText}>完工时间：{masterLogs.accountDate}</Text>
          }
          {
            status > 5 &&
            <Text style={styles.infoText}>入账时间：{masterLogs.conpleteDate}</Text>
          }
        </View>
      </View>
    );
  }
  _renderAppoint() {
    const { bespeakStatus, bespeakText, bespeakDate, bespeakMemo } = this.state;
    return (
      <View>
        <TitleItem
          text="预约信息"
        />
        <View style={styles.listView}>
          <Text style={styles.listLabel}>预约结果</Text>
          <TOpacity
            style={styles.listRight}
            content={
              <View style={styles.areaView}>
                <Text style={[styles.areaText, { color: bespeakText ? '#333' : '#999' }]}>{bespeakText || '选择预约结果'}</Text>
                <Icon name="md-arrow-dropright" style={styles.arr} />
              </View>
            }
            onPress={this.showSelect}
          />
        </View>
        {
          bespeakStatus === '1' &&
          <View style={styles.listView}>
            <Text style={styles.listLabel}>预约时间</Text>
            <TOpacity
              style={styles.listRight}
              content={
                <View style={styles.areaView}>
                  <Text style={[styles.areaText, { color: bespeakDate ? '#333' : '#999' }]}>{bespeakDate || '选择预约时间'}</Text>
                  <Icon name="md-arrow-dropright" style={styles.arr} />
                </View>
              }
              onPress={this.toggleDate}
            />
          </View>
        }
        {
          bespeakStatus === '4' &&
          <View style={[styles.listView, styles.memoView]}>
            <Text style={styles.memoLabel}>其他原因</Text>
            <View style={styles.listRight}>
              <Input
                multiline
                style={styles.listMemo}
                placeholderTextColor="#999"
                placeholder="输入其他原因"
                clearButtonMode="while-editing"
                value={bespeakMemo}
                onChangeText={value => this.setState({ bespeakMemo: value })}
              />
            </View>
          </View>
        }
      </View>
    );
  }
  _renderCompleteInfo() {
    const { memo, completeCode } = this.state;
    return (
      <View style={styles.infoView}>
        <TitleItem
          text="完工验证"
        />
        <View style={styles.listView}>
          <Text style={styles.listLabel}>完工码</Text>
          <View style={styles.listRight}>
            <Input
              style={styles.listInput}
              placeholderTextColor="#999"
              placeholder="4位数完工码"
              clearButtonMode="while-editing"
              value={completeCode}
              onChangeText={value => this.setState({ completeCode: value })}
            />
          </View>
        </View>
        <View style={[styles.listView, styles.memoView]}>
          <Text style={styles.memoLabel}>完工备注</Text>
          <View style={styles.listRight}>
            <Input
              multiline
              style={styles.listMemo}
              placeholderTextColor="#999"
              placeholder="至少5字的完工备注"
              clearButtonMode="while-editing"
              value={memo}
              onChangeText={value => this.setState({ memo: value })}
            />
          </View>
        </View>
        <UploadFile
          getImages={this.getImages}
          label="至少2张的完工图片"
          imageCount={6}
        />
      </View>
    );
  }
  _renderCompleteFive() {
    const { initImages, masterLogs } = this.state;
    return (
      <View style={styles.infoView}>
        <TitleItem
          text="完工信息"
        />
        <Text style={styles.cpMemo}>{masterLogs.memo}</Text>
        <UploadFile
          initImages={initImages.split(',')}
          getImages={this.getImages}
          label="至少2张的完工图片"
          imageCount={6}
        />
      </View>
    );
  }
  _renderEval() {
    const { info: { orderEvaluate } } = this.state;
    return (
      <View style={styles.evalView}>
        <TitleItem
          text="用户评价"
        />
        <View>
          <Text style={styles.evalDate}>{orderEvaluate.modiDate}</Text>
          <View style={styles.star}>
            <Text style={styles.starText}>态度</Text>
            <StarRating
              disabled
              starSize={20}
              emptyStarColor={Mcolor}
              emptyStar={'ios-star-outline'}
              fullStar={'ios-star'}
              halfStar={'ios-star-half'}
              iconSet={'Ionicons'}
              starColor={Mcolor}
              maxStars={5}
              rating={orderEvaluate.attitudeScore || 5}
            />
            <Text style={styles.starText2}>质量</Text>
            <StarRating
              disabled
              starSize={20}
              emptyStarColor={Mcolor}
              emptyStar={'ios-star-outline'}
              fullStar={'ios-star'}
              halfStar={'ios-star-half'}
              iconSet={'Ionicons'}
              starColor={Mcolor}
              maxStars={5}
              rating={orderEvaluate.attitudeScore || 5}
            />
          </View>
        </View>
        <Text style={styles.evalMemo}>{orderEvaluate.content}</Text>
        {
          orderEvaluate.imgUrl.length > 0 && <ImageLook images={orderEvaluate.imgUrl.split(',')} />
        }
      </View>
    );
  }
  _renderFooter() {
    const { status } = this.state;
    return (
      <Footer style={styles.footer}>
        {
          status === 2 &&
          <TOpacity
            style={styles.acBtn}
            content={
              <Text style={styles.mainText}>保存预约信息</Text>
            }
            onPress={this.saveAudit}
          />
        }
        {
          status === 2 &&
          <TOpacity
            style={styles.acBtn}
            content={
              <Text style={styles.mainText}>取消订单</Text>
            }
            onPress={this.cancelOrder}
          />
        }
        {
          status === 3 &&
          <TOpacity
            style={styles.acBtn}
            content={
              <Text style={styles.mainText}>修改预约时间</Text>
            }
            onPress={this.showChangeDate}
          />
        }
        {
          status === 3 &&
          <TOpacity
            style={styles.acBtn}
            content={
              <Text style={styles.mainText}>上门签到</Text>
            }
            onPress={this.SignIn}
          />
        }
        {
          status === 4 &&
          <TOpacity
            style={styles.acBtn}
            content={
              <Text style={styles.mainText}>确定完工</Text>
            }
            onPress={this.AuditIn}
          />
        }
        {
          status === 5 &&
          <TOpacity
            style={styles.acBtn}
            content={
              <Text style={styles.mainText}>上传补充图片</Text>
            }
            onPress={this.AddPic}
          />
        }
      </Footer>
    );
  }
  _renderSelect() {
    const { bespeakStatus, selectShow, options } = this.state;
    return (
      <Select
        selectShow={selectShow}
        value={bespeakStatus}
        items={options}
        title="请选择预约结果"
        closeModal={this.closeModal}
        onValueChange={this.selectModel}
      />
    );
  }
  render() {
    const { pop } = this.props;
    const { info, status, isDateShow, maximumDate, minimumDate } = this.state;
    return (
      <Container>
        <Header back={pop} title="订单明细" />
        {
          info &&
          <Content>
            {this._renderTop()}
            {this._renderAddress()}
            {this._renderProduct()}
            {this._renderOrderInfo()}
            {status === 2 && this._renderAppoint()}
            {info.orderEvaluate && this._renderEval()}
            {status === 4 && this._renderCompleteInfo()}
            {status === 5 && this._renderCompleteFive()}
          </Content>
        }
        {this._renderSelect()}
        {info && status < 6 && this._renderFooter()}
        <DateTimePicker
          titleIOS="选择时间"
          confirmTextIOS="确定"
          cancelTextIOS="取消"
          is24Hour
          mode="datetime"
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          isVisible={isDateShow}
          onConfirm={this.dateConfirm}
          onCancel={this.dateCancel}
        />
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

MgMasterOrderDetail.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MgMasterOrderDetail);
