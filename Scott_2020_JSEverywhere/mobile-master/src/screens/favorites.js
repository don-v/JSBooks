import React from 'react';
import { Text, View } from 'react-native';
import { useQuery, gql } from '@apollo/client';

import NoteFeed from '../components/NoteFeed';
import Loading from '../components/Loading';

// our GraphQL query
const GET_MY_FAVORITES = gql`
    // HERE -- p. 291!
`;

const Favorites = () => {
    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Favorites</Text>
        </View>
    );
};

Favorites.navigationOptions = {
    title: 'Favorites'
};

export default Favorites;