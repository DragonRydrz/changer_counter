'use strict';

import React, { Component } from 'react';

import { StyleSheet, View, Text } from 'react-native';

import {
    ViroARScene,
    ViroText,
    ViroConstants,
    ViroARImageMarker,
    ViroARTrackingTargets,
    ViroNode,
    ViroButton,
} from 'react-viro';

export default class ChangeCountSceneAR extends Component {
    constructor() {
        super();

        // Set initial state here
        this.state = {
            text: 'Initializing AR...',
            total: 0,
        };

        // bind 'this' to functions
        this._onInitialized = this._onInitialized.bind(this);
    }

    render() {
        return (
            // <View style={{flex: 1}}>
            //   <Text>Testing</Text>
            // </View>
            <ViroARScene onTrackingUpdated={this._onInitialized}>
                <ViroARImageMarker
                    target={'bill20'}
                    onAnchorFound={() => this.count(20)}
                >
                    <ViroText
                        text={this.state.total.toString()}
                        scale={[0.1, 0.1, 0.1]}
                        position={[0, 0.02, 0]}
                        style={styles.helloWorldTextStyle}
                    />
                </ViroARImageMarker>
                <ViroARImageMarker
                    target={'bill10'}
                    onAnchorFound={() => this.count(10)}
                >
                    <ViroText
                        text={this.state.total.toString()}
                        scale={[0.1, 0.1, 0.1]}
                        position={[0, 0.02, 0]}
                        style={styles.helloWorldTextStyle}
                    />
                </ViroARImageMarker>
                <ViroARImageMarker
                    target={'bill5reverse'}
                    onAnchorFound={() => this.count(5)}
                >
                    <ViroText
                        text={this.state.total.toString()}
                        scale={[0.1, 0.1, 0.1]}
                        position={[0, 0.02, 0]}
                        style={styles.helloWorldTextStyle}
                    />
                </ViroARImageMarker>
                <ViroARImageMarker
                    target={'bill1'}
                    onAnchorFound={() => this.count(1)}
                >
                    <ViroText
                        text={this.state.total.toString()}
                        scale={[0.1, 0.1, 0.1]}
                        position={[0, 0.02, 0]}
                        style={styles.helloWorldTextStyle}
                    />
                </ViroARImageMarker>
                <ViroARImageMarker
                    target={'penny'}
                    onAnchorFound={() => this.count(0.01)}
                >
                    <ViroText
                        text={this.state.total.toString()}
                        scale={[1, 1, 1]}
                        position={[0, 0.1, 0]}
                        style={styles.helloWorldTextStyle}
                    />
                </ViroARImageMarker>
            </ViroARScene>
        );
    }

    count = val => {
        this.setState({ total: this.state.total + val });
    };

    _onInitialized(state, reason) {
        if (state == ViroConstants.TRACKING_NORMAL) {
            this.setState({
                text: 'Hello World!',
            });
        } else if (state == ViroConstants.TRACKING_NONE) {
            // Handle loss of tracking
            console.log(reason);
            alert(reason);
        }
    }
}

const quarterWidth = 0.0238125;
const pennyWidth = 0.0152;
const billWidth = 0.156;

ViroARTrackingTargets.createTargets({
    bill20: {
        source: require('./res/jackson.jpg'),
        orientation: 'up',
        physicalWidth: billWidth,
    },
    bill10: {
        source: require('./res/hamilton.jpg'),
        physicalWidth: billWidth,
    },
    bill5: {
        source: require('./res/US_$5_Series_2006.jpg'),
        physicalWidth: billWidth,
    },
    bill5reverse: {
        source: require('./res/US_$5_series_2003_reverse.jpg'),
        physicalWidth: billWidth,
    },
    bill1: {
        source: require('./res/single.jpg'),
        physicalWidth: billWidth,
    },
    penny: {
        source: require('./res/penny.png'),
        physicalWidth: pennyWidth,
    },
});

var styles = StyleSheet.create({
    helloWorldTextStyle: {
        fontFamily: 'Arial',
        fontSize: 30,
        color: '#ffffff',
        textAlignVertical: 'center',
        textAlign: 'center',
    },
});

module.exports = ChangeCountSceneAR;
