import PropTypes from 'prop-types';
import React, { PureComponent, Children } from 'react';
import { View, Animated } from 'react-native';

import styles from './styles';

export default class FadeView extends PureComponent {
  static defaultProps = {
    animationDuration: 225,

    active: 0,
    removeHiddenSubviews: true,
  };

  static propTypes = {
    animationDuration: PropTypes.number,

    active: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.number,
    ]),
    removeHiddenSubviews: PropTypes.bool,

    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  };

  constructor(props) {
    super(props);

    this.renderChild = this.renderChild.bind(this);
    this.mounted = false;

    this.state = {
      progressList: {},
      animatingList: {},
    };
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  componentWillReceiveProps({ active, animationDuration }) {
    let { progressList, animatingList } = this.state;
    active = Number(active);
    let prevActive =  Number(this.props.active);

    if (active !== prevActive) {
      let prevProgress = progressList[prevActive];
      if (!prevProgress) {
        prevProgress = new Animated.Value(1);
        progressList = { ...progressList, [prevActive]: prevProgress };
      }

      let progress = progressList[active];
      if (!progress) {
        progress = new Animated.Value(0);
        progressList = { ...progressList, [active]: progress };
      }
      animatingList = { ...animatingList, [active]: true, [prevActive]: true };
      this.setState({ progressList, animatingList });

      for (let index in progressList) {
        index = Number(index);

        if (index !== active && index !== prevActive && !animatingList[index]) {
          continue;
        }

        Animated
          .timing(progressList[index], {
            toValue: ((index === active) ? 1 : 0),
            duration: animationDuration,
            useNativeDriver: true,
          })
          .start(() => {
            if (this.mounted) {
              let { animatingList } = this.state;
              animatingList = { ...animatingList, [index]: false };
              this.setState({ animatingList });
            }
          });
      }
    }
  }

  renderChild(child, index) {
    let { active, removeHiddenSubviews } = this.props;
    let { progressList, animatingList } = this.state;
    let progress = progressList[index];
    let animating = animatingList[index];
    active = Number(active);

    let hidden = active !== index;

    if (!animating && hidden && removeHiddenSubviews) {
      return null;
    }

    let opacity = !progress ? ((index === active) ? 1 : 0) : progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    let pointerEvents = hidden?
      'none':
      'box-none';

    return (
      <Animated.View
        style={[styles.container, { opacity }]}
        pointerEvents={pointerEvents}
      >
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
