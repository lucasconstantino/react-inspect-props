# React Inspect Props [![Build Status](https://travis-ci.org/lucasconstantino/react-inspect-props.svg?branch=master)](https://travis-ci.org/lucasconstantino/react-inspect-props)

> React properties inspector with the power of Redux DevTools

## Install

#### 1. Install [Redux DevTools](http://extension.remotedev.io/#installation) extension

#### 2. `yarn add react-inspect-props`

> Or, good ol' `npm install --save react-inspect-props`

## Usage

This lib provides a single Higher-Order Component called `inspectProps` with the following signature:

```js
inspectProps(
  name: string,
  options: Object | (props: Object) => Object
): HigherOrderComponent
```

This HoC will transparently connect your component to a new instance of the the Redux DevTools extension, identified by the name provided as first argument.

The second argument is optional. If provided, the object will be used when connecting to the extension. Refer to the [documentation](http://extension.remotedev.io/docs/API/Arguments.html) of that method for more info.

### Simple as can

```js
import { inspectProps } from 'react-inspect-props'

const Counter = ({ count, setCount }) => (
  <div>
    <button onClick={ () => setCount(++count) }>Increment counter</button>
  </div>
)

export default inspectProps('Counter inspector')(Counter)
```

## License

Copyright (c) 2017 Lucas Constantino Silva

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
