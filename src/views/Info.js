import React from 'react'
import ReactDOM from 'react-dom'
import store from '../store'

export default class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            avatar: ''
        };
    }

    componentDidMount(){
        store.getInfo().then(() =>
            this.setState({
                name: store.name,
                avatar: store.avatar
            })
        )
    }

    render() {
        return (
            <div>
                <h3>I am { this.state.name }</h3>
                <h3>avatar: { this.state.avatar }</h3>
            </div>
        )
    }
}