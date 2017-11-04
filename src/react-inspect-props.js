import React from 'react'
import merge from 'deepmerge'

const defaultOptions = {
  features: {
    pause: true, // start/pause recording of dispatched actions
    lock: true, // lock/unlock dispatching actions and side effects
    export: true, // export history of actions in a file
    import: 'custom', // import history of actions from a file
    jump: true, // jump back and forth (time travelling)

    skip: false, // Cannot skip for we cannot replay.
    reorder: false, // Cannot skip for we cannot replay.
    persist: false, // Avoid trying persistence.
    dispatch: false,
    test: false,
  }
}

/**
 * Properties inspector HoC.
 *
 * @param {String} name Inspector instance name.
 * @param {Object|Function} options Options to provide the inspector connection.
 */
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

    getOptions () {
      return merge(defaultOptions, typeof options === 'function' ? options(this.props) : options)
    }

    componentWillMount () {
      const connection = window.__REDUX_DEVTOOLS_EXTENSION__.connect({
        name,
        ...this.getOptions()
      })

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

    dispatch = ({ type, state, payload }) => {
      if (type === 'DISPATCH' && (
        payload.type === 'JUMP_TO_STATE' || payload.type === 'JUMP_TO_ACTION'
      )) {
        this.setState({ props: JSON.parse(state) })
      }
    }

    render () {
      return React.createElement(ComposedComponent, this.state.props)
    }
  }
}

export default inspectProps
