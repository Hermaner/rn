import React from 'react';
import { View, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Text, Icon } from 'native-base';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
import { popRoute, pushRoute } from '../../actions';
import { Header, TitleItem, TOpacity } from '../../components';
import base from './base';
import styles from './styles';

class ApplyWant extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.pop();
      return true;
    });
  }
  _renderContent() {
    const { items, joins } = this.state;
    return (
      <View style={styles.intrView}>
        <TitleItem
          text="直接入住"
        />
        {
          items.map((item, index) => (
            <TOpacity
              key={index}
              content={
                <View style={styles.list}>
                  <View style={styles.listColor}>
                    <Icon name="md-alarm" style={[styles.listIcon, { color: item.color }]} />
                  </View>
                  <View style={styles.listMid}>
                    <Text style={styles.name}>{item.title}</Text>
                    <Text style={styles.label}>{item.label}</Text>
                  </View>
                  <Icon name="md-arrow-dropright" style={styles.arr} />
                </View>
              }
              onPress={() => this.props.push({ key: item.page })}
            />
          ))
        }
        <TitleItem
          text="代理商加盟"
        />
        {
          joins.map((item, index) => (
            <TOpacity
              key={index}
              content={
                <View style={styles.list}>
                  <View style={styles.listColor}>
                    <Icon name="md-alarm" style={[styles.listIcon, { color: item.color }]} />
                  </View>
                  <View style={styles.listMid}>
                    <Text style={styles.name}>{item.title}</Text>
                    <Text style={styles.label}>{item.label}</Text>
                  </View>
                  <Icon name="md-arrow-dropright" style={styles.arr} />
                </View>
              }
              onPress={() => Communications.phonecall('4009201913', false)}
            />
          ))
        }
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="我要合作" />
        <Content>
          {this._renderContent()}
        </Content>
      </Container>
    );
  }
}

ApplyWant.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(ApplyWant);
