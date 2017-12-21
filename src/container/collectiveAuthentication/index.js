import React from 'react';
import { TouchableHighlight, TouchableOpacity, View, TextInput, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { Container, Content, Picker, Item, Footer, Title, FooterTab, Button, Left, Right, Card, CardItem, Body, Icon, Text, ActionSheet, Badge, ListItem, CheckBox } from 'native-base';
import PropTypes from 'prop-types';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { ScrollableTab, Header } from '../../components';
import collectiveAuthenticationBase from './base';
import styles from './styles';

class CollectiveAuthentication extends collectiveAuthenticationBase {
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
    const Tab1 = () => (
      <View style={styles.detialView}>
        <View style={{ marginBottom: 10 }}>
          <View style={styles.rowBox}>
            <Text style={styles.rowBoxLeft}>企业名称</Text>
            <View style={styles.rowBoxRight}>
              <TextInput
                style={styles.inputText}
                placeholder="请与证件公司名称保持一致"
              />
            </View>
          </View>
        </View>
        <View style={{ marginBottom: 10 }}>
          <View style={styles.rowBox}>
            <Text style={styles.rowBoxLeft}>法人代表</Text>
            <View style={styles.rowBoxRight}>
              <TextInput
                style={styles.inputText}
                placeholder="请与证件法人姓名保持一致"
              />
            </View>
          </View>
        </View>
        <View style={{ marginBottom: 10 }}>
          <View style={styles.rowBox}>
            <Text style={styles.rowBoxLeft}>统一社会信用代码</Text>
            <View style={styles.rowBoxRight}>
              <TextInput
                style={styles.inputText}
                placeholder="请与证件代码保持一致"
              />
            </View>
          </View>
        </View>
        <Text style={{ fontSize: 14, color: '#666', marginBottom: 10, marginLeft: 10 }}>执照照片</Text>
        <View style={styles.imgPart}>
          <View style={styles.imgOne}>
            <Image style={styles.uploadImg} source={require('../app/resource/imgs/pz.png')} />
            <Text style={{ flex: 1, color: '#666', fontSize: 14 }}>点击上传执照照片(公司名称,有效期及证件号码必须清晰可辩)</Text>
          </View>
        </View>
      </View>
    );
    const Tab2 = () => (
      <View style={styles.detialView}>
        <View style={{ marginBottom: 10 }}>
          <View style={styles.rowBox}>
            <Text style={styles.rowBoxLeft}>企业名称</Text>
            <View style={styles.rowBoxRight}>
              <TextInput
                style={styles.inputText}
                placeholder="请与证件公司名称保持一致"
              />
            </View>
          </View>
        </View>
        <View style={{ marginBottom: 10 }}>
          <View style={styles.rowBox}>
            <Text style={styles.rowBoxLeft}>法人代表</Text>
            <View style={styles.rowBoxRight}>
              <TextInput
                style={styles.inputText}
                placeholder="请与证件法人姓名保持一致"
              />
            </View>
          </View>
        </View>
        <View style={{ marginBottom: 10, backgroundColor: '#fff' }}>
          <View style={styles.rowBox}>
            <Text style={styles.rowBoxLeft}>营业执照号码</Text>
            <View style={styles.rowBoxRight}>
              <TextInput
                style={styles.inputText}
                placeholder="请与执照号码保持一致"
              />
            </View>
          </View>
          <View style={styles.imgOne}>
            <Image style={styles.uploadImg} source={require('../app/resource/imgs/pz.png')} />
            <Text style={{ flex: 1, color: '#666', fontSize: 14 }}>点击上传执照图片(公司名称,有效期及证件号码必须清晰可见)</Text>
          </View>
        </View>
        <View style={{ marginBottom: 10, backgroundColor: '#fff' }}>
          <View style={styles.rowBox}>
            <Text style={styles.rowBoxLeft}>组织机构代码</Text>
            <View style={styles.rowBoxRight}>
              <TextInput
                style={styles.inputText}
                placeholder="请与执照号码保持一致"
              />
            </View>
          </View>
          <View style={styles.imgOne}>
            <Image style={styles.uploadImg} source={require('../app/resource/imgs/pz.png')} />
            <Text style={{ flex: 1, color: '#666', fontSize: 14 }}>点击上传图片(需要能看清机构名称,号码,地址等信息)</Text>
          </View>
        </View>
      </View>
    );
    return (
      <View style={styles.pagebody}>
        <ScrollableTabView renderTabBar={() => <ScrollableTab />}>
          <Tab1 tabLabel="三证合一" />
          <Tab2 tabLabel="营业执照" />
        </ScrollableTabView>
      </View>
    )
  }
  render() {
    const { pop, push } = this.props;
    return (
      <Container>
        <Header back={pop} title="企业认证" />
        <Content>
          {this._renderBody()}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>提交</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ marginTop: 10 }}>
            <Text style={{ color: '#65C12E', textAlign: 'center', fontSize: 14 }}>审核须知</Text>
          </TouchableOpacity>
        </Content>
      </Container>
    );
  }
}

CollectiveAuthentication.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(CollectiveAuthentication);
