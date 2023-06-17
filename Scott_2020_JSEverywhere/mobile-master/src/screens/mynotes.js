import React from 'react';
import { Text, View } from 'react-native';
import { useQuery, gql } from '@apollo/client';

import NoteFeed from '../components/NoteFeed'
import Loading from '../components/Loading';

// our GraphQL query
const GET_MY_NOTES = gql`
    query me {
        me {
            id
            username
            notes {
                id
                createdAt
                content
                favoriteCount
                author {
                    username
                    id
                    avatar
                }
            }
        }
    }
`;

const MyNotes = props => {
    const { loading, error, data } = useQuery(GET_MY_NOTES);

    // if the data is loading, our app will display a loading message
    if (loading) return <Loading />;
    // if there is an error fetching the data, display a error message
    if (error) return <Text>Error loaidng notes</Text>;
    // HERE -- p. 291!
    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>My Notes</Text>
        </View>
    );
};

MyNotes.navigationOptions = {
    title: 'My Notes'
};

export default MyNotes;