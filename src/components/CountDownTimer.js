import React, {
    Component,
} from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

const styles = StyleSheet.create({
  cardItemTimeRemainTxt: {
    fontSize: 20,
    color: '#ee394b',
  },
  text: {
    fontSize: 30,
    color: '#FFF',
    marginLeft: 7,
  },
  container: {
    flexDirection: 'row',
  },
  defaultTime: {
    paddingHorizontal: 3,
    backgroundColor: 'rgba(85, 85, 85, 1)',
    fontSize: 12,
    color: 'white',
    marginHorizontal: 3,
    borderRadius: 2,
  },
  defaultColon: {
    fontSize: 12,
    color: 'rgba(85, 85, 85, 1)',
  },
});

class CountDown extends Component {
  static displayName = 'Simple countDown';
  static propTypes = {
    date: PropTypes.string,
    onEnd: PropTypes.func,
  };
  static defaultProps = {
    date: new Date(),
    days: {
      plural: '天',
      singular: '天',
    },
    hours: ':',
    mins: ':',
    segs: ':',
    onEnd: () => {},
  };
  state = {
    days: 0,
    hours: 0,
    min: 0,
    sec: 0,
  };
  componentWillMount() {
    const date = this.getDateData(this.props.date);
    if (date) {
      this.setState(date);
    }
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      const date = this.getDateData(this.props.date);
      if (date) {
        this.setState(date);
      } else {
        this.stop();
        this.props.onEnd();
      }
    }, 1000);
  }
  componentWillUnmount() {
    this.stop();
  }
  getDateData(endDate) {
    let diff = (new Date(endDate).getTime() - new Date().getTime()) / 1000;
    if (diff <= 0) {
      return false;
    }

    const timeLeft = {
      years: 0,
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
      millisec: 0,
    };

    if (diff >= (365.25 * 86400)) {
      timeLeft.years = Math.floor(diff / (365.25 * 86400));
      diff -= timeLeft.years * 365.25 * 86400;
    }
    if (diff >= 86400) {
      timeLeft.days = Math.floor(diff / 86400);
      diff -= timeLeft.days * 86400;
    }
    if (diff >= 3600) {
      timeLeft.hours = Math.floor(diff / 3600);
      diff -= timeLeft.hours * 3600;
    }
    if (diff >= 60) {
      timeLeft.min = Math.floor(diff / 60);
      diff -= timeLeft.min * 60;
    }
    timeLeft.sec = Math.floor(diff);
    return timeLeft;
  }
  stop() {
    clearInterval(this.interval);
  }
  leadingZeros(num, length = null) {
    let length_ = length;
    let num_ = num;
    if (length_ === null) {
      length_ = 2;
    }
    num_ = String(num_);
    while (num_.length < length_) {
      num_ = `0${num_}`;
    }
    return num_;
  }
  render() {
    const countDown = this.state;
    return (
      <View style={styles.container}>
        { (countDown.days > 0) ?
          <Text style={styles.defaultTime}> {`${this.leadingZeros(countDown.days)}天`}</Text> : null}
        <Text style={styles.defaultTime}>{this.leadingZeros(countDown.hours)}</Text>
        <Text style={styles.defaultColon}>:</Text>
        <Text style={styles.defaultTime}>{this.leadingZeros(countDown.min)}</Text>
        <Text style={styles.defaultColon}>:</Text>
        <Text style={styles.defaultTime}>{this.leadingZeros(countDown.sec)}</Text>
      </View>
    );
  }
}

export default CountDown;
