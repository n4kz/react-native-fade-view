import React, { Component } from 'react';
import { AppRegistry, StatusBar, View, Text, Platform } from 'react-native';
import { WaveIndicator } from 'react-native-indicators';
import { RaisedTextButton } from 'react-native-material-buttons';
import FadeView from 'react-native-fade-view';

Platform.select({
  ios: () => StatusBar.setBarStyle('light-content'),
  android: () => StatusBar.setBackgroundColor('#01579B'),
})();

export default function init() {
  class Example extends Component {
    constructor(props) {
      super(props);

      this.state = { active: false };
    }

    render() {
      let { active } = this.state;

      return (
        <View style={styles.container}>
          <FadeView style={{ flex: 1 }} animationDuration={450} active={active}>
            <WaveIndicator color='white' count={3} size={80} />
            <Text style={styles.text}>
              <Text style={styles.highlight}>FadeView</Text> is in active state
            </Text>
          </FadeView>

          <View style={{ padding: 32, backgroundColor: 'white' }}>
            <RaisedTextButton
              color='#01579B'
              title='toggle state'
              titleColor='white'
              onPress={() => this.setState(({ active }) => ({ active: !active }))}
              rippleDuration={800}
              rippleSequential={false}
            />
          </View>
        </View>
      );
    }
  }

  AppRegistry.registerComponent('example', () => Example);
}

const styles = {
  text: {
    color: 'rgba(255, 255, 255, 0.54)',
    backgroundColor: 'transparent',
    fontSize: 17,
  },

  highlight: {
    color: 'rgba(255, 255, 255, 0.87)',
    fontWeight: '500',
  },

  container: {
    flex: 1,
    backgroundColor: '#01579B',
  },
};
