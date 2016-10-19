/**
 * Created by LiuZongRui on 16/10/9.
 */
import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    PanResponder
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
    };

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
        };
        this.watcher = null;
        this.startX = 0;
        this.swithTab = 0;
    }

    componentWillMount() {
        this.watcher = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: this._onPanResponderGrant,
            onPanResponderMove: this._onPanResponderMove,
            onPanResponderEnd: this._onPanResponderEnd
        });
    }

    _onPanResponderGrant = (e, gestureState)=> {
        this.startX = gestureState.x0;
    };

    _onPanResponderMove = (e, gestureState)=> {
        let tabLen = this.props.tabContentViewArray.length;
        if (gestureState.moveX > this.startX) {
            // 往右滑动, tab后退
            if (this.state.selectedItem == 0) return; // 第一个tab,无法继续向左滑动
            if (Math.abs(gestureState.moveX - this.startX)>= winWidth / 4) {
                // 当滑动距离超过半屏的时候,则认为可以切换屏幕
                this.swithTab = -1;
            }
        } else if (gestureState.moveX < this.startX) {
            // 往左滑动,tab前进
            if (this.state.selectedItem == tabLen - 1) return; // 最后一个tab无法继续向右滑动
            if (Math.abs(gestureState.moveX - this.startX) >= winWidth / 4) {
                // 当滑动距离超过半屏的时候,则认为可以切换屏幕
                this.swithTab = 1;
            }
        }
    };

    _onPanResponderEnd = (e, gestureState)=> {
        this.setState({
            selectedItem: this.state.selectedItem + this.swithTab
        });
        this.swithTab = 0;
    };

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

                <View style={{flex: 1}} {...this.watcher.panHandlers}>
                    {this.props.tabContentViewArray[this.state.selectedItem]}
                </View>
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

const
    styles = StyleSheet.create({
        container: {
            flex: 1
        },
        tabLayout: {
            width: winWidth,
            flexDirection: 'row',
            alignItems: 'center'
        }
    });
