import React from 'react';
import { View, Image, TouchableWithoutFeedback, Modal } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Text, Icon, Footer } from 'native-base';
import { connect } from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ImageViewer from 'react-native-image-zoom-viewer';
import { popRoute, pushRoute } from '../../actions';
import { Header, ScrollableTab, GoodList } from '../../components';
import { DeepClone } from '../../../api';
import base from './base';
import styles from './styles';

class MainScreen extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...DeepClone(this.resetData),
    };
  }
  componentDidMount() {
    this.getImageHeight();
  }
  _renderTop() {
    return (
      <View style={styles.topView}>
        <Image source={{ uri: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2495803215,2562259820&fm=173&s=DA383EC754026CEE0E2E89200300704B&w=218&h=146&img.JPEG' }} style={styles.mainImg} />
        <View style={styles.toplogo}>
          <Image source={{ uri: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2495803215,2562259820&fm=173&s=DA383EC754026CEE0E2E89200300704B&w=218&h=146&img.JPEG' }} style={styles.mainLogo} />
        </View>
        <View style={styles.topBtn}>
          <Icon name="arrow-back" style={styles.topIcon} />
          <Text style={styles.topText}>关注</Text>
        </View>
      </View>
    );
  }
  _renderNameAP() {
    return (
      <View style={styles.midMainView}>
        <View style={styles.nameOneView}>
          <View style={styles.nameTextView}>
            <Icon name="arrow-back" style={styles.nameIcon} />
            <Icon name="arrow-back" style={styles.nameIcon} />
            <Text style={styles.nameText}>吴涛</Text>
          </View>
          <View style={styles.nameLabelView}>
            <Text style={styles.grayText}>基地直供基地直供</Text>
          </View>
        </View>
        <View style={styles.midMainCount}>
          <View style={styles.mmcList}>
            <Text style={styles.mmcText}>3424</Text>
            <Text style={styles.mmmLabel}>店铺访客</Text>
          </View>
          <View style={styles.mmcList}>
            <Text style={styles.mmcText}>3</Text>
            <Text style={styles.mmmLabel}>店铺访客</Text>
          </View>
          <View style={styles.mmcList}>
            <Text style={styles.mmcText}>24</Text>
            <Text style={styles.mmmLabel}>店铺访客</Text>
          </View>
          <View style={styles.mmcList}>
            <Text style={styles.mmcText}>1</Text>
            <Text style={styles.mmmLabel}>店铺访客</Text>
          </View>
        </View>
        <View style={styles.midMainCredit}>
          <Image source={{ uri: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2495803215,2562259820&fm=173&s=DA383EC754026CEE0E2E89200300704B&w=218&h=146&img.JPEG' }} style={styles.creditImg} />
          <View style={styles.creditView}>
            <Text style={styles.creditText}>江西定都县</Text>
            <Text style={styles.creditLabel}>已缴纳保证金5000元</Text>
          </View>
          <View style={styles.creditRight}>
            <Text style={styles.creditRightText}>了解服务</Text>
            <Icon name="arrow-back" style={styles.creditRightIcon} />
          </View>
        </View>
      </View>
    );
  }
  _renderProvideTypes() {
    return (
      <View style={styles.provideTypes}>
        <View style={styles.provideTypesLeft}>
          <View style={styles.ptlList}>
            <Icon name="arrow-back" style={styles.ptlIcon} />
            <Text style={styles.ptlText}>基地直供</Text>
          </View>
          <View style={styles.ptlList}>
            <Icon name="arrow-back" style={styles.ptlIcon} />
            <Text style={styles.ptlText}>基地直供</Text>
          </View>
          <View style={styles.ptlList}>
            <Icon name="arrow-back" style={styles.ptlIcon} />
            <Text style={styles.ptlText}>基地直供</Text>
          </View>
          <View style={styles.ptlList}>
            <Icon name="arrow-back" style={styles.ptlIcon} />
            <Text style={styles.ptlText}>基地直供</Text>
          </View>
        </View>
        <Icon name="arrow-back" style={styles.ptrIcon} />
      </View>
    );
  }
  _renderSkuTable() {
    const data = ['认证身份', '公司', '认证身份', '公司', '认证身份', '公司', '认证身份', '公司', '认证身份', '公司', '认证身份', '公司'];
    const imageData = [{
      imgUrl: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2495803215,2562259820&fm=173&s=DA383EC754026CEE0E2E89200300704B&w=218&h=146&img.JPEG',
      name: '产品照片',
    }, {
      imgUrl: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2495803215,2562259820&fm=173&s=DA383EC754026CEE0E2E89200300704B&w=218&h=146&img.JPEG',
      name: '产品照片',
    }, {
      imgUrl: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2495803215,2562259820&fm=173&s=DA383EC754026CEE0E2E89200300704B&w=218&h=146&img.JPEG',
      name: '产品照片',
    }, {
      imgUrl: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2495803215,2562259820&fm=173&s=DA383EC754026CEE0E2E89200300704B&w=218&h=146&img.JPEG',
      name: '产品照片',
    }];
    const { certifIndex, isCertifShow, imageViewData } = this.state;
    return (
      <View style={styles.skuTable}>
        <View style={styles.skuTableTitle}>
          <Text style={styles.skuTableTitleText}>实地认证</Text>
        </View>
        <View style={styles.stTabelView}>
          {
            data.map((item, index) => (
              <View key={index} style={index % 2 === 0 ? styles.stLabelView : styles.stTextView}>
                <Text style={styles.skuTableText}>{item}</Text>
              </View>
            ))
          }
        </View>
        <View style={styles.certifView}>
          {
            imageData.map((item, index) => (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => this.showCertifImage(index, imageData)}
              >
                <View style={styles.certifList}>
                  <Image source={{ uri: item.imgUrl }} style={styles.certifImg} />
                  <Text style={styles.certifText}>{item.name}</Text>
                </View>
              </TouchableWithoutFeedback>
            ))
          }
        </View>
        <Modal
          visible={isCertifShow}
          index={certifIndex}
          transparent
        >
          <ImageViewer
            imageUrls={imageViewData}
            onClick={() => this.setState({ isCertifShow: false })}
          />
        </Modal>
      </View>
    );
  }
  _renderTabs() {
    const { otherItems } = this.state;
    const Tab = () => (
      <View>
        {
          otherItems.map((item, index) => (
            <GoodList
              data={item}
              key={index}
              onPress={() => { this.props.push({ key: 'GoodDetail' }); }}
            />
          ))
        }
      </View>
    );
    return (
      <View style={{ backgroundColor: '#fff', marginTop: 10 }}>
        <ScrollableTabView locked renderTabBar={() => <ScrollableTab />}>
          <Tab tabLabel="供应" />
        </ScrollableTabView>
      </View>
    );
  }
  _renderFooter() {
    return (
      <Footer>
        <View style={styles.fotBtn1}>
          <Icon name="arrow-back" style={styles.fotChatIcon} />
          <Text style={styles.fotChatText}>聊生意</Text>
        </View>
        <View style={styles.fotBtn2}>
          <Text style={styles.fotText}>打电话</Text>
        </View>
        <View style={styles.fotBtn3}>
          <Text style={styles.fotText}>立即购买</Text>
        </View>
      </Footer>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header
          back={pop}
          title="供应详情"
          showRight
          rightText="更多"
          rightPress={this.resetState}
        />
        <Content>
          {this._renderTop()}
          {this._renderNameAP()}
          {this._renderProvideTypes()}
          {this._renderSkuTable()}
          {this._renderTabs()}
        </Content>
        {this._renderFooter()}
      </Container>
    );
  }
}

MainScreen.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MainScreen);
