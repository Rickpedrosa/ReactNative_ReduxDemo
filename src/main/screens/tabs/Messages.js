import React, {Component} from 'react';
import {View, Text, FlatList, ActivityIndicator, TouchableHighlight} from 'react-native';

import {styles} from '../../styles/styles.js';

export default class Messages extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            page: 1,
            refresh: false,
            error: '',
        };
    }

    render() {
        return (<View style={{flex: 1, marginTop: 30}}>
            <FlatList
                data={this.state.data}
                renderItem={({item}) => (
                    <TouchableHighlight onPress={() => {
                        this.props.navigation.navigate('Detail', {item: item});
                    }}>
                        <View style={{padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc'}}>
                            <Text>{item.name}</Text>
                        </View>
                    </TouchableHighlight>
                )}
                keyExtractor={(item) => (item.name)}
                refreshing={this.state.loading}
                onRefresh={this.fetchPeople}
            >
            </FlatList>
        </View>);
    }

    componentDidMount(): void {
        this.fetchPeople();
    }

    fetchPeople = () => {
        this.setState({loading: true});
        fetch(`https://swapi.co/api/people/?page=${this.state.page}`)
            .then((response) => response.json())
            .then((resp) => {
                this.setState(prevState =>
                    ({
                        data: resp.results.concat(prevState.data),
                        page: prevState.page + 1,
                    }));
            })
            .catch(() => {
                this.setState({loading: false});
            })
            .finally(() => this.setState({loading: false}));
    };
}
