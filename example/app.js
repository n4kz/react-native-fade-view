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
            <Text style={styles.text}>
              <Text style={styles.highlight}>FadeView</Text> shows alternative text
            </Text>
          </FadeView>

          <View style={styles.buttonContainer}>
            <RaisedTextButton
              color='#01579B'
              style={styles.button}
              title='set inactive'
              titleColor='white'
              onPress={() => this.setState({ active: 0 })}
              rippleSequential={false}
            />

            <RaisedTextButton
              color='#01579B'
              style={styles.button}
              title='set active'
              titleColor='white'
              onPress={() => this.setState({ active: 1 })}
              rippleSequential={false}
            />

            <RaisedTextButton
              color='#01579B'
              style={styles.button}
              title='show alternative'
              titleColor='white'
              onPress={() => this.setState({ active: 2 })}
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
  container: {
    flex: 1,
    backgroundColor: '#01579B',
  },

  text: {
    color: 'rgba(255, 255, 255, 0.54)',
    backgroundColor: 'transparent',
    fontSize: 17,
  },

  highlight: {
    color: 'rgba(255, 255, 255, 0.87)',
    fontWeight: '500',
  },

  button: {
    margin: 8,
  },

  buttonContainer: {
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
};
