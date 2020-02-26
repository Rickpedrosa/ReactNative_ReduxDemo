import React, {Component} from 'react';
import {View, Text} from 'react-native';

import {styles} from './../styles/styles.js';

export default class ItemDetail extends Component {

    render() {
        // console.log(this.props.route.params.item);
        return (<View style={styles.center}>
            <Text style={styles.title}>{this.props.route.params.item.name}</Text>
        </View>);
    }
}
