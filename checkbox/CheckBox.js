/**
 * Created by LiuZongRui on 16/9/28.
 */
import React, {Component, PropTypes} from 'react';
import {
    View,
    TouchableWithoutFeedback
} from 'react-native';

export default class CheckBox extends Component {

    static propTypes = {
        radius: PropTypes.number,
        checkedColor: PropTypes.string,
        unCheckedColor: PropTypes.string,
        onCheck: PropTypes.func,
        onUnCheck: PropTypes.func,
        checked: PropTypes.bool,
    }

    static get defaultProps() {
        return {
            radius: 15,
            checkedColor: 'blue',
            unCheckedColor: 'white',
            onCheck: null,
            onUnCheck: null,
            checked: false,
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            checked: this.props.checked
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={() => this._onPress()}>
                <View style={this._getStyle()}/>
            </TouchableWithoutFeedback>
        );
    }

    _getStyle() {

        return {
            width: this.props.radius * 2,
            height: this.props.radius * 2,
            borderRadius: this.props.radius,
            borderWidth: 1,
            borderColor: this.state.checked ? this.props.unCheckedColor : this.props.checkedColor,
            backgroundColor: this.state.checked ? this.props.checkedColor : this.props.unCheckedColor,
            shadowColor: this.props.checkedColor,
            shadowRadius: this.props.radius + 1,
            shadowOpacity: 0.2,
        }
    }

    _onPress() {
        if (this.state.checked) {
            this.setState({
                checked: false
            });
            if (this.props.onUnCheck) {
                this.props.onUnCheck();
            }
        } else {
            this.setState({
                checked: true
            });
            if (this.props.onCheck) {
                this.props.onCheck();
            }
        }
    }

    _setChecked(checked){
        this.setState({
            checked: checked
        });
    }
}