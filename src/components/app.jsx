import React, { PropTypes }         from 'react'
import { Link }                     from 'react-router'
import '../styles/app.scss'

export default class App extends React.Component {
    render () {
        return (
        <div>
            {this.props.children}
        </div>
        )
    }
}
