/**
 * Created by LiuZongRui on 16/10/12.
 * 自增长InputView
 */
import React, {Component} from 'react';
import {
    TextInput
} from 'react-native';
export default class AutoExpandingTextInput extends Component {

    constructor(props) {
        super(props);
        console.log('AutoExpandingTextInput constructor');
        this.state = {
            text: '',
            height: 0
        }
    }

    render() {
        console.log('AutoExpandingTextInput render');
        return (
            <TextInput {...this.props}
                       multiline={true}
                       value={this.state.text}
                       style={[this.props.style, {height: Math.max(30, this.state.height + 2)}]}
                       underlineColorAndroid={'gray'}
                       onChange={(event) => this._onChange(event)}/>
        );
    }

    componentWillMount() {
        console.log('AutoExpandingTextInput componentWillMount');
    }

    componentDidMount() {
        console.log('AutoExpandingTextInput componentDidMount');
    }

    componentWillReceiveProps() {
        console.log('AutoExpandingTextInput componentWillReceiveProps');
    }

    shouldComponentUpdate() {
        console.log('AutoExpandingTextInput shouldComponentUpdate');
        return true;
    }

    componentWillUpdate(){
        console.log('AutoExpandingTextInput componentWillUpdate');
    }

    componentDidUpdate() {
        console.log('AutoExpandingTextInput componentDidUpdate');
    }

    componentWillUnmount() {
        console.log('AutoExpandingTextInput componentWillUnmount');
    }

    _onChange(event) {

        console.log('height == ' + event.nativeEvent.contentSize.height);

        this.setState({
            text: event.nativeEvent.text,
            height: event.nativeEvent.contentSize.height
        });
    }

}
