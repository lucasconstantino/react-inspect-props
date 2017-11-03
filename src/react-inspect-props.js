import React from 'react'

export const inspectProps = (name, options = {}) => ComposedComponent => {
  const hasReduxDevtools = typeof window !== 'undefined' && !!window.__REDUX_DEVTOOLS_EXTENSION__

  if (!hasReduxDevtools) {
    console.error('You must have Redux DevTools Extension installed in order to use react-inspect-props. Install it at http://extension.remotedev.io/')
    return ComposedComponent
  }

  return class PropsInspector extends React.Component {
    constructor (props) {
      super(props)

      this.state = {
        connection: null,
        props: this.props
      }
    }

    componentWillMount () {
      const config = typeof options === 'function' ? options(this.props) : options
      const connection = window.__REDUX_DEVTOOLS_EXTENSION__.connect({ name, ...config })
      connection.init(this.props)
      connection.subscribe(this.dispatch)
      this.setState({ connection })
    }

    componentWillUnmount () {
      window.__REDUX_DEVTOOLS_EXTENSION__.disconnect(this.state.connection)
    }

    componentWillReceiveProps (props) {
      this.setState({ props })
      this.state.connection.send({ type: 'componentWillReceiveProps' }, props)
    }

    dispatch = ({ type, state }) => {
      if (type === 'DISPATCH' && state) {
        console.log({ state, props: JSON.parse(state) })
        this.setState({ props: JSON.parse(state) })
      }
    }

    render () {
      return React.createElement(ComposedComponent, this.state.props)
    }
  }
}

export default inspectProps
