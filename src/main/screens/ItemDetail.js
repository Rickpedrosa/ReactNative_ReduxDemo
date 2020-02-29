import React, {Component} from 'react';
import {View, Text, SectionList} from 'react-native';

import {styles} from './../styles/styles.js';

export default class ItemDetail extends Component {

    constructor(props) {
        super(props);
        this.props.navigation.setOptions({title: this.props.route.params.item.name});
        this.person = this.props.route.params.item;
    }

    getDataSectioned() {
        return [
            {
                title: 'Name',
                data: [{info: this.person.name, color: 'black'}],
            },
            {
                title: 'Height',
                data: [{info: this.person.height, color: 'black'}],
            },
            {
                title: 'Hair color',
                data: [{info: this.person.hair_color, color: 'black'}],
            },
            {
                title: 'Skin color',
                data: [{info: this.person.skin_color, color: 'black'}],
            },
            {
                title: 'Birth year',
                data: [{info: this.person.birth_year, color: 'black'}],
            },
            {
                title: 'Gender',
                data: [{info: this.person.gender, color: 'black'}],
            },
            {
                title: 'Homeworld',
                data: [{info: this.person.homeworld, color: 'blue'}],
            },
            {
                title: 'Films',
                data: this.person.films.flatMap((item) => [{info: item, color: 'blue'}]),
            }, {
                title: 'Species',
                data: this.person.species.flatMap((item) => [{info: item, color: 'blue'}]),
            }, {
                title: 'Vehicles',
                data: this.person.vehicles.flatMap((item) => [{info: item, color: 'blue'}]),
            }, {
                title: 'Starships',
                data: this.person.starships.flatMap((item) => [{info: item, color: 'blue'}]),
            },
        ];
    }

    render() {
        return (
            <View style={{padding: 8}}>
                <SectionList
                    sections={this.getDataSectioned()}
                    keyExtractor={(item, index) => item.info + index}
                    renderItem={({item}) =>
                        <Text style={{...styles.title, color: item.color}}>{item.info}</Text>
                    }
                    renderSectionHeader={({section: {title}}) => (
                        <Text style={styles.header}>{title}</Text>
                    )}
                />
            </View>);
    }
}

