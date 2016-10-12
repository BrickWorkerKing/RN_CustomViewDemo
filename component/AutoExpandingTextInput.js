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
        this.state = {
            text: '',
            height: 0
        }
    }

    render() {
        return (
            <TextInput {...this.props}
                       multiline={true}
                       value={this.state.text}
                       style={[this.props.style, {height: Math.max(30, this.state.height + 2)}]}
                       onChange={(event) => this._onChange(event)}/>
        );
    }

    _onChange(event) {

        console.log('height == ' + event.nativeEvent.contentSize.height);

        this.setState({
            text: event.nativeEvent.text,
            height: event.nativeEvent.contentSize.height
        });
    }

}
