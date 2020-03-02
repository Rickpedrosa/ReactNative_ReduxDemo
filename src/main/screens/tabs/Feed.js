import React, {Component} from 'react';
import {View, Text, FlatList, ActivityIndicator, TouchableHighlight} from 'react-native';

import {styles} from '../../styles/styles.js';
import {listOfPersons} from '../../reducers/people';
import {connect} from 'react-redux';
import {ON_REFRESHED} from '../../actions/types';

class Feed extends Component {

    render() {
        if (this.props.loading) {
            return (<View style={{flex: 1, padding: 20, justifyContent: 'center'}}>
                <ActivityIndicator/>
            </View>);
        } else {
            return (<View style={styles.center}>
                <FlatList
                    data={this.props.starWarsPeople}
                    renderItem={({item}) => (
                        <TouchableHighlight onPress={() => {
                            this.props.navigation.navigate('Detail', {item: item});
                        }}>
                            <View style={styles.item}>
                                <Text>{item.name}</Text>
                            </View>
                        </TouchableHighlight>
                    )}
                    keyExtractor={(item, index) => (index.toString())}
                    refreshing={this.props.loading}
                    onRefresh={this.onRefreshing}
                >
                </FlatList>
            </View>);
        }
    }

    onRefreshing = () => {
        this.props.fetch(this.props.page)
            .then(() => this.props.incrementPageOnRefresh());
    };

    componentDidMount(): void {
        this.props.fetch(this.props.page)
            .then(() => this.props.incrementPageOnRefresh());
    }
}

const mapStateToProps = state => {
    return {
        starWarsPeople: state.people.peopleResult,
        loading: state.people.loading,
        error: state.people.error,
        refreshing: state.people.refreshing,
        page: state.people.page,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetch: (index) => dispatch(listOfPersons(index)),
        incrementPageOnRefresh: () => dispatch({type: ON_REFRESHED}),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
