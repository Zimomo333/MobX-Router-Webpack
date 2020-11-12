import React from 'react'
import ReactDOM from 'react-dom'
import store from '../store'
import { observer } from 'mobx-react'
const Info = observer(
  class Info extends React.Component {
    constructor(props) {
      super(props)
    }

    componentDidMount() {
      store.getInfo().then(() => console.log('获取用户信息成功！'))
    }

    render() {
      return (
        <div>
          <h3>I am {store.name}</h3>
          <h3>avatar: {store.avatar}</h3>
          <h3>在线时长: {store.onlineTime} 秒</h3>
        </div>
      )
    }
  }
)

export default Info
