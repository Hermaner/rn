import React from 'react';
import { View, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Text, Footer, Input } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { Header, Loading, TitleItem, TOpacity } from '../../components';
import base from './base';
import styles from './styles';

class MgMasterPublish extends base {
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
  componentWillUnmount() {
  }
  _renderContent() {
    const {
      introContent,
      scale,
      services,
      initialDesign,
      initialBudget,
      deepenDesign,
      deepenBudget,
      quality,
      contract,
      feature,
      serviceArea,
      serviceExpertise,
      acceptPrice,
      specialtyStyle,
    } = this.state;
    return (
      <View style={styles.mainList}>
        <TitleItem text="公司简介" />
        <View style={[styles.listView, styles.memoView]}>
          <View style={styles.listRight}>
            <Input
              multiline
              style={styles.listMemo}
              placeholderTextColor="#999"
              placeholder="输入公司简介"
              clearButtonMode="while-editing"
              value={introContent}
              onChangeText={value => this.setState({ introContent: value })}
            />
          </View>
        </View>
        <TitleItem text="公司规模" />
        <View style={[styles.listView, styles.memoView]}>
          <View style={styles.listRight}>
            <Input
              multiline
              style={styles.listMemoShort}
              placeholderTextColor="#999"
              placeholder="公司规模"
              clearButtonMode="while-editing"
              value={scale}
              onChangeText={value => this.setState({ scale: value })}
            />
          </View>
        </View>
        <TitleItem text="售后服务" />
        <View style={[styles.listView, styles.memoView]}>
          <View style={styles.listRight}>
            <Input
              multiline
              style={styles.listMemoShort}
              placeholderTextColor="#999"
              placeholder="售后服务"
              clearButtonMode="while-editing"
              value={services}
              onChangeText={value => this.setState({ services: value })}
            />
          </View>
        </View>
        <TitleItem text="初期设计/量房" />
        <View style={[styles.listView, styles.memoView]}>
          <View style={styles.listRight}>
            <Input
              multiline
              style={styles.listMemoShort}
              placeholderTextColor="#999"
              placeholder="初期设计/量房"
              clearButtonMode="while-editing"
              value={initialDesign}
              onChangeText={value => this.setState({ initialDesign: value })}
            />
          </View>
        </View>
        <TitleItem text="初期预算/洽谈方式" />
        <View style={[styles.listView, styles.memoView]}>
          <View style={styles.listRight}>
            <Input
              multiline
              style={styles.listMemoShort}
              placeholderTextColor="#999"
              placeholder="初期预算/洽谈方式"
              clearButtonMode="while-editing"
              value={initialBudget}
              onChangeText={value => this.setState({ initialBudget: value })}
            />
          </View>
        </View>
        <TitleItem text="深化设计" />
        <View style={[styles.listView, styles.memoView]}>
          <View style={styles.listRight}>
            <Input
              multiline
              style={styles.listMemoShort}
              placeholderTextColor="#999"
              placeholder="深化设计"
              clearButtonMode="while-editing"
              value={deepenDesign}
              onChangeText={value => this.setState({ deepenDesign: value })}
            />
          </View>
        </View>
        <TitleItem text="深化预算" />
        <View style={[styles.listView, styles.memoView]}>
          <View style={styles.listRight}>
            <Input
              multiline
              style={styles.listMemoShort}
              placeholderTextColor="#999"
              placeholder="深化预算"
              clearButtonMode="while-editing"
              value={deepenBudget}
              onChangeText={value => this.setState({ deepenBudget: value })}
            />
          </View>
        </View>
        <TitleItem text="材料质量" />
        <View style={[styles.listView, styles.memoView]}>
          <View style={styles.listRight}>
            <Input
              multiline
              style={styles.listMemoShort}
              placeholderTextColor="#999"
              placeholder="材料质量"
              clearButtonMode="while-editing"
              value={quality}
              onChangeText={value => this.setState({ quality: value })}
            />
          </View>
        </View>
        <TitleItem text="合同规范性" />
        <View style={[styles.listView, styles.memoView]}>
          <View style={styles.listRight}>
            <Input
              multiline
              style={styles.listMemoShort}
              placeholderTextColor="#999"
              placeholder="合同规范性"
              clearButtonMode="while-editing"
              value={contract}
              onChangeText={value => this.setState({ contract: value })}
            />
          </View>
        </View>
        <TitleItem text="特色服务" />
        <View style={[styles.listView, styles.memoView]}>
          <View style={styles.listRight}>
            <Input
              multiline
              style={styles.listMemoShort}
              placeholderTextColor="#999"
              placeholder="特色服务"
              clearButtonMode="while-editing"
              value={feature}
              onChangeText={value => this.setState({ feature: value })}
            />
          </View>
        </View>
        <TitleItem text="服务区域" />
        <View style={[styles.listView, styles.memoView]}>
          <View style={styles.listRight}>
            <Input
              multiline
              style={styles.listMemoShort}
              placeholderTextColor="#999"
              placeholder="服务区域"
              clearButtonMode="while-editing"
              value={serviceArea}
              onChangeText={value => this.setState({ serviceArea: value })}
            />
          </View>
        </View>
        <TitleItem text="服务专长" />
        <View style={[styles.listView, styles.memoView]}>
          <View style={styles.listRight}>
            <Input
              multiline
              style={styles.listMemoShort}
              placeholderTextColor="#999"
              placeholder="服务专长"
              clearButtonMode="while-editing"
              value={serviceExpertise}
              onChangeText={value => this.setState({ serviceExpertise: value })}
            />
          </View>
        </View>
        <TitleItem text="承接价位" />
        <View style={[styles.listView, styles.memoView]}>
          <View style={styles.listRight}>
            <Input
              multiline
              style={styles.listMemoShort}
              placeholderTextColor="#999"
              placeholder="承接价位"
              clearButtonMode="while-editing"
              value={acceptPrice}
              onChangeText={value => this.setState({ acceptPrice: value })}
            />
          </View>
        </View>
        <TitleItem text="专长风格" />
        <View style={[styles.listView, styles.memoView]}>
          <View style={styles.listRight}>
            <Input
              multiline
              style={styles.listMemoShort}
              placeholderTextColor="#999"
              placeholder="专长风格"
              clearButtonMode="while-editing"
              value={specialtyStyle}
              onChangeText={value => this.setState({ specialtyStyle: value })}
            />
          </View>
        </View>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="服务介绍" />
        <Content>
          {this._renderContent()}
        </Content>
        <Footer style={styles.footer}>
          <TOpacity
            style={styles.btnView}
            content={
              <Text style={styles.btnText}>{'立即保存'}</Text>
            }
            onPress={this.save}
          />
        </Footer>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

MgMasterPublish.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MgMasterPublish);
