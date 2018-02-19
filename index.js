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

    this.progress = {};
    this.animation = {};
  }

  componentWillReceiveProps({ active, animationDuration }) {
    let activeIndex = Number(this.props.active);
    let nextActiveIndex = Number(active);

    if (nextActiveIndex !== activeIndex) {
      let {
        [activeIndex]: value = new Animated.Value(1),
        [nextActiveIndex]: nextValue = new Animated.Value(0),
      } = this.progress;

      this.progress[activeIndex] = value;
      this.progress[nextActiveIndex] = nextValue;

      for (let key in this.progress) {
        let index = Number(key);

        if (activeIndex !== index && nextActiveIndex !== index) {
          continue;
        }

        let animation
          = this.animation[index]
          = Animated
          .timing(this.progress[index], {
            toValue: index === nextActiveIndex? 1 : 0,
            duration: animationDuration,
            useNativeDriver: true,
          });

        animation
          .start(() => {
            if (animation === this.animation[index]) {
              this.animation[index] = null;
            }
          });
      }
    }
  }

  renderChild(child, index) {
    let { active, removeHiddenSubviews } = this.props;
    let hidden = Number(active) !== index;

    if (hidden && removeHiddenSubviews && null == this.animation[index]) {
      return null;
    }

    let progress = this.progress[index];
    let opacity = null != progress?
      progress:
      hidden?
        0:
        1;

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
