import React, {Component} from 'react';
import {View, Text, FlatList, ActivityIndicator, TouchableHighlight} from 'react-native';

import {styles} from '../../styles/styles.js';
import {listOfPersons} from '../../reducers/peopleReducer';
import {connect} from 'react-redux';

class Feed extends Component {
    // constructor(props) {
    //     super(props);
    //     console.log('feed props', this.props);
    // }

    render() {
        console.log('En el render de Feed', this.props);
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
                    keyExtractor={(item, index) => (index.toString())}>
                </FlatList>
            </View>);
        }
    }

    componentDidMount(): void {
        this.props.fetch();
    }
}

const mapStateToProps = state => {
    return {
        starWarsPeople: state.people.peopleResult.results,
        loading: state.people.loading,
        error: state.people.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetch: () => dispatch(listOfPersons()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
