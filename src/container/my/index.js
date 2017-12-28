import React from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import { Container, Content, Icon, Text } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import myBase from './base';
import styles from './styles';

class My extends myBase {
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
    const { items, backGround1 } = this.state;
    return (
      <View style={styles.pagebody}>
        <View style={styles.headerImgBox}>
          <Image style={styles.headerImg} source={backGround1} />
        </View>
        <View style={{ height: 150, paddingLeft: 10, paddingRight: 10 }}>
          <View style={styles.accountMoney}>
            <TouchableOpacity onPress={() => { push({ key: 'NotificationSystem' }); }}>
              <Text style={styles.textBackground}>消息</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { push({ key: 'SystemSet' }); }} style={styles.rightBtn}>
              <Text style={styles.textBackground}>设置</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => { push({ key: 'SelfSet' }); }}>
            <View style={{ flexDirection: 'row' }}>
              <Image style={styles.userImg} source={{ uri: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2495803215,2562259820&fm=173&s=DA383EC754026CEE0E2E89200300704B&w=218&h=146&img.JPEG' }} />
              <View>
                <Text style={{ marginBottom: 25, backgroundColor: 'transparent', color: '#fff', fontSize: 16 }}>三生三世</Text>
                <Text style={[styles.textBackground, styles.textSmall]}>其他行业</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        {
          items.map((item, index) => (
            <View style={styles.detailInfo} key={index}>
              <Text style={styles.myIdentity}>{item[0]}</Text>
              {
                item[1].map((item2, index2) => (
                  <TouchableOpacity key={index2} onPress={() => { push({ key: item2.push }); }}>
                    <View style={styles.infoBox}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon style={{ marginRight: 20, fontSize: 20, color: item2.icnColor }} name="arrow-back" />
                        <Text style={{ color: '#666', fontSize: 14 }}>{item2.title}</Text>
                      </View>
                      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Text style={{ color: '#999', fontSize: 14 }}>{item2.label}</Text>
                        <Icon style={{ marginLeft: 10, fontSize: 20, color: '#666' }} name="md-arrow-dropright" />
                      </View>
                    </View>
                  </TouchableOpacity>
                ))
              }
            </View>
          ))
        }
      </View>
    );
  }
  render() {
    return (
      <Container>
        <Content>
          {this._renderBody()}
        </Content>
      </Container>
    );
  }
}

My.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(My);
