import React from 'react';
import { TouchableHighlight, TouchableOpacity, View, TextInput, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { Container, Content, Footer, Title, FooterTab, Button, Left, Right, Card, CardItem, Body, Icon, Text, ActionSheet, Badge, ListItem, CheckBox } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header } from '../../components';
import { pushRoute, popRoute } from '../../actions';
import base from './base';
import styles from './styles';

class MainScreen extends base {
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
    const { typeList, isName, changeOne } = this.state;
    return (
      <View style={styles.pagebody}>
        <View style={styles.pageTitle}>
          <Text style={{ marginRight: 10, color: '#628524', fontSize: 18 }}>您来惠农的目的是</Text>
          {
            isName &&
            <Text style={{ color: '#628524', fontSize: 18 }}>来找货</Text>
          }
        </View>
        {
          isName &&
          <Text style={styles.userName}>您的姓名是</Text>
        }
        {
          isName &&
          <View style={styles.inputBox}>
            <TextInput
              style={styles.inputs}
              returnKeyType="search"
              placeholder="点击输入您的姓名"
            />
          </View>
        }
        <View style={styles.identity}>
          <TouchableOpacity onPress={() => { this.identityChange1(); }}>
            <View style={styles.identityOne}>
              <Image
                style={[styles.headerImg, changeOne === 1 && styles.isChooseBackground]}
                source={require('../app/resource/imgs/avatar.jpg')}
              />
              <Text
                style={[styles.identityText, changeOne === 1 && styles.isChooseText]}
              >
                我来找货
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { this.identityChange2(); }}>
            <View style={styles.identityOne}>
              <Image
                style={[styles.headerImg, changeOne === 2 && styles.isChooseBackground]}
                source={require('../app/resource/imgs/avatar.jpg')}
              />
              <Text
                style={[styles.identityText, changeOne === 2 && styles.isChooseText]}
              >
                我来卖货
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.typeChooseTitleBox}>
          <Text style={styles.typeChooseTitle}>请从下方选择身份，方便为您提供精准服务</Text>
        </View>
        <View style={styles.typeBox}>
          {
            typeList.map((item, index) => (
              <TouchableOpacity
                style={[styles.typeTitleBox, item.cur && styles.typeChoose]}
                key={index}
                onPress={() => this.userIdentity(index)}
              >
                <Text style={styles.typeTitle}>{item.label}</Text>
              </TouchableOpacity>
            ))
          }
          <View style={styles.typeTitleBox} onPress={() => this.userIdentity()}>
            <Text style={styles.typeTitle}>批发商</Text>
          </View>
        </View>
      </View>



    )
  }
  render() {
    const { pop, push } = this.props;
    return (
      <Container>
        <Header back={pop} title="完善信息" />
        <Content>
          {this._renderBody()}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>提交</Text>
          </TouchableOpacity>
          <View style={styles.prompt}>
            <Text style={styles.promptInfo}>确定后,您可以在“我的>个人设置”页面重新选择您的身份</Text>
          </View>
        </Content>
      </Container>
    );
  }
}

MainScreen.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MainScreen);
