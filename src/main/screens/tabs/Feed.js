import React, {Component} from 'react';
import {View, Text, FlatList, ActivityIndicator, TouchableHighlight} from 'react-native';

import {styles} from '../../styles/styles.js';

export default class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {data: [], isLoading: true};
    }

    render() {
        if (this.state.isLoading) {
            return (<View style={{flex: 1, padding: 20, justifyContent: 'center'}}>
                <ActivityIndicator/>
            </View>);
        } else {
            return (<View style={styles.center}>
                <FlatList
                    data={this.state.data}
                    renderItem={({item}) => (
                        <TouchableHighlight onPress={() => {
                            this.props.navigation.navigate('Detail', {item: item});
                        }}>
                            <View style={styles.item}>
                                <Text>{item.name}</Text>
                            </View>
                        </TouchableHighlight>
                    )}
                    keyExtractor={(item, index) => (index.toString())}>
                </FlatList>
            </View>);
        }
    }

   async componentDidMount(): void {
        fetch('https://swapi.co/api/people')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({data: responseJson.results, isLoading: false});
            })
            .catch((error) => {
                this.setState({data: [], isLoading: false});
                console.error(error);
            });
    }
}
