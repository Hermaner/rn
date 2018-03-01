import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { DeviceEventEmitter } from 'react-native';
import { CreateDecorationIntroService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    const { info: {
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
    } } = this.props.navigation.state.params;
    this.state = {
      introContent: introContent || '',
      scale: scale || '',
      services: services || '',
      initialDesign: initialDesign || '',
      initialBudget: initialBudget || '',
      deepenDesign: deepenDesign || '',
      deepenBudget: deepenBudget || '',
      quality: quality || '',
      contract: contract || '',
      feature: feature || '',
      serviceArea: serviceArea || '',
      serviceExpertise: serviceExpertise || '',
      acceptPrice: acceptPrice || '',
      specialtyStyle: specialtyStyle || '',
    };
  }
  save = () => {
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
    if (introContent.length < 10) {
      Toast.show('公司介绍不能少于15字');
      return;
    }
    this.sleek.toggle();
    CreateDecorationIntroService({
      decorationId: global.decorationId,
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
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        Toast.show('保存成功');
        DeviceEventEmitter.emit('emitMasterLoad');
        this.props.pop();
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
}
Base.propTypes = {
  pop: PropTypes.func,
  navigation: PropTypes.navigation,
};
export default Base;
