import React from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import { Container, Content, Input, Text } from 'native-base';
import PropTypes from 'prop-types';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { ScrollableTab, Header, TFeedback, Loading, PeopleUploadFile } from '../../components';
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
    this.getInit();
  }
  _renderBody() {
    const {
      licenseImg,
      licenseCode,
      organizationCode,
      organizationImg,
      representative } = this.state;
    const Tab1 = () => (
      <View style={styles.detialView}>
        <View style={{ marginBottom: 10 }}>
          <View style={styles.rowBox}>
            <Text style={styles.rowBoxLeft}>企业名称</Text>
            <View style={styles.rowBoxRight}>
              <Input
                style={styles.inputText}
                value={this.state.businessName}
                onChangeText={text => this.saveBusinessName(text)}
                placeholder="请与证件公司名称保持一致"
              />
            </View>
          </View>
        </View>
        <View style={{ marginBottom: 10 }}>
          <View style={styles.rowBox}>
            <Text style={styles.rowBoxLeft}>法人代表</Text>
            <View style={styles.rowBoxRight}>
              <Input
                style={styles.inputText}
                value={this.state.representative}
                onChangeText={text => this.saveRepresentative(text)}
                placeholder="请与证件法人姓名保持一致"
              />
            </View>
          </View>
        </View>
        <View style={{ marginBottom: 10 }}>
          <View style={styles.rowBox}>
            <Text style={styles.rowBoxLeft}>统一社会信用代码</Text>
            <View style={styles.rowBoxRight}>
              <Input
                style={styles.inputText}
                value={this.state.creditCode}
                onChangeText={text => this.saveCreditCode(text)}
                placeholder="请与证件代码保持一致"
              />
            </View>
          </View>
        </View>
        <Text style={{ fontSize: 14, color: '#666', marginBottom: 10, marginLeft: 10 }}>执照照片</Text>
        <View style={styles.imgPart}>
          <View style={styles.imgOne}>
            <PeopleUploadFile
              getImages={this.getImages1}
              label=""
              imageCount={1}
            />
            {
              !licenseImg ?
                <Text style={{ flex: 1, color: '#666', fontSize: 14 }}>点击上传执照照片(公司名称,有效期及证件号码必须清晰可辩)</Text>
              :
                <View style={{ flex: 1 }}>
                  <Image style={styles.exampleImg} source={{ uri: licenseImg }} />
                </View>
            }
          </View>
        </View>
        <TFeedback
          content={
            <View style={styles.button}>
              <Text style={styles.buttonText}>提交</Text>
            </View>}
          onPress={() => { this.submit('1'); }}
        />
        <TouchableOpacity style={{ marginTop: 10 }}>
          <Text style={{ color: '#65C12E', textAlign: 'center', fontSize: 14 }}>审核须知</Text>
        </TouchableOpacity>
      </View>
    );
    const Tab2 = () => (
      <View style={styles.detialView}>
        <View style={{ marginBottom: 10 }}>
          <View style={styles.rowBox}>
            <Text style={styles.rowBoxLeft}>企业名称</Text>
            <View style={styles.rowBoxRight}>
              <Input
                style={styles.inputText}
                value={this.state.businessName}
                onChangeText={text => this.saveBusinessName(text)}
                placeholder="请与证件公司名称保持一致"
              />
            </View>
          </View>
        </View>
        <View style={{ marginBottom: 10 }}>
          <View style={styles.rowBox}>
            <Text style={styles.rowBoxLeft}>法人代表</Text>
            <View style={styles.rowBoxRight}>
              <Input
                style={styles.inputText}
                value={representative}
                onChangeText={text => this.saveRepresentative(text)}
                placeholder="请与证件法人姓名保持一致"
              />
            </View>
          </View>
        </View>
        <View style={{ marginBottom: 10, backgroundColor: '#fff' }}>
          <View style={styles.rowBox}>
            <Text style={styles.rowBoxLeft}>营业执照号码</Text>
            <View style={styles.rowBoxRight}>
              <Input
                style={styles.inputText}
                value={licenseCode}
                onChangeText={text => this.saveLicenseCode(text)}
                placeholder="请与执照号码保持一致"
              />
            </View>
          </View>
          <View style={styles.imgOne}>
            <PeopleUploadFile
              getImages={this.getImages1}
              label=""
              imageCount={1}
            />
            {
              !licenseImg ?
                <Text style={{ flex: 1, color: '#666', fontSize: 14 }}>点击上传执照照片(公司名称,有效期及证件号码必须清晰可辩)</Text>
              :
                <View style={{ flex: 1 }}>
                  <Image style={styles.exampleImg} source={{ uri: licenseImg }} />
                </View>
            }
          </View>
        </View>
        <View style={{ marginBottom: 10, backgroundColor: '#fff' }}>
          <View style={styles.rowBox}>
            <Text style={styles.rowBoxLeft}>组织机构代码</Text>
            <View style={styles.rowBoxRight}>
              <Input
                style={styles.inputText}
                value={organizationCode}
                onChangeText={text => this.saveOrganizationCode(text)}
                placeholder="请与执照号码保持一致"
              />
            </View>
          </View>
          <View style={styles.imgOne}>
            <PeopleUploadFile
              getImages={this.getImages2}
              label=""
              imageCount={1}
            />
            {
              !organizationImg ?
                <Text style={{ flex: 1, color: '#666', fontSize: 14 }}>点击上传图片(需要能看清机构名称,号码,地址等信息)</Text>
              :
                <View style={{ flex: 1 }}>
                  <Image style={styles.exampleImg} source={{ uri: organizationImg }} />
                </View>
            }
          </View>
        </View>
        <TFeedback
          content={
            <View style={styles.button}>
              <Text style={styles.buttonText}>提交</Text>
            </View>}
          onPress={() => { this.submit('2'); }}
        />
        <TouchableOpacity style={{ marginTop: 10 }}>
          <Text style={{ color: '#65C12E', textAlign: 'center', fontSize: 14 }}>审核须知</Text>
        </TouchableOpacity>
      </View>
    );
    return (
      <View style={styles.pagebody}>
        <ScrollableTabView renderTabBar={() => <ScrollableTab />}>
          <Tab1 tabLabel="三证合一" />
          <Tab2 tabLabel="营业执照" />
        </ScrollableTabView>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="企业认证" />
        <Content>
          {this._renderBody()}
        </Content>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

CollectiveAuthentication.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(CollectiveAuthentication);
