/**
 * Created by LiuZongRui on 16/10/9.
 */
import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';

export default class TabView extends Component {

    static propTypes = {
        selected: PropTypes.bool.isRequired,
        selectedColor: PropTypes.string.isRequired
    }

    static get defaultProps() {
    }

    constructor(props) {
        super(props);
        this.state = {
            tabIndicatorWidth: 50,
        }
    }

    render() {
        return (
            <View style={[this.props.style]}>
                <View style={styles.textLayout}>
                    <Text style={[styles.text, this._getTextStyle()]}
                          onLayout={(event) => this._onTextLayout(event)}>{this.props.text}</Text>
                </View>
                <View style={this._getTabIndicatorStyle()}/>
            </View>
        )
    }

    _onTextLayout(event) {
        let {x, y, width, height} = event.nativeEvent.layout;
        this.setState({
            tabIndicatorWidth: width * 0.8
        })
    }

    _getTabIndicatorStyle() {
        return {
            backgroundColor: this.props.selectedColor,
            height: this.props.selected ? 2 : 0,
            width: this.state.tabIndicatorWidth,
        }
    }

    _getTextStyle() {
        if (this.props.selected) {
            return {
                color: this.props.selectedColor,
                fontWeight: 'bold'
            }
        } else {
            return {
                color: '#333333',
                fontWeight: 'normal'
            }
        }
    }

}

const styles = StyleSheet.create({
    text: {
        fontSize: 16
    },
    textLayout: {
        flex: 1,
        justifyContent: 'center'
    }
});