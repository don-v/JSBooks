import React from 'react';

// import NoteFeed
import NoteFeed from '../components/NoteFeed';

// import our React Native and Apollo dependencies
import { Text } from 'react-native';
import { useQuery, gql } from '@apollo/client';

import Loading from '../components/Loading';

// next we compose our query:
const GET_NOTES = gql`
    query notes {
        id
        createdAt
        content
        favoriteContent
        author {
            username
            id
            avatar
        }
    }
`;

const Feed = props => {
    // update our component to call the query:
    const { loading, error, data } = useQuery(GET_NOTES);
    // if the data is loading, our app will display a loading indicator
    if (loading) return <Loading />;
    // if there is an error fetching the data, display an error message
    if (error) return <Text>Error loading notes</Text>;
    // if the query is successful and there are notes, return the feed of notes
    
    return <NoteFeed notes={data.notes} navigation={props.navigation} />;
};

Feed.navigationOptions = {
    title: 'Feed'
};

export default Feed;