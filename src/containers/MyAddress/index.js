import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Text, Content, Footer } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { Loading, TOpacity, Header, CheckBox } from '../../components';
import base from './base';
import styles from './styles';
import { Mcolor } from '../../utils';

class MyAddress extends base {
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
    this.deleteInit();
  }
  render() {
    const { pop } = this.props;
    const { items, ads } = this.state;
    return (
      <Container>
        <Header back={pop} title="我的地址" />
        <Content>
          {
            items.map((item, index) => (
              <View key={index} style={styles.list}>
                <View style={styles.main}>
                  <View style={styles.nameView}>
                    <Text style={styles.name}>{decodeURI(item.nickName)}</Text>
                    <Text style={styles.phone}>{item.phone}</Text>
                  </View>
                  <Text style={styles.address}>
                    {item.provinceName}{item.cityName}{item.districtName}{item.address}
                  </Text>
                </View>
                <View style={styles.listBom}>
                  <CheckBox
                    content={
                      <Text style={styles.checkText}>设为默认</Text>
                    }
                    value={item.addressId}
                    isAn
                    reverse
                    onPress={() => this.backCheck(index)}
                    color={Mcolor}
                    modal={ads}
                  />
                  <View style={styles.listcK}>
                    <TOpacity
                      content={
                        <Text style={styles.listBtnText}>编辑</Text>
                      }
                      onPress={() => this.edit(index)}
                    />
                    <TOpacity
                      content={
                        <Text style={styles.listBtnText}>删除</Text>
                      }
                      onPress={() => this.deleteItem(index)}
                    />
                  </View>
                </View>
              </View>
            ))
          }
        </Content>
        <Footer style={styles.footer}>
          <TOpacity
            style={styles.btnView}
            content={
              <Text style={styles.btnText}>{'添加新地址'}</Text>
            }
            onPress={this.goAddressCreate}
          />
        </Footer>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

MyAddress.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MyAddress);
