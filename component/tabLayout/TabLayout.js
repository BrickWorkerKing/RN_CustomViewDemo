/**
 * Created by LiuZongRui on 16/10/9.
 */
import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity
} from 'react-native';
import TabView from './TabView';

let Dimensions = require('Dimensions');
let winWidth = Dimensions.get('window').width;

export default class TabLayout extends Component {

    static propTypes = {
        locateTop: PropTypes.bool,
        height: PropTypes.number,
        borderBottomWidth: PropTypes.number,
        borderBottomColor: PropTypes.string,
        borderTopWidth: PropTypes.number,
        borderTopColor: PropTypes.string,
        showCutLine: PropTypes.bool,
        tabArray: PropTypes.arrayOf(React.PropTypes.string).isRequired,
        selectedColor: PropTypes.string.isRequired,
        tabContentViewArray: PropTypes.arrayOf(React.PropTypes.element).isRequired
    }

    static get defaultProps() {
        return {
            locateTop: true,
            showCutLine: true,
            height: 50,
            borderBottomWidth: 1,
            borderBottomColor: 'gray',
            borderTopWidth: 1,
            borderTopColor: 'gray'
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            selectedItem: 0
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.tabLayout, this._getTabLayoutStyle()]}>
                    {
                        React.Children.map(this.props.tabArray, (child, index) => {
                            return (
                                <View style={this._getTabViewStyle()}>
                                    <TouchableOpacity onPress={() => this._onTabPress(index)} style={{flex: 1}}>
                                        <TabView text={child} style={this._getTabStyle()}
                                                 selected={this.state.selectedItem == index}
                                                 selectedColor={this.props.selectedColor}/>
                                    </TouchableOpacity>
                                    <View style={this._getCutLineStyle(index)}/>
                                </View>)
                        })
                    }
                </View>

                {this.props.tabContentViewArray[this.state.selectedItem]}

            </View>
        )
    }

    _getTabLayoutStyle() {
        if (this.props.locateTop) {
            return {
                height: this.props.height,
                borderBottomWidth: this.props.borderBottomWidth,
                borderBottomColor: this.props.borderBottomColor,
            }
        } else {
            return {
                height: this.props.height,
                borderTopWidth: this.props.borderTopWidth,
                borderTopColor: this.props.borderTopColor,
                position: 'absolute',
                bottom: 0
            }
        }
    }

    _getTabViewStyle() {
        return {
            flex: 1,
            flexDirection: 'row',
            height: this.props.height,
            alignItems: 'center',
            backgroundColor: '#e5e5e5'
        }
    }

    _getTabStyle() {
        return {
            flex: 1,
            alignItems: 'center',
        }
    }

    // tab之间分割线样式
    _getCutLineStyle(index) {
        let lineWidth;
        if (!this.props.showCutLine || (this.props.tabArray && index == this.props.tabArray.length - 1)) {
            lineWidth = 0;
        } else {
            lineWidth = 1;
        }

        return {
            width: lineWidth,
            height: this.props.height * 0.7,
            backgroundColor: '#cccccc'
        }
    }

    // 通过点击tab进行tab切换
    _onTabPress(index) {
        if (index == this.state.selectedItem) return;
        this.setState({
            selectedItem: index
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tabLayout: {
        width: winWidth,
        flexDirection: 'row',
        alignItems: 'center'
    }
});
