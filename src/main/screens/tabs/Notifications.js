import React, {Component} from 'react';
import {View, Text} from 'react-native';

import {styles} from '../../styles/styles.js';

export default class Notifications extends Component {
    render() {
        return (<View style={styles.center}>
            <Text style={styles.title}>Notifications</Text>
        </View>);
    }
}
