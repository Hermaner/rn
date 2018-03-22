import React from 'react';
import TabsScreen from './TabsScreen';

class Main extends React.Component {
  render() {
    return <TabsScreen />;
  }
}
Main.navigationOptions = {
  header: null,
};

export default Main;
