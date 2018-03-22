import React from 'react';
import { View, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Text, Button } from 'native-base';
import { connect } from 'react-redux';
import { popRoute } from '../../actions';
import { Header } from '../../components';
import base from './base';
import styles from './styles';

class CgyServices extends base {
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
  _renderContent() {
    const { data } = this.state;
    return (
      <View style={styles.content}>
        <View style={styles.topView}>
          <Text style={styles.topText}>请理性选择，若买家投诉服务不堆成会降低诚信打分，影响产品排名和交易效率（可多选可不选）</Text>
        </View>
        {
          data.map((lists, index) => (
            <View key={index}>
              <View style={styles.listTitle}>
                <Text style={styles.listTitleText}>{lists.title}</Text>
              </View>
              <View style={styles.btnList}>
                {
                  lists.items.map((item, i) => (
                    <Button
                      key={i}
                      onPress={() => this.tabList(index, i)}
                      style={[styles.btn, item.cur && styles.btnCur]}
                    >
                      <Text
                        style={[styles.btnText, item.cur && styles.btnTextCur]}
                      >{item.label}</Text>
                    </Button>
                  ))
                }
              </View>
            </View>
          ))
        }
        <View style={{ padding: 10 }}>
          <Button onPress={this.saveData} full light style={styles.savebtn}><Text style={{ color: '#fff' }}>填好了</Text></Button>
        </View>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="货品描述" />
        <Content>
          {this._renderContent()}
        </Content>
      </Container>
    );
  }
}

CgyServices.propTypes = {
  pop: PropTypes.func,
};
export default connect(null, { pop: popRoute })(CgyServices);
