[npm-badge]: https://img.shields.io/npm/v/react-native-fade-view.svg?colorB=ff6d00
[npm-url]: https://npmjs.com/package/react-native-fade-view
[license-badge]: https://img.shields.io/npm/l/react-native-fade-view.svg?colorB=448aff
[license-url]: https://raw.githubusercontent.com/n4kz/react-native-fade-view/master/license.txt
[example-url]: https://cloud.githubusercontent.com/assets/2055622/25848352/ab91e994-34c2-11e7-93c3-55477456b846.gif

# react-native-fade-view

[![npm][npm-badge]][npm-url]
[![license][license-badge]][license-url]

Cross fade effect for child components

![example][example-url]

## Installation

```bash
npm install --save react-native-fade-view
```

## Usage

```javascript
import React, { Component } from 'react';
import { Image, Text } from 'react-native';
import FadeView from 'react-native-fade-view';

class Example extends Component {
  render() {
    let { active } = this.state;

    return (
      <FadeView active={active}>
        <Text>loading...</Text>
        <Image onLoad={() => this.setState({ active: true })} />
      </FadeView>
    );
  }
}
```

## Properties

 name                 | description               | type    | default
:-------------------- |:------------------------- | -------:|:------------
 animationDuration    | Fade animation duration   |  Number | 225
 active               | Fade view state           | Boolean | false
 removeHiddenSubviews | Remove invisible subviews | Boolean | true

## Example

```bash
git clone https://github.com/n4kz/react-native-fade-view
cd react-native-fade-view/example
npm install
react-native run-ios # or run-android
```

## Copyright and License

BSD License

Copyright 2017-2018 Alexander Nazarov. All rights reserved.
