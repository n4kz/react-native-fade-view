import PropTypes from 'prop-types';
import React, { PureComponent, Children } from 'react';
import { View, Animated } from 'react-native';

import styles from './styles';

export default class FadeView extends PureComponent {
  static defaultProps = {
    animationDuration: 225,
    active: false,
  };

  static propTypes = {
    animationDuration: PropTypes.number,
    active: PropTypes.bool,

    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  };

  constructor(props) {
    super(props);

    this.renderChild = this.renderChild.bind(this);

    let { active } = this.props;

    this.state = {
      progress: new Animated.Value(Number(active)),
    };
  }

  componentWillReceiveProps({ active, animationDuration }) {
    let { progress } = this.state;

    if (active ^ this.props.active) {
      Animated
        .timing(progress, {
          toValue: Number(active),
          duration: animationDuration,
          useNativeDriver: true,
        })
        .start();
    }
  }

  renderChild(child, index) {
    let { progress } = this.state;

    let opacity = progress.interpolate({
      inputRange: [0, 1],
      outputRange: index? [0, 1] : [1, 0],
    });

    return (
      <Animated.View style={[styles.container, { opacity }]}>
        {child}
      </Animated.View>
    );
  }

  render() {
    let { children, ...props } = this.props;

    return (
      <View {...props}>
        {Children.map(children, this.renderChild)}
      </View>
    );
  }
}
