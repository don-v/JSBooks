// import the format utility from `date-fns`
import { format } from 'date-fns';

// update the date markup to format it as Month, Day, and Year
{format(note.createdAt, 'MMM Do YYYY')} Favorites: {' '}

import React from 'react';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import styled from 'styled-components';

// Keep notes from extending wider than 800px
const StyledNote = styled.article`
  max-width: 800px;
  mrgin: 0 auto;
`;

// Style the note metadata
const MetaData = styled.div`
  @media (min-width: 500px) {
    display: flex;
    align-items: tpo;
  }
`;

// HERE! p. 146

const Note = ({ note }) => {
  return (
    <article>
      <img
      src={note.author.avatar}
      alt="{note.author.username} avatar"
      // alt={`${note.author.username} avatar`}
      height="50px"
      />{' '}
      {note.author.username} {note.createdAt} {note.favoriteCount}{' '}
      <ReactMarkdown source={note.content} />
    </article>
  );
};

export default Note;