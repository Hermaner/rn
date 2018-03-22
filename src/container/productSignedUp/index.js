import React from 'react';
import { View, BackHandler } from 'react-native';
import { Container, Content, Text, Input, Icon, Footer } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { observer } from 'mobx-react/native';
import { Loading, Header, TOpacity, Iconfont } from '../../components';
import { pushRoute, popRoute } from '../../actions';
import Base from './base';
import styles from './styles';

@observer
class StrengthBusiness extends Base {
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
  _renderFirst() {
    return (
      <View style={styles.bodyBox}>
        <View style={styles.topBox} />
        <View style={styles.introduceBox}>
          <Text style={styles.title}>重点产品推广活动报名</Text>
          <View style={styles.flexRowText}>
            <Text numberOfLines={1} style={styles.leftText}>活动优势：</Text>
            <Text style={styles.rightText}>免费推广；集中流量和曝光；被更多的采购商看到，获得更多的商机！</Text>
          </View>
          <View style={styles.flexRowText}>
            <Text numberOfLines={1} style={styles.leftText}>报名要求：</Text>
            <Text style={styles.rightText}>
              至少发布一条报名类目的供应信息且该信息价格需符合市场行情，主图含产品图，文字详情包含详细规格,货运方式,供货量,货品特色等情况。
            </Text>
          </View>
        </View>
      </View>
    );
  }
  _renderRegisterInfo() {
    const { infoList } = this.state;
    return (
      <View style={styles.bodyBox}>
        {
          infoList.map((item, index) => (
            <View key={index} style={styles.infoBox}>
              <View style={styles.flexRow}>
                <Text style={styles.registerTextLeft}>{item.title}</Text>
                <Text style={styles.registerText}> * </Text>
              </View>
              <View style={styles.inputBox}>
                {
                  !item.noIcn &&
                    <View style={styles.icnBox}>
                      <Icon style={styles.icn} name="phone-portrait" />
                    </View>
                }
                <Input
                  style={styles.inputText}
                  value={item.label}
                  onChangeText={value => this.saveInfo(value, index)}
                  placeholderTextColor="#999"
                />
              </View>
            </View>
          ))
        }
      </View>
    );
  }
  _renderPosition() {
    const { address, isClick } = this.state;
    return (
      <View style={styles.bodyBox}>
        <View style={styles.infoBox}>
          <Text style={styles.registerTextLeft}>地理位置</Text>
          {
            !isClick &&
            <TOpacity
              style={styles.flexOne}
              content={
                <View style={styles.positionTextBox}>
                  <Iconfont
                    style={styles.positionIcn}
                    name="icon-4"
                  />
                  <Text style={styles.positionText}>获取地理位置</Text>
                </View>
              }
              onPress={() => this.getPosition()}
            />
          }
          {
            isClick &&
            <View style={styles.positionTextBox}>
              <Iconfont
                style={styles.positionIcn}
                name="icon-4"
              />
              <Text numberOfLines={1} style={styles.positionTextTwo}>{address}</Text>
            </View>
          }
        </View>
      </View>
    );
  }
  _renderChooseType() {
    const { threeList } = this.state;
    return (
      <View style={[styles.bodyBox, styles.paddingT]}>
        {
          threeList.map((item, index) => (
            <View key={index} style={styles.chooseTypeBox}>
              <View style={styles.flexRow}>
                <Text style={styles.registerTextLeft}>{item[0]}</Text>
                <Text style={styles.registerText}> * </Text>
              </View>
              <View style={styles.chooseTypeBorder}>
                {
                  item[1].map((item2, i) => (
                    <TOpacity
                      key={i}
                      style={item2.cur ? styles.smallBtnBoxChoose : styles.smallBtnBox}
                      content={
                        <Text style={item2.cur ? styles.smallBtnTextChoose : styles.smallBtnText}>
                          {item2.name}
                        </Text>
                      }
                      onPress={() => { this.chooseType(index, i); }}
                    />
                  ))
                }
              </View>
            </View>
          ))
        }
      </View>
    );
  }
  _renderPrompt() {
    return (
      <View style={[styles.bodyBox, styles.marginFooter]}>
        <View style={styles.footerTop}>
          <Text style={styles.rightText}>注意</Text>
          <View style={styles.flexRow}>
            <View style={styles.circle} />
            <Text style={styles.rightText}>由于专题位有限，我们将选取产品资料最为完善的商家，望各位悉知</Text>
          </View>
        </View>
      </View>
    );
  }
  _renderFooter() {
    return (
      <Footer style={styles.footerBackground}>
        <TOpacity
          style={styles.btnBox}
          content={
            <Text style={styles.btnText}>提交</Text>
          }
          onPress={() => { this.sumit(); }}
        />
      </Footer>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="重点产品活动报名" />
        <Content style={styles.pageBody}>
          {this._renderFirst()}
          {this._renderRegisterInfo()}
          {this._renderPosition()}
          {this._renderChooseType()}
          {this._renderPrompt()}
        </Content>
        {this._renderFooter()}
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

StrengthBusiness.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(StrengthBusiness);
